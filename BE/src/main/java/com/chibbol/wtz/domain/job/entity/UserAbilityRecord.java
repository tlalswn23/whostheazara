package com.chibbol.wtz.domain.job.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.time.LocalDateTime;

@Getter
@ToString
@RedisHash("userAbilityRecord")
public class UserAbilityRecord {
    private Long roomSeq;
    private Long turn;
    @Id
    private Long userSeq;
    private Long targetUserSeq;
    private boolean isSuccess;
    private LocalDateTime usedAt;

    @Builder
    public UserAbilityRecord(Long roomSeq, Long turn, Long userSeq, Long targetUserSeq) {
        this.roomSeq = roomSeq;
        this.turn = turn;
        this.userSeq = userSeq;
        this.targetUserSeq = targetUserSeq;
        this.isSuccess = false;
        this.usedAt = LocalDateTime.now();
    }

    public UserAbilityRecord success() {
        this.isSuccess = true;
        return this;
    }
}
