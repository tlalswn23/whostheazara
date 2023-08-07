package com.chibbol.wtz.domain.chat.controller;

import com.chibbol.wtz.domain.chat.dto.ChatMessageDTO;
import com.chibbol.wtz.domain.chat.service.StompChatService;
import com.chibbol.wtz.global.security.service.TokenService;
import com.chibbol.wtz.global.stomp.service.RedisPublisher;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class StompChatController {

    private final RedisPublisher redisPublisher;
    private final StompChatService stompChatService;
    private final TokenService tokenService;

    // ws 프로토콜로 사용한 "/pub/chat/enter"과 매칭
    @Operation(summary = "채팅방 입장")
    @MessageMapping(value = "/chat/enter")
    public void enter(ChatMessageDTO chatMessageDTO) {
        log.info("채팅방 입장 시작");
        log.info("chatMessageDTO : "+chatMessageDTO.toString());
        chatMessageDTO.setUserName(stompChatService.findUserName(chatMessageDTO.getUserSeq()));
//        chatMessageDTO.setUserName(user.getNickname());
        chatMessageDTO.setMessage(chatMessageDTO.getUserName() + "님이 채팅방에 입장하셨습니다.");
        stompChatService.enterChatRoom(chatMessageDTO.getCode());
        redisPublisher.publish(stompChatService.getTopic(chatMessageDTO.getCode()), chatMessageDTO); // websocket에 발행된 메세지를 redis로 발행(publish)
        log.info("채팅방 입장 끝");
    }

    @Operation(summary = "채팅 메세지")
    @MessageMapping(value = "/chat/message")
    public void message(ChatMessageDTO chatMessageDTO) {
        log.info("채팅 메세지 시작");
        log.info("chatMessageDTO : "+chatMessageDTO.toString());
        chatMessageDTO.setUserName(stompChatService.findUserName(chatMessageDTO.getUserSeq()));
        stompChatService.enterChatRoom(chatMessageDTO.getCode());
        redisPublisher.publish(stompChatService.getTopic(chatMessageDTO.getCode()), chatMessageDTO);
        log.info("채팅 메세지 끝");
    }

}
