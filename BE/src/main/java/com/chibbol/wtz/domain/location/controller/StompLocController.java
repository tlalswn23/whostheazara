package com.chibbol.wtz.domain.location.controller;

import com.chibbol.wtz.domain.location.dto.LocationDTO;
import com.chibbol.wtz.global.stomp.dto.dataDTO;
import com.chibbol.wtz.global.stomp.service.RedisPublisherAll;
import com.chibbol.wtz.global.stomp.service.StompService;
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
    private final RedisPublisherAll publisher;

    @Operation(summary = "캐릭터 위치 이동")
    @MessageMapping("/{roomSeq}/loc")
    public void location(@DestinationVariable Long roomSeq, LocationDTO locationDTO){
        // 캐릭터 변경 된 위치 받은 그대로 모든 유저들에게 전송
        log.info(locationDTO.toString());
        stompService.addTopic(roomSeq);
        publisher.publish(stompService.getTopic(roomSeq),
                dataDTO.builder()
                        .type("CHAR_LOC")
                        .roomSeq(roomSeq)
                        .data(locationDTO)
                        .build());
    }
}
