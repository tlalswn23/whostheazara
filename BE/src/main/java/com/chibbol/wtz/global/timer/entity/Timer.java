package com.chibbol.wtz.global.timer.entity;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Timer {
    private int remainingTime;
    private int turn;
    private String timerType;
}
