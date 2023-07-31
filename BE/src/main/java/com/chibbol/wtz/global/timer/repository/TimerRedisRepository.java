package com.chibbol.wtz.global.timer.repository;

import com.chibbol.wtz.global.timer.entity.Timer;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.time.Duration;
import java.time.LocalDateTime;
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
    public void updateTimer(Long roomSeq, Timer timer) {
        try {
            String jsonData = objectMapper.writeValueAsString(timer);
            redisTemplate.opsForValue().set(generateKey(roomSeq), jsonData);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public int getRemainingTime(Long roomSeq) {
        Timer timer = getRoomTimerInfo(roomSeq);
        LocalDateTime startAt = timer.getStartAt();

        // 현재 시간을 가져옴
        LocalDateTime now = LocalDateTime.now();

        // 두 날짜 사이의 차이를 계산하여 Duration 객체로 반환
        Duration duration = Duration.between(startAt, now);

        // Duration 객체에서 초 단위로 남은 시간을 가져옴
        long remainingSeconds = timer.getTimerTime() - duration.getSeconds();

        log.info("====================================");
        log.info("REMAINING TIME");
        log.info("roomSeq: " + roomSeq);
        log.info("startAt: " + startAt);
        log.info("now: " + now);
        log.info("duration: " + duration);
        log.info("====================================");

        // 음수인 경우가 있을 수 있으므로, 음수인 경우 0을 반환하도록 처리
        return Math.max(0, (int) remainingSeconds);
    }

    // 타이머 정보 조회
    public Timer getRoomTimerInfo(Long roomId) {
        String key = generateKey(roomId);
        Object jsonData = redisTemplate.opsForValue().get(key);
        if (jsonData == null) {
            return null;
        }
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

        Timer timer = Timer.builder()
                .timerType("NONE")
                .timerTime(0)
                .turn(0)
                .build();
        String key = generateKey(roomSeq);

        try {
            String jsonData = objectMapper.writeValueAsString(timer);
            redisTemplate.opsForValue().set(key, jsonData);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

    // 타이머 시간 5초 감소
    public boolean decreaseRoomTimer(Long roomSeq, int decreaseTime) {
        Timer timer = getRoomTimerInfo(roomSeq);
        timer.setTimerTime(timer.getTimerTime() - decreaseTime);
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
