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

    public List<Long> findExcludeJobSeqByRoomSeq(Long roomSeq) {
        String key = generateKey(roomSeq);
        Set<Long> excludeJobSeqSet = redisTemplate.opsForSet().members(key);
        return excludeJobSeqSet != null ? new ArrayList<>(excludeJobSeqSet) : Collections.emptyList();
    }

    public void addExcludeJobSeq(Long roomSeq, Long excludeJobSeq) {
        String key = generateKey(roomSeq);
        redisTemplate.opsForSet().add(key, excludeJobSeq);
    }

    public void removeExcludeJobSeq(Long roomSeq, Long excludeJobSeq) {
        String key = generateKey(roomSeq);
        redisTemplate.opsForSet().remove(key, excludeJobSeq);
    }

    private String generateKey(Long roomSeq) {
        return KEY_PREFIX + ":room:" + roomSeq;
    }

    public boolean findByRoomRoomSeqAndJobJobSeq(Long roomSeq, Long jobSeq) {
        String key = generateKey(roomSeq);
        return redisTemplate.opsForSet().isMember(key, jobSeq);
    }
}
