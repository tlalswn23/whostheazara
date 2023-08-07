package com.chibbol.wtz.global.timer.controller;

import com.chibbol.wtz.global.timer.dto.TimerDataDTO;
import com.chibbol.wtz.global.timer.service.NewTimerService;
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
    private final NewTimerService newTimerService;

    // 투표 결과 알리기
    @Operation(summary = "타이머 종료 알림")
    @MessageMapping("/game/{gameCode}/timer")
    public void timer(@DestinationVariable Long roomSeq, TimerDataDTO data) {
        newTimerService.timerEndUser(roomSeq, data.getUserSeq());
    }
}
