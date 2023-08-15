package com.chibbol.wtz.domain.room.service;

import com.chibbol.wtz.domain.room.entity.Room;
import com.chibbol.wtz.domain.room.exception.UserAlreadyLoginException;
import com.chibbol.wtz.domain.room.repository.HandlerRepository;
import com.chibbol.wtz.domain.user.entity.User;
import com.chibbol.wtz.domain.user.service.UserService;
import com.chibbol.wtz.global.stomp.dto.DataDTO;
import com.chibbol.wtz.global.stomp.service.RedisPublisher;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class HandlerService {

    private final HandlerRepository handlerRepository;
    private final UserService userService;
    private final RedisPublisher redisPublisher;
    private final ChannelTopic roomTopic;
    private final RoomEnterInfoRedisService roomEnterInfoRedisService;
    private final RoomService roomService;

    public void connectUser(String sessionId, Long userSeq) {
        // 중복 접속 막기
        log.info("connectUser 시작");
        if (handlerRepository.checkForDuplicateUser(userSeq)) {
            log.info("이미 로그인 중");
            throw new UserAlreadyLoginException("이미 로그인 중입니다!");
        }
        handlerRepository.setUserSeqForSessionId(sessionId, userSeq);
        log.info("connectUser 끝");
    }

    public void subscribeUser(Long userSeq, String roomCode) {
        log.info("subscribeUser 시작");
        handlerRepository.setRoomCodeForUserSeq(userSeq, roomCode);
        log.info("subscribeUser 끝");
    }

    public void unsubscribeUser(Long userSeq) {
        exit(userSeq);
    }

    public void disconnectUser(String sessionId) {
        log.info("disconnect 시작");
        Long userSeq = handlerRepository.getUserSeqBySessionId(sessionId);
        if (handlerRepository.checkExistRoom(userSeq)) {
            log.info("이게 왜 안뜨지?");
            exit(userSeq);
        }
        handlerRepository.removeUserSeqForSessionId(sessionId);
        handlerRepository.removeSessionIdForUserSeq(userSeq);
        log.info("disconnect 끝");
    }

    public void exit(Long userSeq) {
        log.info("EXIT 시작");
        String roomCode = handlerRepository.getRoomCodeByUserSeq(userSeq);
        User user = userService.findByUserSeq(userSeq);
        // 메세지 보내기
        DataDTO dataDTO = DataDTO.builder()
                .type("ROOM_EXIT")
                .code(roomCode)
                .data(user.getNickname() +"님이 퇴장하셨습니다.")
                .build();
        redisPublisher.stompPublish(roomTopic, dataDTO);
        // 유저 관리
//        unsubscribeUser(user.getUserSeq());
        // CurSeats 관리
        roomEnterInfoRedisService.setUserExitInfo(roomCode, user.getUserSeq());
        // 남은 사람 없을 경우
        boolean emptyRoom = false;
        if (roomEnterInfoRedisService.getUsingSeats(roomCode) == 0) {
            emptyRoom = true;
            roomService.deleteRoom(roomCode);
        }
        dataDTO.setType("ROOM_CUR_SEATS");
        dataDTO.setData(roomEnterInfoRedisService.getUserEnterInfo(roomCode));
        redisPublisher.stompPublish(roomTopic, dataDTO);
        // 남은 사람이 존재하면서 & 방장이 나갔을 경우
        Room room = roomService.findRoomByCode(roomCode);
        if (!emptyRoom && user.getUserSeq() == room.getOwner().getUserSeq()) {
            long newOwnerSeq = roomService.changeRoomOwner(roomCode);
            dataDTO.setType("ROOM_CHANGE_OWNER");
            dataDTO.setData(newOwnerSeq);
            redisPublisher.stompPublish(roomTopic, dataDTO);
        }
        log.info("roomCode 삭제 시작");
        handlerRepository.removeRoomCodeForUserSeq(userSeq); // roomCode삭제
        log.info("roomCode 삭제 끝");
        log.info("EXIT 끝");
    }
}