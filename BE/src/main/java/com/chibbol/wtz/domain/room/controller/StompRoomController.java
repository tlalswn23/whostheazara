package com.chibbol.wtz.domain.room.controller;

import com.chibbol.wtz.domain.room.dto.ChatMessageDTO;
import com.chibbol.wtz.domain.room.dto.CurrentSeatsDTOList;
import com.chibbol.wtz.domain.room.dto.JobSettingDTO;
import com.chibbol.wtz.domain.room.dto.RoomSettingDTO;
import com.chibbol.wtz.domain.room.entity.Room;
import com.chibbol.wtz.domain.room.service.HandlerService;
import com.chibbol.wtz.domain.room.service.RoomEnterInfoRedisService;
import com.chibbol.wtz.domain.room.service.RoomJobSettingRedisService;
import com.chibbol.wtz.domain.room.service.RoomService;
import com.chibbol.wtz.domain.user.entity.User;
import com.chibbol.wtz.domain.user.repository.UserRepository;
import com.chibbol.wtz.global.security.service.TokenService;
import com.chibbol.wtz.global.stomp.dto.DataDTO;
import com.chibbol.wtz.global.stomp.service.RedisPublisher;
import com.chibbol.wtz.global.timer.service.NewTimerService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class StompRoomController {

    private final RedisPublisher redisPublisher;
    private final TokenService tokenService;
    private final RoomService roomService;
    private final HandlerService handlerService;
    private final RoomEnterInfoRedisService roomEnterInfoRedisService;
    private final RoomJobSettingRedisService roomJobSettingRedisService;
    private final NewTimerService newTimerService;
    private final UserRepository userRepository;
    private final ChannelTopic roomTopic;

    @Operation(summary = "[ENTER] 방 입장")
    @MessageMapping(value = "/room/{roomCode}/enter")
    public void enter(@DestinationVariable String roomCode, @Header("Authorization") String token) {
        log.info("ENTER 시작");

        // room, user 추출
        User user = tokenService.getUserFromToken(token.replace("Bearer ", ""));
        Room room = roomService.findRoomByCode(roomCode);

        handlerService.subscribeUser(user.getUserSeq(), roomCode); // 유저 관리
        roomEnterInfoRedisService.enterUser(roomCode, user); // CurSeats 관리

        // ROOM_ENTER_SETTING 보내기
        RoomSettingDTO roomSettingDTO = RoomSettingDTO
                .builder()
                .title(room.getTitle())
                .ownerSeq(room.getOwner().getUserSeq())
                .jobSetting(roomJobSettingRedisService.findExcludeJobSettingByRoomCode(roomCode))
                .curSeats(roomEnterInfoRedisService.getUserEnterInfo(roomCode))
                .message(user.getNickname() +"님이 입장하셨습니다.")
                .build();
        redisPublisher.stompPublish(roomTopic, DataDTO.builder()
                .type("ROOM_ENTER_SETTING")
                .code(roomCode)
                .data(roomSettingDTO)
                .build());

        log.info("ENTER 끝");
    }

    @Operation(summary = "[CHAT] 채팅 메세지")
    @MessageMapping(value = "/room/{roomCode}/chat")
    public void chat(@DestinationVariable String roomCode, ChatMessageDTO chatMessageDTO) {
        log.info("CHAT 시작");

        chatMessageDTO.setNickname(userRepository.findNicknameByUserSeq(chatMessageDTO.getSenderSeq())); // 닉네임 설정

        // ROOM_CHAT 보내기
        redisPublisher.stompPublish(roomTopic, DataDTO.builder()
                .type("ROOM_CHAT")
                .code(roomCode)
                .data(chatMessageDTO)
                .build());

        log.info("CHAT 끝");
    }

    @Operation(summary = "[EXIT] 방 퇴장")
    @MessageMapping(value = "/room/{roomCode}/exit")
    public void exit(@DestinationVariable String roomCode, @Header("Authorization") String token) {
        log.info("EXIT 시작");

        User user = tokenService.getUserFromToken(token.replace("Bearer ", ""));
        handlerService.unsubscribeUser(user.getUserSeq());

        log.info("EXIT 끝");
    }

    @Operation(summary = "[COMEBACK] 방 복귀")
    @MessageMapping(value = "/room/{roomCode}/comeBack")
    public void backToRoom(@DestinationVariable String roomCode, @Header("Authorization") String token) {
        log.info("COMEBACK 시작");

        // room, user 추출
        User user = tokenService.getUserFromToken(token.replace("Bearer ", ""));
        Room room = roomService.findRoomByCode(roomCode);

        // ROOM_COMEBACK_SETTING 보내기
        RoomSettingDTO roomSettingDTO = RoomSettingDTO
                .builder()
                .title(room.getTitle())
                .ownerSeq(room.getOwner().getUserSeq())
                .jobSetting(roomJobSettingRedisService.findExcludeJobSettingByRoomCode(roomCode))
                .curSeats(roomEnterInfoRedisService.getUserEnterInfo(roomCode))
                .message(user.getNickname() +"님이 방으로 복귀하였습니다.")
                .build();
        redisPublisher.stompPublish(roomTopic, DataDTO.builder()
                .type("ROOM_COMEBACK_SETTING")
                .code(roomCode)
                .data(roomSettingDTO)
                .build());

        log.info("COMEBACK 끝");
    }

    @Operation(summary = "[SET] 방 제목 세팅")
    @MessageMapping(value = "/room/{roomCode}/title")
    public void setTitle(@DestinationVariable String roomCode, RoomSettingDTO roomSettingDTO) {
        log.info("TITLE 시작");

        roomService.checkValidTitle(roomSettingDTO.getTitle()); // title 유효성 검사
        roomService.updateTitle(roomCode, roomSettingDTO.getTitle()); // db에 title update

        // ROOM_TITLE 보내기
        redisPublisher.stompPublish(roomTopic, DataDTO.builder()
                .type("ROOM_TITLE")
                .code(roomCode)
                .data(roomSettingDTO.getTitle())
                .build());

        log.info("TITLE 끝");
    }

    @Operation(summary = "[JOB SETTING] 직업 세팅")
    @MessageMapping(value = "/room/{roomCode}/jobSetting")
    public void setTitle(@DestinationVariable String roomCode, JobSettingDTO jobSettingDTO) {
        log.info("JOB SETTING 시작");

        roomJobSettingRedisService.setAllJobSetting(roomCode, jobSettingDTO); // redis에 jobSetting 저장
//        roomJobSettingRedisService.findRoomJobSettingByCode(roomCode); // todo: 이거 주석처리돼도 상관없는지 확인

        // ROOM_JOB_SETTING 보내기
        redisPublisher.stompPublish(roomTopic, DataDTO.builder()
                .type("ROOM_JOB_SETTING")
                .code(roomCode)
                .data(jobSettingDTO)
                .build());

        log.info("JOB SETTING 끝");
    }

    @Operation(summary = "[CurSeats] 인원 수정")
    @MessageMapping(value = "/room/{roomCode}/curSeats")
    public void setCurSeats(@DestinationVariable String roomCode, CurrentSeatsDTOList currentSeatsDTOList) {
        log.info("CURRENT SEATS 시작");

        roomEnterInfoRedisService.updateCurrentSeatsDTO(roomCode, currentSeatsDTOList); // redis에 curSeats 수정
        roomService.updateMaxUserNum(roomCode, currentSeatsDTOList); // db에 maxUserNum 수정

        // ROOM_CUR_SEATS 보내기
        redisPublisher.stompPublish(roomTopic, DataDTO.builder()
                .type("ROOM_CUR_SEATS")
                .code(roomCode)
                .data(currentSeatsDTOList.getCurSeats())
                .build());

        log.info("CURRENT SEATS 끝");
    }

    @Operation(summary = "[START] 게임 시작")
    @MessageMapping(value = "/room/{roomCode}/start")
    public void startGame(@DestinationVariable String roomCode) {
        log.info("START 시작");

        String gameCode = roomService.generateGameCode(roomCode); // gameCode 생성
        newTimerService.createRoomTimer(gameCode); // timer 생성

        // ROOM_START 보내기
        redisPublisher.stompPublish(roomTopic, DataDTO.builder()
                .type("ROOM_START")
                .code(roomCode)
                .data(gameCode)
                .build());

        log.info("START 끝");
    }
}
