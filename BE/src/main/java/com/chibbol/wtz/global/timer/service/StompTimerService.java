package com.chibbol.wtz.global.timer.service;

import com.chibbol.wtz.global.stomp.dto.DataDTO;
import com.chibbol.wtz.global.stomp.service.RedisPublisherAll;
import com.chibbol.wtz.global.stomp.service.StompService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class StompTimerService {
    private final RedisPublisherAll publisher;
    private final StompService stompService;

    public void sendToClient(String type, String roomCode, Object data){
        stompService.addTopic(roomCode); // 공통
        publisher.publish(stompService.getTopic(roomCode),
                DataDTO.builder()
                        .type(type)
                        .roomCode(roomCode)
                        .data(data)
                        .build());
        log.info("sendToClient : " + type + " " + roomCode + " " + data);
    }
}
