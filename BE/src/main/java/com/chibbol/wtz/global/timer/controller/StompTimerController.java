package com.chibbol.wtz.global.timer.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class StompTimerController {

    @Operation(summary = "타이머 종료 알림")
    @MessageMapping("/{roomSeq}/timer")
    public void timer(@DestinationVariable Long roomSeq, Long userSeq){


    }
}
