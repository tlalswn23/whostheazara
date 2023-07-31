package com.chibbol.wtz.domain.job.repository;

import com.chibbol.wtz.domain.job.entity.UserAbilityRecord;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class UserAbilityRecordRedisRepository {

    private final String KEY_PREFIX = "userAbilityRecord";

    private final RedisTemplate<String, String> redisTemplate;
    private final ObjectMapper objectMapper;

    public UserAbilityRecordRedisRepository(RedisTemplate<String, String> redisTemplate, ObjectMapper objectMapper) {
        this.redisTemplate = redisTemplate;
        this.objectMapper = objectMapper;
    }

    public List<UserAbilityRecord> findAllByRoomSeqAndTurn(Long roomSeq, Long turn) {
        String key = generateKey(roomSeq, turn);
        List<Object> jsonDataList = redisTemplate.opsForHash().values(key);
        return convertJsonDataListToUserAbilityRecordList(jsonDataList);
    }

    public void save(UserAbilityRecord userAbilityRecord) {
        Long roomSeq = userAbilityRecord.getRoomSeq();
        Long turn = userAbilityRecord.getTurn();
        String key = generateKey(roomSeq, turn);
        String userSeqField = userAbilityRecord.getUserSeq().toString();

        try {
            String jsonData = objectMapper.writeValueAsString(userAbilityRecord);
            redisTemplate.opsForHash().put(key, userSeqField, jsonData);
        } catch (JsonProcessingException e) {
            // 예외 처리: 로그 기록 또는 사용자 정의 예외 발생 등
            e.printStackTrace();
        }
    }

    public void saveAll(List<UserAbilityRecord> userAbilityRecords) {
        if (userAbilityRecords == null || userAbilityRecords.isEmpty()) {
            return;
        }
        for (UserAbilityRecord userAbilityRecord : userAbilityRecords) {
            save(userAbilityRecord);
        }
    }

    private String generateKey(Long roomSeq, Long turn) {
        return KEY_PREFIX + ":room:" + roomSeq + ":turn:" + turn;
    }

    private List<UserAbilityRecord> convertJsonDataListToUserAbilityRecordList(List<Object> jsonDataList) {
        List<UserAbilityRecord> resultList = new ArrayList<>();
        for (Object jsonData : jsonDataList) {
            if (jsonData instanceof String) {
                try {
                    UserAbilityRecord userAbilityRecord = objectMapper.readValue((String) jsonData, UserAbilityRecord.class);
                    resultList.add(userAbilityRecord);
                } catch (IOException e) {
                    // 예외 처리: 로그 기록 또는 사용자 정의 예외 발생 등
                    e.printStackTrace();
                }
            }
        }
        return resultList;
    }
}
