package com.chibbol.wtz.global.timer.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class TimerDataDTO {
    String type;
    Long userSeq;
    Long turn;
}
