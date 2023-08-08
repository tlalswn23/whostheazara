package com.chibbol.wtz.domain.room.controller;

import com.chibbol.wtz.domain.room.dto.ChatMessageDTO;
import com.chibbol.wtz.domain.room.service.RedisPublisher;
import com.chibbol.wtz.domain.room.service.StompRoomService;
import com.chibbol.wtz.domain.user.entity.User;
import com.chibbol.wtz.global.security.service.TokenService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    // ws 프로토콜로 사용한 "/pub/chat/enter"과 매칭
    @Operation(summary = "채팅방 입장") // todo: 토픽 구독
    @MessageMapping(value = "/room/{roomCode}/enter")
    public void enter(@DestinationVariable String roomCode, @Header("Authorization") String token) {
        log.info("룸 코드" + roomCode);
        log.info("token : " + token);
        String processedToken = token.replace("Bearer ", "");
        User user = tokenService.getUserFromToken(processedToken);
        System.out.println(user.toString());
        log.info("방 입장 시작");
//        log.info("chatMessageDTO : "+chatMessageDTO.toString());
////        chatMessageDTO.setUserName(stompChatService.findUserName(chatMessageDTO.getUserSeq()));
//        chatMessageDTO.setUserName(user.getNickname());
//        chatMessageDTO.setMessage(chatMessageDTO.getUserName() + "님이 채팅방에 입장하셨습니다.");
//        stompRoomService.enterChatRoom(chatMessageDTO.getCode());
//        redisPublisher.publish(stompRoomService.getTopic(chatMessageDTO.getCode()), chatMessageDTO); // websocket에 발행된 메세지를 redis로 발행(publish)
        log.info("채팅방 입장 끝");
    }

    @Operation(summary = "채팅 메세지")
    @MessageMapping(value = "/chat")
    public void message(ChatMessageDTO chatMessageDTO, @Header("Authorization") String token) {
        User user = tokenService.getUserFromToken(token);
        log.info("채팅 메세지 시작");
        log.info("chatMessageDTO : "+chatMessageDTO.toString());
        chatMessageDTO.setUserName(stompRoomService.findUserName(chatMessageDTO.getUserSeq()));
        stompRoomService.enterChatRoom(chatMessageDTO.getCode());
        redisPublisher.publish(stompRoomService.getTopic(chatMessageDTO.getCode()), chatMessageDTO);
        log.info("채팅 메세지 끝");
    }

}
