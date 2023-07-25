package com.chibbol.wtz.domain.job.entity;

import com.chibbol.wtz.domain.room.entity.Room;
import com.chibbol.wtz.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
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
    private LocalDateTime createdAt;

    @Builder
    public UserJob(User user, Job job, Room room) {
        this.user = user;
        this.job = job;
        this.room = room;
        this.createdAt = LocalDateTime.now();
    }

    public void update(UserJob userJob) {
        if(userJob.getUser() != null)
            this.user = userJob.getUser();
        if(userJob.getJob() != null)
            this.job = userJob.getJob();
        if(userJob.getRoom() != null)
            this.room = userJob.getRoom();
    }
}
