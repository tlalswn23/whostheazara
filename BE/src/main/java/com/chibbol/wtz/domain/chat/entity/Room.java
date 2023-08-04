package com.chibbol.wtz.domain.chat.entity;

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
    private String title;

    @JoinColumn(name="user_seq", nullable = false)
    @ManyToOne
    private User owner;

    @Column(nullable = false)
    private String code;

    @Column(nullable = false)
    private LocalDateTime startAt;

    @Column
    private LocalDateTime endAt;

    @Builder
    public Room(Long roomSeq, String title, User owner, String code, LocalDateTime endAt) {
        this.roomSeq = roomSeq;
        this.title = title;
        this.owner = owner;
        this.code = code;
        this.startAt = LocalDateTime.now();
        this.endAt = endAt;
    }

    public Room update(Room room) {
        if(room.getTitle() != null)
            this.title = room.getTitle();
        if(room.getOwner() != null)
            this.owner = room.getOwner();
        if(room.getCode() != null)
            this.code = room.getCode();
        if(room.getEndAt() != null)
            this.endAt = room.getEndAt();
        return this;
    }
}