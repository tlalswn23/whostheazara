package com.chibbol.wtz.global.timer.service;

import com.chibbol.wtz.domain.room.service.RedisPublisher;
import com.chibbol.wtz.global.stomp.dto.DataDTO;
import com.chibbol.wtz.global.stomp.service.StompService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class StompTimerService {
    private final RedisPublisher publisher;
    private final StompService stompService;

    public void sendToClient(String type, String gameCode, Object data){
        stompService.addTopic(gameCode); // 공통
        publisher.publish(stompService.getTopic(gameCode),
                DataDTO.builder()
                        .type(type)
                        .gameCode(gameCode)
                        .data(data)
                        .build());
        log.info("sendToClient : " + type + " " + gameCode + " " + data);
    }
}
