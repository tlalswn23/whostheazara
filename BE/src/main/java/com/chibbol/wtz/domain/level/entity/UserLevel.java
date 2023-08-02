package com.chibbol.wtz.domain.level.entity;

import com.chibbol.wtz.domain.level.dto.UserLevelDTO;
import com.chibbol.wtz.domain.level.repository.UserLevelRepository;
import com.chibbol.wtz.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.boot.context.properties.bind.DefaultValue;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor // 기본 생성자 자동 추가
public class UserLevel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long levelSeq;

    @ManyToOne
    @JoinColumn(name = "user_seq", nullable = false)
    private User user;

    @Column
    @ColumnDefault("-1")
    private int level;

    @Column
    @ColumnDefault("-1")
    private Long exp;

    @Builder
    public UserLevel(User user, int level, Long exp){
        this.user = user;
        this.level = level;
        this.exp = exp;
    }

    public UserLevel update(UserLevel userLevel) {
        if(userLevel.getLevel() != -1){
            this.level = userLevel.getLevel();
        }
        if(userLevel.getExp() != -1){
            this.exp = userLevel.getExp();
        }
        return this;
    }

}
