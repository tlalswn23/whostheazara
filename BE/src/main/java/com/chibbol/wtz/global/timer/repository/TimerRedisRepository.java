package com.chibbol.wtz.global.timer.repository;

import com.chibbol.wtz.global.timer.entity.Timer;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Slf4j
@Repository
@RequiredArgsConstructor
public class TimerRedisRepository {
    private static final String KEY_PREFIX = "roomTimer:";
    private final RedisTemplate<String, String> redisTemplate;
    private final ObjectMapper objectMapper;

    // 타이머 정보 업데이트
    public void updateTimer(String gameCode, Timer timer) {
        try {
            String jsonData = objectMapper.writeValueAsString(timer);
            redisTemplate.opsForValue().set(generateKey(gameCode), jsonData);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }


    // 타이머 정보 조회
    public Timer getRoomTimerInfo(String gameCode) {
        String key = generateKey(gameCode);
        Object jsonData = redisTemplate.opsForValue().get(key);
        if (jsonData == null) {
            return null;
        }
        return convertJsonDataToTimer(jsonData);
    }

    public List<String> getAllGameCode() {
        List<String> gameCodeList = new ArrayList<>();

        // Redis에서 방 정보의 키 값을 조회하여 KEY_PREFIX로 시작하는 모든 키를 가져옴
        List<String> roomKeys = new ArrayList<>(Objects.requireNonNull(redisTemplate.keys(KEY_PREFIX + "room:*")));

        for (String roomKey : roomKeys) {
            String[] splitKey = roomKey.split(":");
            if (splitKey.length >= 2) {
                String roomSeqStr = splitKey[2];
                try {
                    String roomSeq = roomSeqStr;
                    gameCodeList.add(roomSeq);
                } catch (NumberFormatException e) {
                    // roomSeq가 숫자로 변환되지 않을 경우 무시
                }
            }
        }

        return gameCodeList;
    }

    // 초기 상태로 타이머 생성
    public void createRoomTimer(String gameCode) {
        if(getRoomTimerInfo(gameCode) != null) {
            return;
        }

        Timer timer = Timer.builder()
                .timerType("NONE")
                .remainingTime(0)
                .turn(0)
                .build();
        String key = generateKey(gameCode);

        try {
            String jsonData = objectMapper.writeValueAsString(timer);
            redisTemplate.opsForValue().set(key, jsonData);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

    // 타이머 시간 5초 감소
    public boolean decreaseRoomTimer(String gameCode, int decreaseTime) {
        Timer timer = getRoomTimerInfo(gameCode);
        timer.setRemainingTime(timer.getRemainingTime() - decreaseTime);
        updateTimer(gameCode, timer);

        return false;
    }

    // 타이머 삭제
    public void deleteRoomTimer(String gameCode) {
        redisTemplate.delete(generateKey(gameCode));
    }

    public String generateKey(String gameCode) {
        return KEY_PREFIX + "room:" + gameCode;
    }

    private Timer convertJsonDataToTimer(Object jsonData) {
        if(jsonData instanceof String) {
            try {
                Timer timer = objectMapper.readValue((String) jsonData, Timer.class);
                return objectMapper.readValue((String) jsonData, Timer.class);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    private List<Timer> convertJsonDataToTimerList(List<Object> jsonDatas) {
        List<Timer> timerList = new ArrayList<>();
        for (Object jsonData : jsonDatas) {
            Timer timer = convertJsonDataToTimer(jsonData);
            if(timer != null) {
                timerList.add(timer);
            }
        }
        return timerList;
    }
}
