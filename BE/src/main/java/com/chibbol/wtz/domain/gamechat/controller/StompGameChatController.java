package com.chibbol.wtz.domain.gamechat.controller;

import com.chibbol.wtz.domain.gamechat.dto.MessageDTO;
import com.chibbol.wtz.domain.gamechat.dto.SendMessageDTO;
import com.chibbol.wtz.domain.user.repository.UserRepository;
import com.chibbol.wtz.global.stomp.dto.DataDTO;
import com.chibbol.wtz.global.stomp.service.RedisPublisher;
import com.chibbol.wtz.global.stomp.service.StompService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
@Slf4j
@RequiredArgsConstructor
public class StompGameChatController {

    private final RedisPublisher publisher;
    private final StompService stompService;
    private final UserRepository userRepository;

    // gameCode Long으로 받는 거 수정해야 됨
    @Operation(summary = "전체 채팅")
    @MessageMapping("/game/{gameCode}/chat/all")
    public void chatAll(@DestinationVariable String gameCode, MessageDTO messageDTO){
        stompService.addTopic(gameCode);
        SendMessageDTO message = SendMessageDTO.builder()
                .sender(messageDTO.getUserSeq())
                .nickname(userRepository.findNicknameByUserSeq(messageDTO.getUserSeq()))
                .message(messageDTO.getMessage()).build();

        publisher.publish(stompService.getTopic(gameCode),
                DataDTO.builder()
                        .type("CHAT_ALL")
                        .code(gameCode)
                        .data(message)
                        .build());
    }

    @Operation(summary = "자라 채팅")
    @MessageMapping("/game/{gameCode}/chat/zara")
    public void chatZara(@DestinationVariable String gameCode, MessageDTO messageDTO){
        stompService.addTopic(gameCode);
        SendMessageDTO message = SendMessageDTO.builder()
                .sender(messageDTO.getUserSeq())
                .nickname(userRepository.findNicknameByUserSeq(messageDTO.getUserSeq()))
                .message(messageDTO.getMessage()).build();

        publisher.publish(stompService.getTopic(gameCode),
                DataDTO.builder()
                        .type("CHAT_ZARA")
                        .code(gameCode)
                        .data(message)
                        .build());
    }


    @Operation(summary = "유령 채팅")
    @MessageMapping("/game/{gameCode}/chat/ghost")
    public void chatGhost(@DestinationVariable String gameCode, MessageDTO messageDTO){
        stompService.addTopic(gameCode);
        SendMessageDTO message = SendMessageDTO.builder()
                .sender(messageDTO.getUserSeq())
                .nickname(userRepository.findNicknameByUserSeq(messageDTO.getUserSeq()))
                .message(messageDTO.getMessage()).build();

        publisher.publish(stompService.getTopic(gameCode),
                DataDTO.builder()
                        .type("CHAT_GHOST")
                        .code(gameCode)
                        .data(message)
                        .build());
    }
}
