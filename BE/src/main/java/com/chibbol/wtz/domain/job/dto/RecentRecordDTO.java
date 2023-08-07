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
    private boolean win;
    private LocalDateTime startAt;
    private LocalDateTime endAt;

    @Builder
    public RecentRecordDTO(Long jobSeq, Long roomSeq, boolean win, LocalDateTime startAt, LocalDateTime endAt) {
        this.jobSeq = jobSeq;
        this.roomSeq = roomSeq;
        this.win = win;
        this.startAt = startAt;
        this.endAt = endAt;
    }
}
