package com.chibbol.wtz.global.timer.controller;

import com.chibbol.wtz.global.timer.service.TimerService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/timer")
public class TimerController {
    private final TimerService timerService;

    @PostMapping("/create")
    public void createRoomTimer(Long roomSeq) {
        timerService.createRoomTimer(roomSeq);
    }

    @PostMapping("/decrease")
    public boolean decreaseRoomTimer(Long roomSeq, int decreaseTime) {
        return timerService.decreaseRoomTimer(roomSeq, decreaseTime);
    }

    @DeleteMapping("/delete")
    public void deleteRoomTimer(Long roomSeq) {
        timerService.deleteRoomTimer(roomSeq);
    }

    @PatchMapping("/start")
    public void startRoomTimer(Long roomSeq) {
        timerService.startRoomTimer(roomSeq);
    }

}
