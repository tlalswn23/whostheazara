package com.chibbol.wtz.domain.vote.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class VoteDTO {
    private String roomCode;
    private int turn;
    private Long userSeq;
    private Long targetUserSeq;

    @Builder
    public VoteDTO(String roomCode, int turn, Long userSeq, Long targetUserSeq) {
        this.roomCode = roomCode;
        this.turn = turn;
        this.userSeq = userSeq;
        this.targetUserSeq = targetUserSeq;
    }
}
