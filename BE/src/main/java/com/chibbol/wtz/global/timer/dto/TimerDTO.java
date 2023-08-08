package com.chibbol.wtz.global.timer.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class TimerDTO {
    String time; // 낮/밤
    int turn;
    Long userSeq;
}

