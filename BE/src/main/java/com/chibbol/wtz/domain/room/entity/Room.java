package com.chibbol.wtz.domain.room.entity;

import com.chibbol.wtz.domain.user.entity.User;
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
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seq;

    @Column(nullable = false)
    private String title;

    @JoinColumn(name="user_seq", nullable = false)
    @ManyToOne
//    @OnDelete(action = OnDeleteAction.CASCADE)
    private User owner;

    @Column(nullable = false)
    private String code;

    @Column(nullable = false)
    private LocalDateTime startAt;

    @Column
    private LocalDateTime endAt;

    @Builder
    public Room(String title, User owner, String code) {
        this.title = title;
        this.owner = owner;
        this.code = code;
        this.startAt = LocalDateTime.now();
    }
}
