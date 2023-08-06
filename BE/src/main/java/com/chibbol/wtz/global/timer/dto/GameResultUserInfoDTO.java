package com.chibbol.wtz.global.timer.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class GameResultUserInfoDTO {
    Long userSeq;
    Long jobSeq;
    boolean win;

    @Builder
    public GameResultUserInfoDTO(Long userSeq, Long jobSeq, boolean win){
        this.userSeq = userSeq;
        this.jobSeq = jobSeq;
        this.win = win;
    }

}
