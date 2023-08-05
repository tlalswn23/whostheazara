package com.chibbol.wtz.domain.job.repository;

import com.chibbol.wtz.domain.job.entity.UserAbilityRecord;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Repository
@AllArgsConstructor
public class UserAbilityRecordRedisRepository {

    private final String KEY_PREFIX = "UserAbilityRecord";
    private final RedisTemplate<String, String> redisTemplate;
    private final ObjectMapper objectMapper;

    public List<UserAbilityRecord> findAllByRoomSeq(Long roomSeq) {
        List<UserAbilityRecord> resultList = new ArrayList<>();
        String pattern = generateKey(roomSeq, -1L);

        Set<String> keys = redisTemplate.keys(pattern);

        if(keys != null) {
            for (String key : keys) {
                List<Object> jsonDataList = redisTemplate.opsForHash().values(key);
                resultList.addAll(convertJsonDataListToUserAbilityRecordList(jsonDataList));
            }
        }

        return resultList;
    }

    public void deleteAllByRoomSeq(Long roomSeq) {
        String pattern = generateKey(roomSeq, -1L);
        Set<String> keys = redisTemplate.keys(pattern);
        if(keys != null) {
            redisTemplate.delete(keys);
        }
    }

    public List<UserAbilityRecord> findAllByRoomSeqAndTurn(Long roomSeq, Long turn) {
        String key = generateKey(roomSeq, turn);
        List<Object> jsonDataList = redisTemplate.opsForHash().values(key);
        return convertJsonDataListToUserAbilityRecordList(jsonDataList);
    }

    public UserAbilityRecord findByRoomSeqAndTurnAndUserSeq(Long roomSeq, Long turn, Long userSeq) {
        String key = generateKey(roomSeq, turn);
        String userSeqField = userSeq.toString();
        String jsonData = (String) redisTemplate.opsForHash().get(key, userSeqField);
        return convertJsonDataToUserAbilityRecord(jsonData);
    }

    public void save(UserAbilityRecord userAbilityRecord) {
        String key = generateKey(userAbilityRecord.getRoomSeq(), userAbilityRecord.getTurn());
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

        redisTemplate.executePipelined((RedisCallback<Object>) connection -> {
            for (UserAbilityRecord userAbilityRecord : userAbilityRecords) {
                String key = generateKey(userAbilityRecord.getRoomSeq(), userAbilityRecord.getTurn());
                String userSeqField = userAbilityRecord.getUserSeq().toString();

                try {
                    String jsonData = objectMapper.writeValueAsString(userAbilityRecord);
                    redisTemplate.opsForHash().put(key, userSeqField, jsonData);
                } catch (JsonProcessingException e) {
                    // 예외 처리: 로그 기록 또는 사용자 정의 예외 발생 등
                    e.printStackTrace();
                }
            }
            return null;
        });
    }

    private String generateKey(Long roomSeq, Long turn) {
        return turn == -1L ? KEY_PREFIX + ":room:" + roomSeq + ":turn:*" : KEY_PREFIX + ":room:" + roomSeq + ":turn:" + turn;
    }

    private UserAbilityRecord convertJsonDataToUserAbilityRecord(String jsonData) {
        try {
            return objectMapper.readValue(jsonData, UserAbilityRecord.class);
        } catch (IOException e) {
            // 예외 처리: 로그 기록 또는 사용자 정의 예외 발생 등
            e.printStackTrace();
            return null;
        }
    }

    private List<UserAbilityRecord> convertJsonDataListToUserAbilityRecordList(List<Object> jsonDataList) {
        List<UserAbilityRecord> resultList = new ArrayList<>();
        for (Object jsonData : jsonDataList) {
            if (jsonData != null) {
                UserAbilityRecord userAbilityRecord = convertJsonDataToUserAbilityRecord((String) jsonData);
                resultList.add(userAbilityRecord);
            }
        }
        return resultList;
    }
}
