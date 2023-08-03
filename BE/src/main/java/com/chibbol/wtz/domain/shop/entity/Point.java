package com.chibbol.wtz.domain.shop.entity;

import com.chibbol.wtz.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Point {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pointSeq;

    @JoinColumn(name = "user_seq")
    @ManyToOne
    private User user;

    @Column
    private int point;

    @Builder
    public Point(User user, int point) {
        this.user = user;
        this.point = point;
    }

    public void addPoint(int point) {
        this.point += point;
    }

    public void usePoint(int point) {
        this.point -= point;
    }
}
