package com.chibbol.wtz.global.timer.entity;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Timer {
    private int remainingTime;
    private int turn;
    private String timerType;
    private LocalDateTime startAt;

    @Builder
    public Timer(int remainingTime, int turn, String timerType) {
        this.remainingTime = remainingTime;
        this.turn = turn;
        this.timerType = timerType;
        this.startAt = LocalDateTime.now();
    }
}
