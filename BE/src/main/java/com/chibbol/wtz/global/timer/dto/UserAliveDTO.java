package com.chibbol.wtz.global.timer.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class UserAliveDTO {
    Long userSeq;
    boolean alive;

    @Builder
    public UserAliveDTO(Long userSeq, boolean alive){
        this.userSeq = userSeq;
        this.alive = alive;
    }
}
