package com.chibbol.wtz.domain.point.repository;

import com.chibbol.wtz.domain.level.entity.UserExpValue;
import com.chibbol.wtz.domain.point.entity.UserPointValue;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class UserPointValueRedisRepository {
    private static final String KEY_PREFIX = "UserPointValue:game:";

    private final RedisTemplate<String, String> redisTemplate;
    private final ObjectMapper objectMapper;

    public void save(String gameCode, Long userSeq, UserPointValue userPointValue) {
        String key = generateKey(gameCode);
        try {
            String jsonData = objectMapper.writeValueAsString(userPointValue);
            redisTemplate.opsForHash().put(key, userSeq.toString(), jsonData);
        } catch (Exception e) {
            // 예외 처리: 로그 기록 또는 사용자 정의 예외 발생 등
        }
    }

    public UserPointValue findByUserSeq(String gameCode, Long userSeq) {
        String key = generateKey(gameCode);
        String jsonData = (String) redisTemplate.opsForHash().get(key, userSeq.toString());
        if (jsonData != null) {
            try {
                return objectMapper.readValue(jsonData, UserPointValue.class);
            } catch (Exception e) {
                // 예외 처리: 로그 기록 또는 사용자 정의 예외 발생 등
            }
        }
        return null;
    }

    private String generateKey(String gameCode) {
        return KEY_PREFIX + gameCode;
    }
}
