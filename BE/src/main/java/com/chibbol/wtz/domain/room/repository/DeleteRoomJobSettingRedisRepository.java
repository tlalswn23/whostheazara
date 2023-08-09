package com.chibbol.wtz.domain.room.repository;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
public class DeleteRoomJobSettingRedisRepository {

    private static final String KEY_PREFIX = "roomExcludeJobSetting";
    private final RedisTemplate<String, Long> redisTemplate;

    public DeleteRoomJobSettingRedisRepository(RedisTemplate<String, Long> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public List<Long> findExcludeJobSeqByGameCode(String gameCode) {
        String key = generateKey(gameCode);
        Map<Object, Object> excludeJobSettings = redisTemplate.opsForHash().entries(key);
        List<Long> list = new ArrayList<>();
        for(Object l : excludeJobSettings.keySet()) {
            list.add(Long.parseLong(l.toString()));
        }

        return list;
    }

    public void addExcludeJobSeq(String gameCode, Long excludeJobSeq) {
        String key = generateKey(gameCode);
        redisTemplate.opsForSet().add(key, excludeJobSeq);
    }

    public void removeExcludeJobSeq(String gameCode, Long excludeJobSeq) {
        String key = generateKey(gameCode);
        redisTemplate.opsForSet().remove(key, excludeJobSeq);
    }

    private String generateKey(String gameCode) {
        return KEY_PREFIX + ":game:" + gameCode;
    }
}
