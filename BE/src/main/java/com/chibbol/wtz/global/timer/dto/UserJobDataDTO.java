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
    private String nickname;

    @Builder
    public UserJobDataDTO(Long userSeq, Long jobSeq, String nickname) {
        this.userSeq = userSeq;
        this.jobSeq = jobSeq;
        this.nickname = nickname;
    }
}
