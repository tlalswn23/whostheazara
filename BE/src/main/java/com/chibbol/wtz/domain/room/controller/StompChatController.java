package com.chibbol.wtz.domain.room.controller;

import com.chibbol.wtz.domain.room.dto.ChatMessageDTO;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class StompChatController {
    private final SimpMessagingTemplate template;  //특정 Broker로 메세지를 전달

    //Client가 SEND할 수 있는 경로
    //stompConfig에서 설정한 applicationDestinationPrefixes와 @MessageMapping 경로가 병합됨
    //"/pub/chat/enter"
    @Operation(summary = "채팅방 입장")
    @MessageMapping(value = "/chat/enter")
    public void enter(ChatMessageDTO message, java.security.Principal principal) {
        System.out.println("왜 안돼!");
        System.out.println(principal.getName());
        message.setOwner(principal.getName());
        message.setMessage(message.getOwner() + "님이 채팅방에 입장하셨습니다.");
        template.convertAndSend("/sub/chat/" + message.getCode(), message);
    }

    @Operation(summary = "채팅 메세지")
    @MessageMapping(value = "/chat/message")
    public void message(ChatMessageDTO message) {
        template.convertAndSend("/sub/chat/" + message.getCode(), message);
    }

}
