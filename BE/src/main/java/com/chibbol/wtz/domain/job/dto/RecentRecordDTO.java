package com.chibbol.wtz.domain.job.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class RecentRecordDTO {
    private Long jobSeq;
    private Long roomSeq;
    private boolean isWin;
    private LocalDateTime playAt;

    @Builder
    public RecentRecordDTO(Long jobSeq, Long roomSeq, boolean isWin, LocalDateTime playAt) {
        this.jobSeq = jobSeq;
        this.roomSeq = roomSeq;
        this.isWin = isWin;
        this.playAt = playAt;
    }
}
