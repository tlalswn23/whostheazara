package com.chibbol.wtz.domain.vote.entity;

import lombok.Builder;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class VoteTurnRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long voteTurnRecordSeq;

    @Column
    private String gameCode;

    @Column
    private int turn;

    @Column
    private Long userSeq;

    @Column
    private Long targetUserSeq;

    @Builder
    public VoteTurnRecord(String gameCode, int turn, Long userSeq, Long targetUserSeq) {
        this.gameCode = gameCode;
        this.turn = turn;
        this.userSeq = userSeq;
        this.targetUserSeq = targetUserSeq;
    }
}
