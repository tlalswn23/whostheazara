//package com.chibbol.wtz.global.timer.service;
//
//import com.chibbol.wtz.domain.job.service.JobService;
//import com.chibbol.wtz.domain.vote.service.VoteService;
//import com.chibbol.wtz.global.timer.entity.Timer;
//import com.chibbol.wtz.global.timer.repository.TimerRedisRepository;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Slf4j
//@Service
//@RequiredArgsConstructor
//public class TimerService {
//    private final TimerRedisRepository timerRedisRepository;
//
//    private final JobService jobService;
//    private final VoteService voteService;
//
//    public void createRoomTimer(Long roomSeq) {
//        timerRedisRepository.createRoomTimer(roomSeq);
//    }
//
//    public void startRoomTimer(Long roomSeq) {
//        Timer timer = timerRedisRepository.getRoomTimerInfo(roomSeq);
//        if(timer != null) {
//            timer.setRemainingTime(60);
//            timer.setTimerType("DAY");
//            timer.setTurn(1);
//            timerRedisRepository.updateTimer(roomSeq, timer);
//        }
//    }
//
//    public boolean decreaseRoomTimer(Long roomSeq, int decreaseTime) {
//        if (!timerRedisRepository.decreaseRoomTimer(roomSeq, decreaseTime)) {
//            Timer timer = timerRedisRepository.getRoomTimerInfo(roomSeq);
//
//            if (timer.getRemainingTime() < 5) {
//                String type = timer.getTimerType();
//
//                if(type.equals("NONE")) {
//                    return false;
//                } else if (type.equals("DAY")) {
//                    timer.setTimerType("VOTE");
//                    timer.setRemainingTime(15);
//                } else if (type.equals("VOTE")) {
//                    voteService.voteResult(roomSeq, (long)timer.getTurn());
//                    timer.setTimerType("NIGHT");
//                    timer.setRemainingTime(15);
//                } else if (type.equals("NIGHT")) {
//                    jobService.useAbilityNight(roomSeq, (long)timer.getTurn());
//                    timer.setTimerType("DAY");
//                    timer.setRemainingTime(60);
//                    timer.setTurn(timer.getTurn() + 1);
//                }
//
//                if(!jobService.checkGameOver(roomSeq)) {
//                    timerRedisRepository.updateTimer(roomSeq, timer);
//                } else {
//                    timerRedisRepository.deleteRoomTimer(roomSeq);
//                }
//
//                return false;
//            }
//
//            log.info("====================================");
//            log.info("TIMER DECREASE");
//            log.info("roomSeq: " + roomSeq);
//            log.info("turn: " + timer.getTurn());
//            log.info("timerType: " + timer.getTimerType());
//            log.info("remainingTime: " + timer.getRemainingTime());
//            log.info("====================================");
//
//        }
//        return true;
//    }
//
//    public List<Long> getRoomSeqList() {
//        return timerRedisRepository.getAllRoomSeq();
//    }
//
//    public void checkRoomTimerType(Long roomSeq) {
//        Timer timer = timerRedisRepository.getRoomTimerInfo(roomSeq);
//
//
//    }
//
//    public void deleteRoomTimer(Long roomSeq) {
//        timerRedisRepository.deleteRoomTimer(roomSeq);
//    }
//}
