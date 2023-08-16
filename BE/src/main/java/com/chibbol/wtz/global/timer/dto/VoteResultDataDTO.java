package com.chibbol.wtz.global.timer.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class VoteResultDataDTO {
    private Long userSeq;
    private boolean politician;

    @Builder
    public VoteResultDataDTO(Long userSeq, boolean politician) {
        this.userSeq = userSeq;
        this.politician = politician;
    }
}
