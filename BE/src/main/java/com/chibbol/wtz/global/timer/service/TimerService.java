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
        if(timer != null) {
            timer.setTimerTime(60);
            timer.setTimerType("DAY");
            timer.setTurn(1);
            timerRedisRepository.updateTimer(roomSeq, timer);
        }
    }

    public int getRemainingTime(Long roomSeq) {
        return timerRedisRepository.getRemainingTime(roomSeq);
    }

    public boolean decreaseRoomTimer(Long roomSeq, int decreaseTime) {
        if (!timerRedisRepository.decreaseRoomTimer(roomSeq, decreaseTime)) {
            Timer timer = timerRedisRepository.getRoomTimerInfo(roomSeq);

            if (timer.getTimerTime() < 5) {
                String type = timer.getTimerType();

                if(type.equals("NONE")) {
                    return false;
                } else if (type.equals("DAY")) {
                    timer.setTimerType("VOTE");
                    timer.setTimerTime(15);
                } else if (type.equals("VOTE")) {
                    timer.setTimerType("NIGHT");
                    timer.setTimerTime(15);
                } else if (type.equals("NIGHT")) {
                    timer.setTimerType("DAY");
                    timer.setTimerTime(60);
                }

                timerRedisRepository.updateTimer(roomSeq, timer);

                log.info("====================================");
                log.info("TIMER TYPE CHANGE");
                log.info("roomSeq: " + roomSeq);
                log.info("turn: " + timer.getTurn());
                log.info("timerType: " + timer.getTimerType());
                log.info("remainingTime: " + timerRedisRepository.getRemainingTime(roomSeq));
                log.info("====================================");

                return false;
            }

            log.info("====================================");
            log.info("TIMER DECREASE");
            log.info("roomSeq: " + roomSeq);
            log.info("turn: " + timer.getTurn());
            log.info("timerType: " + timer.getTimerType());
            log.info("remainingTime: " + timerRedisRepository.getRemainingTime(roomSeq));
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
