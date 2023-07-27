package com.chibbol.wtz.domain.vote.repository;

import com.chibbol.wtz.domain.vote.entity.Vote;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public class VoteRedisRepository {
    private static final String KEY_PREFIX = "Vote";

    private final RedisTemplate<String, Object> redisTemplate;
    private final HashOperations<String, Long, Long> hashOperations;

    public VoteRedisRepository(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
        this.hashOperations = redisTemplate.opsForHash();
    }

    public void save(Vote vote) {
        Long roomSeq = vote.getRoomSeq();
        Long turn = vote.getTurn();
        String key = generateKey(roomSeq, turn);

        // 한 userSeq당 하나의 targetUserSeq만 저장되도록 합니다.
        hashOperations.put(key, vote.getUserSeq(), vote.getTargetUserSeq());
    }

    public Map<Long, Long> findAllByRoomSeqAndTurn(Long roomSeq, Long turn) {
        String key = generateKey(roomSeq, turn);
        return hashOperations.entries(key);
    }


    private String generateKey(Long roomSeq, Long turn) {
        return KEY_PREFIX + ":room:" + roomSeq + ":turn:" + turn;
    }
}
