package com.chibbol.wtz.global.timer.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class TimerDataDTO {
    String type;
    Long userSeq;
    int turn;

    @Builder
    public TimerDataDTO(String type, Long userSeq, int turn) {
        this.type = type;
        this.userSeq = userSeq;
        this.turn = turn;
    }
}
