package com.chibbol.wtz.domain.job.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Id;
import java.time.LocalDateTime;

//@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RoomUserJob {
    @Id
    private Long userSeq;
    private Long jobSeq;
    private Long roomSeq;
    private boolean isAlive;
    private boolean useAbility;
    private boolean canVote;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Builder
    public RoomUserJob(Long userSeq, Long jobSeq, Long roomSeq, boolean isAlive, boolean useAbility, boolean canVote) {
        this.userSeq = userSeq;
        this.jobSeq = jobSeq;
        this.roomSeq = roomSeq;
        this.isAlive = isAlive;
        this.useAbility = useAbility;
        this.canVote = canVote;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public RoomUserJob update(RoomUserJob userJob) {
        if(userJob.userSeq != this.userSeq)
            this.userSeq = userJob.userSeq;
        if(userJob.jobSeq != this.jobSeq)
            this.jobSeq = userJob.jobSeq;
        if(userJob.roomSeq != this.roomSeq)
            this.roomSeq = userJob.roomSeq;
        if(userJob.isAlive != this.isAlive)
            this.isAlive = userJob.isAlive;
        if(userJob.useAbility != this.useAbility)
            this.useAbility = userJob.useAbility;
        if(userJob.canVote != this.canVote)
            this.canVote = userJob.canVote;
        this.updatedAt = LocalDateTime.now();
        return this;
    }
}
