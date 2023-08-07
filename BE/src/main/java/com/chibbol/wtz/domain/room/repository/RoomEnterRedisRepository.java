package com.chibbol.wtz.domain.room.repository;


import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@AllArgsConstructor
public class RoomEnterRedisRepository {
    private RedisTemplate<String, String> redisTemplate;
    private final ObjectMapper objectMapper;

    private static String KEY_PREFIX = "EnterInfo:";

    public void setUserEnterInfo(Long userSeq, Integer order, String roomCode) {
        String key = generateKey(roomCode);
        redisTemplate.opsForHash().put(key, order, roomCode);
    }

    public int getUsingSeats(String roomCode) {
        String key = generateKey(roomCode);
        List<Object> list =  redisTemplate.opsForHash().get(key, "*");
    }



    public String generateKey(String roomCode) {
        return KEY_PREFIX + "room:" + roomCode;
    }
}
