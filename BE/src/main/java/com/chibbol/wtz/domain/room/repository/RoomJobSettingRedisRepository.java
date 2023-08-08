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
// todo : false, true값 모두 저장

    public RoomJobSettingRedisRepository(RedisTemplate<String, Long> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public List<Long> findExcludeJobSeqByRoomSeq(Long roomSeq) {
        String key = generateKey(roomSeq);
        Set<?> excludeJobSeqSet = redisTemplate.opsForSet().members(key);
        List<Long> list = new ArrayList<>();
        for(Object l : excludeJobSeqSet) {
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

    public boolean findByGameCodeAndJobSeq(String gameCode, Long jobSeq) {
        String key = generateKey(gameCode);
        return redisTemplate.opsForSet().isMember(key, jobSeq);
    }
}
