package com.chibbol.wtz.domain.vote.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class VoteDTO {
    private Long roomSeq;
    private Long turn;
    private Long userSeq;
    private Long targetUserSeq;

    @Builder
    public VoteDTO(Long roomSeq, Long turn, Long userSeq, Long targetUserSeq) {
        this.roomSeq = roomSeq;
        this.turn = turn;
        this.userSeq = userSeq;
        this.targetUserSeq = targetUserSeq;
    }
}
