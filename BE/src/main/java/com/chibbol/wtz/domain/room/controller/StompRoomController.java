package com.chibbol.wtz.domain.room.controller;

import com.chibbol.wtz.domain.room.dto.ChatMessageDTO;
import com.chibbol.wtz.domain.room.dto.CurrentSeatsDTO;
import com.chibbol.wtz.domain.room.dto.DataDTO;
import com.chibbol.wtz.domain.room.exception.SeatNotFoundException;
import com.chibbol.wtz.domain.room.repository.RoomEnterRedisRepository;
import com.chibbol.wtz.domain.room.service.RedisPublisher;
import com.chibbol.wtz.domain.room.service.StompRoomService;
import com.chibbol.wtz.domain.user.entity.User;
import com.chibbol.wtz.domain.user.repository.UserRepository;
import com.chibbol.wtz.global.security.service.TokenService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.bytebuddy.build.Plugin;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class StompRoomController {

    private final RedisPublisher redisPublisher;
    private final StompRoomService stompRoomService;
    private final TokenService tokenService;
    private final RoomEnterRedisRepository roomEnterRedisRepository;
    private final UserRepository userRepository;

    // ws 프로토콜로 사용한 "/pub/chat/enter"과 매칭
    @Operation(summary = "[ENTER] 방 입장") // todo: 토픽 구독
    @MessageMapping(value = "/room/{roomCode}/enter")
    public void enter(@DestinationVariable String roomCode, @Header("Authorization") String token) {
        log.info("ENTER 시작");
        String processedToken = token.replace("Bearer ", "");
        User user = tokenService.getUserFromToken(processedToken);
        // 유저 관리
        CurrentSeatsDTO currentSeatsDTO = roomEnterRedisRepository.enterUser(roomCode, user); // 유저 정보 저장
        if (currentSeatsDTO == null) {
            throw new SeatNotFoundException("빈 자리가 없습니다!");
        }
        log.info("현재 유저 수 : "roomEnterRedisRepository.getUsingSeats(roomCode));
        // 메세지 보내기
        ChatMessageDTO chatMessageDTO = ChatMessageDTO.builder()
                .nickname(user.getNickname())
                .message(user.getNickname() +"님이 채팅방에 입장하셨습니다.")
                .build();
        DataDTO dataDTO = DataDTO.builder()
                .type("ENTER")
                .roomCode(roomCode)
                .objectDTO(chatMessageDTO)
                .build();
        stompRoomService.setRoomTopic(roomCode);
        redisPublisher.publish(stompRoomService.getTopic(roomCode), dataDTO); // websocket에 발행된 메세지를 redis로 발행(publish)
        log.info("ENTER 끝");
    }

    @Operation(summary = "[CHAT] 채팅 메세지")
    @MessageMapping(value = "/room/{roomCode}/chat")
    public void chat(@DestinationVariable String roomCode, ChatMessageDTO chatMessageDTO) {
        log.info("CHAT 시작");
        chatMessageDTO.setNickname(userRepository.findNicknameByUserSeq(chatMessageDTO.getSenderSeq()));
        DataDTO dataDTO = DataDTO.builder()
                .type("CHAT")
                .roomCode(roomCode)
                .objectDTO(chatMessageDTO)
                .build();
        stompRoomService.setRoomTopic(roomCode);
        redisPublisher.publish(stompRoomService.getTopic(roomCode), dataDTO);
        log.info("CHAT 끝");
    }

//    @Operation(summary = "[SET] 방 제목 세팅")
//    @MessageMapping(value = "/room/{roomCode}/title")
//    public void setTitle(@DestinationVariable String roomCode, )

}
