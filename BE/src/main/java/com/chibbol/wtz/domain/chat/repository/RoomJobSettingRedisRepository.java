package com.chibbol.wtz.domain.chat.repository;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@Repository
public class RoomJobSettingRedisRepository {

    private static final String KEY_PREFIX = "roomExcludeJobSetting";
    private final RedisTemplate<String, Long> redisTemplate;

    public RoomJobSettingRedisRepository(RedisTemplate<String, Long> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public List<Long> findExcludeJobSeqByGameCode(String gameCode) {
        String key = generateKey(gameCode);
        Set<Long> excludeJobSeqSet = redisTemplate.opsForSet().members(key);
        return excludeJobSeqSet != null ? new ArrayList<>(excludeJobSeqSet) : Collections.emptyList();
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

    public boolean findByGameCodeAndJobSeq(String gameCode, Long jobSeq) {
        String key = generateKey(gameCode);
        return redisTemplate.opsForSet().isMember(key, jobSeq);
    }
}
