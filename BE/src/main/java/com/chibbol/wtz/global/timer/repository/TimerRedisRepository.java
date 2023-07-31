package com.chibbol.wtz.global.timer.repository;

import com.chibbol.wtz.global.timer.entity.Timer;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Repository
@RequiredArgsConstructor
public class TimerRedisRepository {
    private static final String KEY_PREFIX = "roomTimer:";
    private final RedisTemplate<String, Timer> redisTemplate;
    private final ObjectMapper objectMapper;

    // 타이머 정보 업데이트
    public void updateTimer(Long roomSeq, Timer timer) {
        redisTemplate.opsForValue().set(generateKey(roomSeq), timer);
    }

    // 타이머 정보 조회
    public Timer getRoomTimerInfo(Long roomId) {
        String key = generateKey(roomId);
        Object jsonData = redisTemplate.opsForValue().get(key);
        return convertJsonDataToTimer(jsonData);
    }

    public List<Long> getAllRoomSeq() {
        List<Long> roomSeqList = new ArrayList<>();

        // Redis에서 방 정보의 키 값을 조회하여 KEY_PREFIX로 시작하는 모든 키를 가져옴
        List<String> roomKeys = new ArrayList<>(Objects.requireNonNull(redisTemplate.keys(KEY_PREFIX + "room:*")));

        for (String roomKey : roomKeys) {
            String[] splitKey = roomKey.split(":");
            if (splitKey.length >= 2) {
                String roomSeqStr = splitKey[2];
                try {
                    long roomSeq = Long.parseLong(roomSeqStr);
                    roomSeqList.add(roomSeq);
                } catch (NumberFormatException e) {
                    // roomSeq가 숫자로 변환되지 않을 경우 무시
                }
            }
        }

        return roomSeqList;
    }

    // 초기 상태로 타이머 생성
    public void createRoomTimer(Long roomSeq) {
        if(getRoomTimerInfo(roomSeq) != null) {
            return;
        }

        Timer timer = new Timer();
        timer.setRemainingTime(0);
        timer.setTurn(0);
        timer.setTimerType("none");
        String key = generateKey(roomSeq);
        redisTemplate.opsForValue().set(generateKey(roomSeq), timer);

        try {
            String jsonData = objectMapper.writeValueAsString(timer);
            redisTemplate.opsForHash().put(key, roomSeq.toString(), jsonData);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

    // 타이머 시간 5초 감소
    public boolean decreaseRoomTimer(Long roomSeq, int decreaseTime) {
        Timer timer = getRoomTimerInfo(roomSeq);
        timer.setRemainingTime(timer.getRemainingTime() - decreaseTime);
        updateTimer(roomSeq, timer);

        return false;
    }

    // 타이머 삭제
    public void deleteRoomTimer(Long roomSeq) {
        redisTemplate.delete(generateKey(roomSeq));
    }

    public String generateKey(Long roomSeq) {
        return KEY_PREFIX + "room:" + roomSeq;
    }

    private Timer convertJsonDataToTimer(Object jsonData) {
        if(jsonData instanceof String) {
            try {
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
