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
    private final String KEY_PREFIX = "RoomUserJob";

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
        System.out.println(roomUserJobs.toString());
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

    public List<RoomUserJob> findAllByRoomSeq(Long roomSeq) {
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
        RoomUserJob roomUserJob = findByRoomSeqAndUserSeq(roomSeq, userSeq);
        return roomUserJob != null && roomUserJob.isCanVote() && roomUserJob.isAlive();
    }

    public long countByAliveUser(Long roomSeq, Long mafiaSeq, boolean isMafia) {
        List<RoomUserJob> roomUserJobList = findAllByRoomSeq(roomSeq);
        return roomUserJobList.stream()
                .filter(roomUserJob -> isMafia ? roomUserJob.getJobSeq().equals(mafiaSeq) : !roomUserJob.getJobSeq().equals(mafiaSeq))
                .filter(RoomUserJob::isAlive)
                .count();
    }

    public void updateCanVoteByRoomSeq(Long roomSeq, boolean canVote) {
        List<RoomUserJob> roomUserJobList = findAllByRoomSeq(roomSeq);
        for (RoomUserJob roomUserJob : roomUserJobList) {
            roomUserJob.setCanVote(canVote);
        }
        saveAll(roomUserJobList);
    }

    public RoomUserJob findByRoomSeqAndJobSeq(Long roomSeq, Long jobSeq) {
        List<RoomUserJob> roomUserJobList = findAllByRoomSeq(roomSeq);
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
            if (jsonData != null) {
                RoomUserJob userJob = convertJsonDataToRoomUserJob((String)jsonData);
                resultList.add(userJob);
            }
        }
        return resultList;
    }

}
