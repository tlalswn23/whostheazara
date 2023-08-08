//package com.chibbol.wtz.global.timer.service;
//
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Component;
//
//import java.util.List;
//
//@Slf4j
//@Component
//@RequiredArgsConstructor
//public class TimerScheduler {
//    private final TimerService timerService;
//
////    @Scheduled(fixedDelay = 1000)
//    public void decreaseRoomTimer() {
//        List<Long> roomSeqList = timerService.getRoomSeqList();
//
//        for (Long roomSeq : roomSeqList) {
//            timerService.decreaseRoomTimer(roomSeq, 15);
//        }
//    }
//}
