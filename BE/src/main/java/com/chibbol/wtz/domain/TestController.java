package com.chibbol.wtz.domain;

import com.chibbol.wtz.domain.job.entity.RoomUserJob;
import com.chibbol.wtz.domain.job.entity.UserAbilityRecord;
import com.chibbol.wtz.domain.job.repository.RoomUserJobRedisRepository;
import com.chibbol.wtz.domain.job.repository.UserAbilityRecordRedisRepository;
import com.chibbol.wtz.domain.vote.dto.VoteDTO;
import com.chibbol.wtz.domain.vote.entity.Vote;
import com.chibbol.wtz.domain.vote.repository.VoteRedisRepository;
import com.chibbol.wtz.domain.vote.service.VoteService;
import com.chibbol.wtz.global.stomp.dto.DataDTO;
import com.chibbol.wtz.global.stomp.service.RedisPublisherAll;
import com.chibbol.wtz.global.stomp.service.StompService;
import com.chibbol.wtz.global.timer.dto.TimerDTO;
import com.chibbol.wtz.global.timer.entity.Timer;
import com.chibbol.wtz.global.timer.repository.TimerRedisRepository;
import com.chibbol.wtz.global.timer.service.NewTimerService;
import com.chibbol.wtz.global.timer.service.StompTimerService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/test")
public class TestController {

    private final VoteRedisRepository voteRedisRepository;
    private final RoomUserJobRedisRepository roomUserJobRedisRepository;
    private final UserAbilityRecordRedisRepository userAbilityRecordRedisRepository;
    private final NewTimerService newTimerService;
    private final TimerRedisRepository timerRedisRepository;
    private final StompTimerService stompTimerService;
    private final VoteService voteService;
    private final StompService stompService;

    private final RedisPublisherAll publisher;

    @Operation(summary = "더미 데이터 추가")
    @PostMapping("/dummyData")
    public ResponseEntity<Void> test(@RequestParam String gameCode) {
        for(Long i = 1L; i <= 8L; i++) {
            roomUserJobRedisRepository.save(RoomUserJob.builder().userSeq(i).gameCode(gameCode).build());
        }

        for (int turn = 1; turn <= 10; turn++) {
            for (Long i = 1L; i <= 8L; i++) {
                int target = ((int)(Math.random() * 8)) + 1;
                Long targetL = (long) target;
                voteRedisRepository.save(Vote.builder().gameCode(gameCode).turn(turn).userSeq(i).targetUserSeq(targetL).build());
            }
        }

        for (int turn = 1; turn <= 10; turn++) {
            for (Long i = 1L; i <= 8L; i++) {
                int target = ((int)(Math.random() * 8)) + 1;
                Long targetL = (long) target;
                userAbilityRecordRedisRepository.save(UserAbilityRecord.builder().gameCode(gameCode).turn(turn).userSeq(i).targetUserSeq(targetL).build());
            }
        }

        return ResponseEntity.ok().build();
    }

    @Operation(summary = "타이머 초기화, 시작")
    @PostMapping("/resetTimer")
    public ResponseEntity<Void> test2(@RequestParam String gameCode) {
        timerRedisRepository.deleteGameTimer(gameCode);
        Timer timer = newTimerService.createRoomTimer(gameCode);
        newTimerService.timerTypeChange(gameCode, timer);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "현재 타이머 전송")
    @PostMapping("/nowTimer")
    public ResponseEntity<Void> test3(@RequestParam String gameCode) {
        Timer timer = timerRedisRepository.getGameTimerInfo(gameCode);
        if(timer != null) {
            stompTimerService.sendToClient("TIMER", gameCode, TimerDTO.builder().type(timer.getTimerType()).time(timer.getRemainingTime()).build());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "다음 타이머로 변경")
    @PostMapping("/nextTimer")
    public ResponseEntity<Void> test4(@RequestParam String gameCode) {
        Timer timer = timerRedisRepository.getGameTimerInfo(gameCode);
        if(timer != null) {
            newTimerService.timerTypeChange(gameCode, timer);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "투표중(gamecode, userSeq, targetUserSeq 만 작성하면됨)")
    @PostMapping("/voting")
    public ResponseEntity<Void> voting(@RequestBody VoteDTO voteDTO) {
        Timer timer = timerRedisRepository.getGameTimerInfo(voteDTO.getGameCode());
        if(timer == null) {
            return ResponseEntity.notFound().build();
        }
        voteDTO.setTurn(timer.getTurn());
        voteService.vote(voteDTO);

        // 투표 현황 리스트로 만들어서 전달
        stompService.addTopic(voteDTO.getGameCode());
        publisher.publish(stompService.getTopic(voteDTO.getGameCode()),
                DataDTO.builder()
                        .type("VOTE")
                        .gameCode(voteDTO.getGameCode())
                        .data(voteService.getRealTimeVoteResult(voteDTO.getGameCode(), timer.getTurn()))
                        .build());

        return ResponseEntity.ok().build();
    }

    @Operation(summary = "타이머 감소")
    @PostMapping("/decreaseTimer")
    public ResponseEntity<Void> decreaseTimer(@RequestParam String gameCode, @RequestParam Long userSeq) {
        Timer timer = timerRedisRepository.getGameTimerInfo(gameCode);
        if(timer != null) {
            newTimerService.timerDecreaseUser(gameCode, userSeq);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
