package com.chibbol.wtz.domain.job.service;

import com.chibbol.wtz.domain.job.entity.UserAbilityRecord;
import com.chibbol.wtz.domain.room.entity.Room;
import com.chibbol.wtz.global.redis.repository.UserAbilityRedisRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobService {
    private final UserAbilityRedisRepository userAbilityRedisRepository;

    public List<UserAbilityRecord> getUserAbilityRecordsByRoomAndTurn(Room room, Long turn) {
        return userAbilityRedisRepository.findByRoomAndTurn(room, turn);
    }
}
