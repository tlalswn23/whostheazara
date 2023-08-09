//package com.chibbol.wtz.domain;
//
//import com.chibbol.wtz.domain.job.entity.RoomUserJob;
//import com.chibbol.wtz.domain.job.entity.UserAbilityRecord;
//import com.chibbol.wtz.domain.job.repository.RoomUserJobRedisRepository;
//import com.chibbol.wtz.domain.job.repository.UserAbilityRecordRedisRepository;
//import com.chibbol.wtz.domain.vote.entity.Vote;
//import com.chibbol.wtz.domain.vote.repository.VoteRedisRepository;
//import com.chibbol.wtz.global.timer.entity.Timer;
//import com.chibbol.wtz.global.timer.repository.TimerRedisRepository;
//import com.chibbol.wtz.global.timer.service.NewTimerService;
//import lombok.AllArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@AllArgsConstructor
//@RequestMapping("/api/v1/test")
//public class TestController {
//
//    private final VoteRedisRepository voteRedisRepository;
//    private final RoomUserJobRedisRepository roomUserJobRedisRepository;
//    private final UserAbilityRecordRedisRepository userAbilityRecordRedisRepository;
//    private final NewTimerService newTimerService;
//    private final TimerRedisRepository timerRedisRepository;
//
//    @PostMapping("/test")
//    public ResponseEntity<Void> test(@RequestBody String gameCode) {
//
//        timerRedisRepository.deleteRoomTimer(gameCode);
//
//        for(Long i = 1L; i <= 8L; i++) {
//            roomUserJobRedisRepository.save(RoomUserJob.builder().userSeq(i).gameCode(gameCode).build());
//        }
//
//        for (int turn = 1; turn <= 10; turn++) {
//            for (Long i = 1L; i <= 8L; i++) {
//                int target = ((int)(Math.random() * 8)) + 1;
//                Long targetL = (long) target;
//                voteRedisRepository.save(Vote.builder().gameCode(gameCode).turn(turn).userSeq(i).targetUserSeq(targetL).build());
//            }
//        }
//
//        for (int turn = 1; turn <= 10; turn++) {
//            for (Long i = 1L; i <= 8L; i++) {
//                int target = ((int)(Math.random() * 8)) + 1;
//                Long targetL = (long) target;
//                userAbilityRecordRedisRepository.save(UserAbilityRecord.builder().gameCode(gameCode).turn(turn).userSeq(i).targetUserSeq(targetL).build());
//            }
//        }
//
//        return ResponseEntity.ok().build();
//    }
//
//    @PostMapping("/test2")
//    public ResponseEntity<Void> test2(@RequestBody String gameCode) {
//        timerRedisRepository.deleteRoomTimer(gameCode);
//        Timer timer = newTimerService.createRoomTimer(gameCode);
//        newTimerService.timerTypeChange(gameCode, timer);
//        return ResponseEntity.ok().build();
//    }
//
//}
