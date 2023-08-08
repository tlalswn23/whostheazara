package com.chibbol.wtz.domain.vote.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.redis.core.RedisHash;

@Getter
@ToString
@RedisHash("Vote")
public class Vote {
    private String roomCode;
    private int turn;
    private Long userSeq;
    private Long targetUserSeq;

    @Builder
    public Vote(String roomCode, int turn, Long userSeq, Long targetUserSeq) {
        this.roomCode = roomCode;
        this.turn = turn;
        this.userSeq = userSeq;
        this.targetUserSeq = targetUserSeq;
    }
}
