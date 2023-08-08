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
    private String roomCode;
    private boolean win;
    private LocalDateTime startAt;
    private LocalDateTime endAt;

    @Builder
    public RecentRecordDTO(Long jobSeq, String roomSeq, boolean win, LocalDateTime startAt, LocalDateTime endAt) {
        this.jobSeq = jobSeq;
        this.roomCode = roomCode;
        this.win = win;
        this.startAt = startAt;
        this.endAt = endAt;
    }
}
