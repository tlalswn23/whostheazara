package com.chibbol.wtz.domain.vote.repository;

import com.chibbol.wtz.domain.vote.entity.Vote;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class VoteRedisRepository {
    private static final String KEY_PREFIX = "Vote";

    private final RedisTemplate<String, String> redisTemplate;
    private final ObjectMapper objectMapper;

    public VoteRedisRepository(RedisTemplate<String, String> redisTemplate, ObjectMapper objectMapper) {
        this.redisTemplate = redisTemplate;
        this.objectMapper = objectMapper;
    }

    public List<Vote> findAllByRoomSeqAndTurn(Long roomSeq, Long turn) {
        String key = generateKey(roomSeq, turn);
        List<Object> jsonDataList = redisTemplate.opsForHash().values(key);
        return convertJsonDataListToVoteList(jsonDataList);
    }

    public void save(Vote vote) {
        Long roomSeq = vote.getRoomSeq();
        Long turn = vote.getTurn();
        String key = generateKey(roomSeq, turn);
        String userSeqField = vote.getUserSeq().toString();

        try {
            String jsonData = objectMapper.writeValueAsString(vote);
            redisTemplate.opsForHash().put(key, userSeqField, jsonData);
        } catch (JsonProcessingException e) {
            // 예외 처리: 로그 기록 또는 사용자 정의 예외 발생 등
            e.printStackTrace();
        }
    }

    private List<Vote> convertJsonDataListToVoteList(List<Object> jsonDataList) {
        List<Vote> resultList = new ArrayList<>();
        for (Object jsonData : jsonDataList) {
            if (jsonData instanceof String) {
                try {
                    Vote vote = objectMapper.readValue((String) jsonData, Vote.class);
                    resultList.add(vote);
                } catch (IOException e) {
                    // 예외 처리: 로그 기록 또는 사용자 정의 예외 발생 등
                    e.printStackTrace();
                }
            }
        }
        return resultList;
    }

    private String generateKey(Long roomSeq, Long turn) {
        return KEY_PREFIX + ":room:" + roomSeq + ":turn:" + turn;
    }
}
