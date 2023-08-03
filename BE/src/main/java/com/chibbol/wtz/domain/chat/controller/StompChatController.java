package com.chibbol.wtz.domain.chat.controller;

import com.chibbol.wtz.domain.chat.dto.ChatMessageDTO;
import com.chibbol.wtz.domain.chat.service.RedisPublisher;
import com.chibbol.wtz.domain.chat.service.StompChatService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class StompChatController {

    private final RedisPublisher redisPublisher;
    private final StompChatService stompChatService;

    // ws 프로토콜로 사용한 "/pub/chat/enter"과 매칭
    @Operation(summary = "채팅방 입장") // todo: 토픽 구독
    @MessageMapping(value = "/chat/enter")
    public void enter(ChatMessageDTO chatMessageDTO) {
        chatMessageDTO.setMessage(chatMessageDTO.getUserSeq() + "님이 채팅방에 입장하셨습니다.");
        stompChatService.enterChatRoom(chatMessageDTO.getCode());
        redisPublisher.publish(stompChatService.getTopic(chatMessageDTO.getCode()), chatMessageDTO); // websocket에 발행된 메세지를 redis로 발행(publish)
    }

    @Operation(summary = "채팅 메세지")
    @MessageMapping(value = "/chat/message")
    public void message(ChatMessageDTO chatMessageDTO) {
        stompChatService.enterChatRoom(chatMessageDTO.getCode());
        redisPublisher.publish(stompChatService.getTopic(chatMessageDTO.getCode()), chatMessageDTO);
    }

}
