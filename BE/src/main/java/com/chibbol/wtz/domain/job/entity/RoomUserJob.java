package com.chibbol.wtz.domain.job.entity;

import lombok.*;

import javax.persistence.Id;
import java.time.LocalDateTime;

//@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class RoomUserJob {
    @Id
    private Long userSeq;
    private Long jobSeq;
    private String roomCode;
    private boolean isAlive;
    private boolean useAbility;
    private boolean canVote;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Builder
    public RoomUserJob(Long userSeq, Long jobSeq, String roomCode, boolean isAlive, boolean useAbility, boolean canVote) {
        this.userSeq = userSeq;
        this.jobSeq = jobSeq;
        this.roomCode = roomCode;
        this.isAlive = isAlive;
        this.useAbility = useAbility;
        this.canVote = canVote;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public RoomUserJob useAbility() {
        this.useAbility = true;
        return this;
    }

    public RoomUserJob canVote(boolean canVote) {
        this.canVote = canVote;
        return this;
    }

    public RoomUserJob kill() {
        this.isAlive = false;
        return this;
    }
}
