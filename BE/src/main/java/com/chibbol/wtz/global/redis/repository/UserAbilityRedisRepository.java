package com.chibbol.wtz.global.redis.repository;

import com.chibbol.wtz.domain.job.entity.UserAbilityRecord;
import com.chibbol.wtz.domain.room.entity.Room;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserAbilityRedisRepository extends CrudRepository<UserAbilityRecord, Room> {
    List<UserAbilityRecord> findByRoomAndTurn(Room room, Long turn);
}
