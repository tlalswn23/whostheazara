package com.chibbol.wtz.global.timer.service;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class TimerScheduler {
    private final TimerService timerService;

    @Scheduled(fixedDelay = 5000)
    public void decreaseRoomTimer() {
        List<Long> roomSeqList = timerService.getRoomSeqList();
        for (Long roomSeq : roomSeqList) {
            timerService.decreaseRoomTimer(roomSeq, 5);
        }
    }
}
