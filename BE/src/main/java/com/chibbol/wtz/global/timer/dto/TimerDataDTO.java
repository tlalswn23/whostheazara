package com.chibbol.wtz.global.timer.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class TimerDataDTO {
    String type;
    Long userSeq;
    Long turn;
}
