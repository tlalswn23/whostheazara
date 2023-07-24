package com.chibbol.wtz.domain.job.entity;

import com.chibbol.wtz.domain.room.entity.Room;
import com.chibbol.wtz.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.time.LocalDateTime;

@Getter
@RedisHash("userAbilityRecord")
public class UserAbilityRecord {
    @Id
    private Room room;
    private Long turn;
    private User user;
    private User targetUser;
    private LocalDateTime usedAt;

    @Builder
    public UserAbilityRecord(Room room, Long turn, User user, User targetUser) {
        this.room = room;
        this.turn = turn;
        this.user = user;
        this.targetUser = targetUser;
        this.usedAt = LocalDateTime.now();
    }
}
