package com.chibbol.wtz.domain.vote.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.redis.core.RedisHash;

@Getter
@ToString
@RedisHash("Vote")
public class Vote {
    private Long roomSeq;
    private Long userSeq;
    private Long targetUserSeq;

    @Builder
    public Vote(Long roomSeq, Long userSeq, Long targetUserSeq) {
        this.roomSeq = roomSeq;
        this.userSeq = userSeq;
        this.targetUserSeq = targetUserSeq;
    }
}
