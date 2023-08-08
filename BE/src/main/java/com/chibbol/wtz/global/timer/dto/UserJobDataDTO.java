package com.chibbol.wtz.global.timer.dto;

import lombok.Builder;

public class UserJobDataDTO {
    private Long userSeq;
    private Long jobSeq;

    @Builder
    public UserJobDataDTO(Long userSeq, Long jobSeq) {
        this.userSeq = userSeq;
        this.jobSeq = jobSeq;
    }
}
