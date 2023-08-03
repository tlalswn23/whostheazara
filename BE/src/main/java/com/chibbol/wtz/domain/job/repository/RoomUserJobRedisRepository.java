package com.chibbol.wtz.domain.job.repository;

import com.chibbol.wtz.domain.job.entity.RoomUserJob;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
@AllArgsConstructor
public class RoomUserJobRedisRepository {
    private final String KEY_PREFIX = "userJob";

    private final RedisTemplate<String, String> redisTemplate;
    private final ObjectMapper objectMapper;

    public void save(RoomUserJob roomUserJob) {
        String key = generateKey(roomUserJob.getRoomSeq());
        String userSeqField = roomUserJob.getUserSeq().toString();

        try {
            String jsonData = objectMapper.writeValueAsString(roomUserJob);
            redisTemplate.opsForHash().put(key, userSeqField, jsonData);
        } catch (JsonProcessingException e) {
            // 예외 처리: 로그 기록 또는 사용자 정의 예외 발생 등
            e.printStackTrace();
        }
    }

    public void saveAll(List<RoomUserJob> roomUserJobs) {
        for (RoomUserJob roomUserJob : roomUserJobs) {
            String key = generateKey(roomUserJob.getRoomSeq());
            String userSeqField = roomUserJob.getUserSeq().toString();
            try {
                String jsonData = objectMapper.writeValueAsString(roomUserJob);
                redisTemplate.opsForHash().put(key, userSeqField, jsonData);
            } catch (JsonProcessingException e) {
                // 예외 처리: 로그 기록 또는 사용자 정의 예외 발생 등
                e.printStackTrace();
            }
        }
    }

    public void deleteByRoomSeq(Long roomSeq) {
        String key = generateKey(roomSeq);
        redisTemplate.delete(key);
    }

    public List<RoomUserJob> findAllByRoomRoomSeq(Long roomSeq) {
        String key = generateKey(roomSeq);
        List<Object> jsonDataList = redisTemplate.opsForHash().values(key);
        return convertJsonDataListToRoomUserJobList(jsonDataList);
    }

    public RoomUserJob findByRoomSeqAndUserSeq(Long roomSeq, Long userSeq) {
        String key = generateKey(roomSeq);
        String userSeqField = userSeq.toString();
        String jsonData = (String) redisTemplate.opsForHash().get(key, userSeqField);
        return convertJsonDataToRoomUserJob(jsonData);
    }

    public boolean canVote(Long roomSeq, Long userSeq) {
        String key = generateKey(roomSeq);
        String userSeqField = userSeq.toString();
        String jsonData = (String) redisTemplate.opsForHash().get(key, userSeqField);
        RoomUserJob userJob = convertJsonDataToRoomUserJob(jsonData);
        return userJob.isCanVote() && userJob.isAlive();
    }

    public void updateCanVote(Long roomSeq, Long userSeq, boolean canVote) {
        String key = generateKey(roomSeq);
        String userSeqField = userSeq.toString();
        String jsonData = (String) redisTemplate.opsForHash().get(key, userSeqField);
        RoomUserJob userJob = convertJsonDataToRoomUserJob(jsonData);
        userJob.update(RoomUserJob.builder().canVote(canVote).build());
    }

    public int countByAliveUser(Long roomSeq, Long mafiaSeq, boolean isMafia) {
        String key = generateKey(roomSeq);
        List<Object> jsonDataList = redisTemplate.opsForHash().values(key);
        List<RoomUserJob> userJobList = convertJsonDataListToRoomUserJobList(jsonDataList);
        int count = 0;
        for (RoomUserJob userJob : userJobList) {
            // 마피아일 경우
            if (isMafia && userJob.getJobSeq().equals(mafiaSeq) && userJob.isAlive()) {
                count++;
            // 마피아가 아닐 경우
            } else if (!isMafia && !userJob.getJobSeq().equals(mafiaSeq) && userJob.isAlive()) {
                count++;
            }
        }
        return count;
    }

    public void updateCanVoteByRoomSeq(Long roomSeq, boolean canVote) {
        String key = generateKey(roomSeq);
        List<Object> jsonDataList = redisTemplate.opsForHash().values(key);
        List<RoomUserJob> roomUserJobList = convertJsonDataListToRoomUserJobList(jsonDataList);
        for (RoomUserJob roomUserJob : roomUserJobList) {
            roomUserJob.update(RoomUserJob.builder().canVote(canVote).build());
        }
        saveAll(roomUserJobList);
    }

    public RoomUserJob findByRoomSeqAndJobSeq(Long roomSeq, Long jobSeq) {
        String key = generateKey(roomSeq);
        List<Object> jsonDataList = redisTemplate.opsForHash().values(key);
        List<RoomUserJob> roomUserJobList = convertJsonDataListToRoomUserJobList(jsonDataList);

        Optional<RoomUserJob> foundJob = roomUserJobList.stream()
                .filter(roomUserJob -> roomUserJob.getJobSeq().equals(jobSeq))
                .findFirst();

        return foundJob.orElse(null);
    }

    private String generateKey(Long roomSeq) {
        return KEY_PREFIX + ":room:" + roomSeq;
    }

    private RoomUserJob convertJsonDataToRoomUserJob(String jsonData) {
        try {
            return objectMapper.readValue(jsonData, RoomUserJob.class);
        } catch (IOException e) {
            // 예외 처리: 로그 기록 또는 사용자 정의 예외 발생 등
            e.printStackTrace();
            return null;
        }
    }

    private List<RoomUserJob> convertJsonDataListToRoomUserJobList(List<Object> jsonDataList) {
        List<RoomUserJob> resultList = new ArrayList<>();
        for (Object jsonData : jsonDataList) {
            if (jsonData instanceof String) {
                try {
                    RoomUserJob userJob = objectMapper.readValue((String) jsonData, RoomUserJob.class);
                    resultList.add(userJob);
                } catch (IOException e) {
                    // 예외 처리: 로그 기록 또는 사용자 정의 예외 발생 등
                    e.printStackTrace();
                }
            }
        }
        return resultList;
    }

}
