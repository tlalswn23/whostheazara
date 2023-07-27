package com.chibbol.wtz.domain.vote.repository;

import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.HashMap;
import java.util.Map;

//@Repository
public class VoteRedisRepository {
    private final RedisTemplate<Long, Map<Long, Map<Long, Long>>> redisTemplate;
    private final HashOperations<Long, Long, Map<Long, Long>> hashOperations;

    public VoteRedisRepository(RedisTemplate<Long, Map<Long, Map<Long, Long>>> redisTemplate) {
        this.redisTemplate = redisTemplate;
        this.hashOperations = redisTemplate.opsForHash();
    }

    public Map<Long, Long> findAllByRoomSeqAndTurn(Long roomSeq, Long turn) {
        System.out.println("FIND : roomSeq=" + roomSeq + ", turn=" + turn);
        return hashOperations.get(roomSeq, turn);
    }

    public void save(Long roomSeq, Long turn, Long userSeq, Long targetUserSeq) {
        System.out.println("SAVE : roomSeq=" + roomSeq + ", turn=" + turn + ", userSeq=" + userSeq + ", targetUserSeq=" + targetUserSeq);

        Map<Long, Long> turnMap = hashOperations.get(roomSeq, turn);
        if (turnMap == null) {
            turnMap = new HashMap<>();
        }

//        Map<Long, Long> userMap = turnMap.getOrDefault(userSeq, targetUserSeq);
//        userMap.put(userSeq, targetUserSeq);
//        turnMap.put(userSeq, userMap);

        hashOperations.put(roomSeq, turn, turnMap);
    }
}
