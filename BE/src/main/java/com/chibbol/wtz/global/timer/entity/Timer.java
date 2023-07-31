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
    private int timerTime;
    private int turn;
    private String timerType;
    private LocalDateTime startAt;

    @Builder
    public Timer(int timerTime, int turn, String timerType) {
        this.timerTime = timerTime;
        this.turn = turn;
        this.timerType = timerType;
        this.startAt = LocalDateTime.now();
    }
}
