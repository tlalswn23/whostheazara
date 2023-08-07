package com.chibbol.wtz.domain.room.entity;

import com.chibbol.wtz.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RoomUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomUserSeq;

    @JoinColumn(name = "room_seq")
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Room room;

    @JoinColumn(name = "user_seq")
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @Column
    private LocalDateTime joinAt;

    @Builder
    public RoomUser(Room room, User user) {
        this.room = room;
        this.user = user;
        this.joinAt = LocalDateTime.now();
    }

    public RoomUser update(RoomUser roomUser) {
        this.room = roomUser.getRoom();
        this.user = roomUser.getUser();
        return this;
    }
}
