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

    public List<Long> findExcludeJobSeqByRoomCode(String roomCode) {
        String key = generateKey(roomCode);
        Set<Long> excludeJobSeqSet = redisTemplate.opsForSet().members(key);
        return excludeJobSeqSet != null ? new ArrayList<>(excludeJobSeqSet) : Collections.emptyList();
    }

    public void addExcludeJobSeq(String roomCode, Long excludeJobSeq) {
        String key = generateKey(roomCode);
        redisTemplate.opsForSet().add(key, excludeJobSeq);
    }

    public void removeExcludeJobSeq(String roomCode, Long excludeJobSeq) {
        String key = generateKey(roomCode);
        redisTemplate.opsForSet().remove(key, excludeJobSeq);
    }

    private String generateKey(String roomCode) {
        return KEY_PREFIX + ":room:" + roomCode;
    }

    public boolean findByRoomCodeAndJobSeq(String roomCode, Long jobSeq) {
        String key = generateKey(roomCode);
        return redisTemplate.opsForSet().isMember(key, jobSeq);
    }
}
