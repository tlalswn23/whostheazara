package com.chibbol.wtz.domain.room.entity;

import com.chibbol.wtz.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomSeq;

    @Column(nullable = false)
    private String roomName;

    @JoinColumn(name="user_seq", nullable = false)
    @ManyToOne
    private User owner;

    @Column(nullable = false)
    private String roomId;

    @Column(nullable = false)
    private LocalDateTime startAt;

    @Column
    private LocalDateTime endAt;

    @Builder
    public Room(String roomName, User owner, String roomId) {
        this.roomName = roomName;
        this.owner = owner;
        this.roomId = roomId;
        this.startAt = LocalDateTime.now();
    }
}
