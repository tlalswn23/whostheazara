package com.chibbol.wtz.domain.shop.entity;

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
public class UserItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userItemSeq;

    @JoinColumn(name = "user_seq")
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @JoinColumn(name = "item_seq")
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Item item;

    @Column
    private LocalDateTime buyAt;

    @Builder
    public UserItem(User user, Item item) {
        this.user = user;
        this.item = item;
        this.buyAt = LocalDateTime.now();
    }
}
