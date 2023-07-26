package com.chibbol.wtz.global.redis.repository;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@Repository
public class RoomJobSettingRedisRepository {
    private final RedisTemplate<String, Long> redisTemplate;

    public RoomJobSettingRedisRepository(RedisTemplate<String, Long> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public List<Long> findExcludeJobSeqByRoomSeq(Long roomSeq) {
        System.out.println("FIND : " + roomSeq);
        Set<Long> excludeJobSeqSet = redisTemplate.opsForSet().members(String.valueOf(roomSeq));
        return excludeJobSeqSet != null ? new ArrayList<>(excludeJobSeqSet) : Collections.emptyList();
    }

    public void addExcludeJobSeq(Long roomSeq, Long excludeJobSeq) {
        System.out.println("Add : "+ roomSeq + " " + excludeJobSeq.toString());
        redisTemplate.opsForSet().add(String.valueOf(roomSeq), excludeJobSeq);
    }

    public void removeExcludeJobSeq(Long roomSeq, Long excludeJobSeq) {
    System.out.println("Remove : "+ roomSeq + " " + excludeJobSeq.toString());
        redisTemplate.opsForSet().remove(String.valueOf(roomSeq), excludeJobSeq);
    }
}
