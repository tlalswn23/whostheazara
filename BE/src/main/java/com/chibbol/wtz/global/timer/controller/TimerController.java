package com.chibbol.wtz.global.timer.controller;

import com.chibbol.wtz.global.timer.service.TimerService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/timers")
public class TimerController {
    private final TimerService timerService;

    @PostMapping("/")
    public void createRoomTimer(Long roomSeq) {
        timerService.createRoomTimer(roomSeq);
    }

    @PatchMapping("/")
    public boolean decreaseRoomTimer(Long roomSeq, int decreaseTime) {
        return timerService.decreaseRoomTimer(roomSeq, decreaseTime);
    }

    @DeleteMapping("/")
    public void deleteRoomTimer(Long roomSeq) {
        timerService.deleteRoomTimer(roomSeq);
    }

    @PutMapping("/")
    public void startRoomTimer(Long roomSeq) {
        timerService.startRoomTimer(roomSeq);
    }

}
