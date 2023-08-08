package com.chibbol.wtz.global.timer.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TimerDTO {
    private String timerType;
    private int timerTime;
    private int turn;

    @Builder
    public TimerDTO(String timerType, int timerTime, int turn) {
        this.timerType = timerType;
        this.timerTime = timerTime;
        this.turn = turn;
    }
}
