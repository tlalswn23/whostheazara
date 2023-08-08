package com.chibbol.wtz.global.timer.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserJobDataDTO {
    private Long userSeq;
    private Long jobSeq;

    @Builder
    public UserJobDataDTO(Long userSeq, Long jobSeq) {
        this.userSeq = userSeq;
        this.jobSeq = jobSeq;
    }
}
