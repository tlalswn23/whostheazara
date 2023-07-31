package com.chibbol.wtz.global.timer.service;

import com.chibbol.wtz.global.timer.entity.Timer;
import com.chibbol.wtz.global.timer.repository.TimerRedisRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class TimerService {
    private final TimerRedisRepository timerRedisRepository;

    public void createRoomTimer(Long roomSeq) {
        timerRedisRepository.createRoomTimer(roomSeq);
    }

    public void startRoomTimer(Long roomSeq) {
        Timer timer = timerRedisRepository.getRoomTimerInfo(roomSeq);
        timer.setRemainingTime(60);
        timer.setTimerType("DAY");
        timerRedisRepository.updateTimer(roomSeq, timer);
    }

    public boolean decreaseRoomTimer(Long roomSeq, int decreaseTime) {
        if (!timerRedisRepository.decreaseRoomTimer(roomSeq, decreaseTime)) {
            Timer timer = timerRedisRepository.getRoomTimerInfo(roomSeq);

            if (timer.getRemainingTime() < 5) {
                String type = timer.getTimerType();

                if (type.equals("DAY")) {
                    timer.setTimerType("VOTE");
                    timer.setRemainingTime(15);
                } else if (type.equals("VOTE")) {
                    timer.setTimerType("NIGHT");
                    timer.setRemainingTime(15);
                } else if (type.equals("NIGHT")) {
                    timer.setTimerType("DAY");
                    timer.setRemainingTime(60);
                }

                log.info("====================================");
                log.info("TIMER TYPE CHANGE");
                log.info("roomSeq: " + roomSeq);
                log.info("timerType: " + timer.getTimerType());
                log.info("remainingTime: " + timer.getRemainingTime());
                log.info("====================================");

                return false;
            }

            log.info("====================================");
            log.info("TIMER DECREASE");
            log.info("roomSeq: " + roomSeq);
            log.info("timerType: " + timer.getTimerType());
            log.info("remainingTime: " + timer.getRemainingTime());
            log.info("====================================");

        }
        return true;
    }

    public List<Long> getRoomSeqList() {
        return timerRedisRepository.getAllRoomSeq();
    }

    public void checkRoomTimerType(Long roomSeq) {
        Timer timer = timerRedisRepository.getRoomTimerInfo(roomSeq);


    }

    public void deleteRoomTimer(Long roomSeq) {
        timerRedisRepository.deleteRoomTimer(roomSeq);
    }
}
