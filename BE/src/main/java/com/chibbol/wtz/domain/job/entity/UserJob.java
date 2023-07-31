package com.chibbol.wtz.domain.job.entity;

import com.chibbol.wtz.domain.room.entity.Room;
import com.chibbol.wtz.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserJob {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userJobSeq;

    @JoinColumn(name = "user_seq")
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @JoinColumn(name = "job_seq")
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Job job;

    @JoinColumn(name = "room_seq")
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Room room;

    @Column
    @ColumnDefault("true")
    private boolean isAlive;

    @Column
    @ColumnDefault("false")
    private boolean useAbility;

    @Column
    @ColumnDefault("true")
    private boolean canVote;

    @Column
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime updatedAt;

    @Builder
    public UserJob(User user, Job job, Room room, boolean isAlive, boolean useAbility, boolean canVote) {
        this.user = user;
        this.job = job;
        this.room = room;
        this.isAlive = isAlive;
        this.useAbility = useAbility;
        this.canVote = canVote;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public UserJob update(UserJob userJob) {
        if(userJob.getUser() != null)
            this.user = userJob.getUser();
        if(userJob.getJob() != null)
            this.job = userJob.getJob();
        if(userJob.getRoom() != null)
            this.room = userJob.getRoom();
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
