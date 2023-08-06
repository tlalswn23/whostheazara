package com.chibbol.wtz.global.timer.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class timerDTO {
    String time; // 낮/밤
    Long turn;
    Long userSeq;
}
