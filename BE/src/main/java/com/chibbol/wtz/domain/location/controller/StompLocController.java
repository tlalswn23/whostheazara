package com.chibbol.wtz.domain.location.controller;

import com.chibbol.wtz.domain.location.dto.LocationDTO;
import com.chibbol.wtz.global.stomp.service.StompService;
import com.chibbol.wtz.global.stomp.dto.DataDTO;
import com.chibbol.wtz.global.stomp.service.RedisPublisher;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
@Slf4j
public class StompLocController {
    private final StompService stompService;
    private final RedisPublisher publisher;

    @Operation(summary = "캐릭터 위치 이동")
    @MessageMapping("/{gameCode}/loc")
    public void location(@DestinationVariable String gameCode, LocationDTO locationDTO){
        // 캐릭터 변경 된 위치 받은 그대로 모든 유저들에게 전송
        log.info(locationDTO.toString());
        stompService.addTopic(gameCode);
        publisher.publish(stompService.getTopic(gameCode),
                DataDTO.builder()
                        .type("CHAR_LOC")
                        .gameCode(gameCode)
                        .data(locationDTO)
                        .build());
    }
}
