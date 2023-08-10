package com.chibbol.wtz.global.timer.controller;

import com.chibbol.wtz.global.timer.service.NewTimerService;
import com.chibbol.wtz.global.timer.service.StompTimerService;
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
    private final StompTimerService stompTimerService;

    // 투표 결과 알리기
    @Operation(summary = "타이머 종료 알림")
    @MessageMapping("/game/{gameCode}/timer")
    public void timer(@DestinationVariable String gameCode, String userSeq) {
        newTimerService.timerEndUser(gameCode, Long.parseLong(userSeq));
    }

    @Operation(summary = "타이머 시간 감소")
    @MessageMapping("/game/{gameCode}/timer/decrease")
    public void timerDecrease(@DestinationVariable String gameCode, String userSeq) {
        newTimerService.timerDecreaseUser(gameCode, Long.parseLong(userSeq));
    }
}
