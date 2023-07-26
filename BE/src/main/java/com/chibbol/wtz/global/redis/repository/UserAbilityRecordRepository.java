package com.chibbol.wtz.global.redis.repository;

import com.chibbol.wtz.domain.job.entity.UserAbilityRecord;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Repository
public class UserAbilityRecordRepository {

    private final RedisTemplate<String, UserAbilityRecord> redisTemplate;
    private final HashOperations<String, Long, List<UserAbilityRecord>> hashOperations;

    public UserAbilityRecordRepository(RedisTemplate<String, UserAbilityRecord> redisTemplate) {
        this.redisTemplate = redisTemplate;
        this.hashOperations = redisTemplate.opsForHash();
    }

    public List<UserAbilityRecord> findAllByRoomSeqAndTurn(Long roomSeq, Long turn) {
        System.out.println("FIND : " + roomSeq + " " + turn);
        List<UserAbilityRecord> records = hashOperations.get(String.valueOf(roomSeq), turn);
        return records != null ? records : Collections.emptyList();
    }

    public void save(UserAbilityRecord userAbilityRecord) {
        System.out.println("SAVE : " + userAbilityRecord.toString());
        Long roomSeq = userAbilityRecord.getRoomSeq();
        Long turn = userAbilityRecord.getTurn();

        List<UserAbilityRecord> existingRecords = hashOperations.get(String.valueOf(roomSeq), turn);

        if (existingRecords == null) {
            existingRecords = new ArrayList<>();
        }

        existingRecords.add(userAbilityRecord);
        hashOperations.put(String.valueOf(roomSeq), turn, existingRecords);
    }

    public void saveAll(List<UserAbilityRecord> userAbilityRecords) {
        if(userAbilityRecords == null || userAbilityRecords.isEmpty()) {
            return;
        }
        Long roomSeq = userAbilityRecords.get(0).getRoomSeq();
        Long turn = userAbilityRecords.get(0).getTurn();

        hashOperations.put(String.valueOf(roomSeq), turn, userAbilityRecords);
    }
}
