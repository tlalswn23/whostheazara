package com.chibbol.wtz.global.timer.service;

import com.chibbol.wtz.domain.job.entity.RoomUserJob;
import com.chibbol.wtz.domain.job.service.JobService;
import com.chibbol.wtz.domain.vote.service.VoteService;
import com.chibbol.wtz.global.timer.dto.UserJobDataDTO;
import com.chibbol.wtz.global.timer.entity.Timer;
import com.chibbol.wtz.global.timer.exception.TimerNotExistException;
import com.chibbol.wtz.global.timer.repository.TimerRedisRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class NewTimerService {

    private final JobService jobService;
    private final VoteService voteService;
    private final StompTimerService stompTimerService;

    private final TimerRedisRepository timerRedisRepository;

    // 타이머 생성
    public Timer createRoomTimer(Long roomSeq) {
        timerRedisRepository.createRoomTimer(roomSeq);
        return timerRedisRepository.getRoomTimerInfo(roomSeq);
    }

    // 타이머 시작
    public Timer startRoomTimer(Long roomSeq) {
        Timer timer = timerRedisRepository.getRoomTimerInfo(roomSeq);
        if(timer != null) {
            timer = Timer.builder().timerType("DAY").remainingTime(60).turn(1).build();
            timerRedisRepository.updateTimer(roomSeq, timer);
        }
        return timer;
    }

    // 해당 방 타이머 정보 조회
    public Timer getTimerInfo(Long roomSeq) {
        Timer timer = timerRedisRepository.getRoomTimerInfo(roomSeq);
        if(timer == null) {
            throw new TimerNotExistException("Timer does not exist");
        }
        return timer;
    }

    // 해당 유저의 타이머 끝남을 저장
    public void timerEndUser(Long roomSeq, Long userSeq) {
        Timer timer = timerRedisRepository.getRoomTimerInfo(roomSeq);
        if(timer != null) {
            timer.getTimerEndUserSeqs().add(userSeq);
            timerRedisRepository.updateTimer(roomSeq, timer);
        }

        checkTimerEnd(roomSeq, timer);
    }

    // 방에 있는 모든 유저의 타이머 끝남을 확인
    private void checkTimerEnd(Long roomSeq, Timer timer) {
        // TODO : room에 있는 userSeqs와 timerEndUserSeqs를 비교해서 같으면 true, 다르면 false


        timerTypeChange(roomSeq, timer);
    }

    // 타이머 타입 변경
    public void timerTypeChange(Long roomSeq, Timer timer) {
        String type = timer.getTimerType();

        if(type.equals("NONE")) {
            timer = Timer.builder().timerType("DAY").remainingTime(60).turn(1).build();
            timerRedisRepository.updateTimer(roomSeq, timer);

            List<RoomUserJob> roomUserJobs = jobService.randomJobInRoomUser(roomSeq);

            // 직업 정보, 게임 시작 알림
            stompTimerService.sendToClient("START", roomSeq, roomUserJobsToDatas(roomUserJobs));
            stompTimerService.sendToClient("TIMER", roomSeq, timer.getRemainingTime());
        } else if (type.equals("DAY")) {
            timer.update(Timer.builder().timerType("VOTE").remainingTime(15).build());

            stompTimerService.sendToClient("TIMER", roomSeq, timer.getRemainingTime());
        } else if (type.equals("VOTE")) {
            Long mostVotedUser = voteService.voteResult(roomSeq, (long)timer.getTurn());
            stompTimerService.sendToClient("VOTE_RESULT", roomSeq, mostVotedUser);

            // 게임 끝났으면 GAME_OVER, 아니면 VOTE_RESULT
            if(jobService.checkGameOver(roomSeq)) {
                // TODO :  게임 결과
                stompTimerService.sendToClient("GAME_OVER", roomSeq, "투표 결과");
            } else {
                timer.update(Timer.builder().timerType("VOTE_RESULT").remainingTime(3).build());
                stompTimerService.sendToClient("TIMER", roomSeq, timer.getRemainingTime());
            }
        } else if (type.equals("VOTE_RESULT")) {
            timer.update(Timer.builder().timerType("NIGHT").remainingTime(15).build());

            stompTimerService.sendToClient("TIMER", roomSeq, timer.getRemainingTime());
        } else if (type.equals("NIGHT")) {
            Long deadUser = jobService.useAbilityNight(roomSeq, (long)timer.getTurn());
            stompTimerService.sendToClient("NIGHT_RESULT", roomSeq, deadUser);

            // 게임 끝났으면 GAME_OVER, 아니면 NIGHT_RESULT
            if(jobService.checkGameOver(roomSeq)) {
                timer.update(Timer.builder().timerType("GAME_OVER").remainingTime(0).build());
            } else {
                timer.update(Timer.builder().timerType("NIGHT_RESULT").remainingTime(3).build());
                stompTimerService.sendToClient("TIMER", roomSeq, timer.getRemainingTime());
            }
        } else if (type.equals("NIGHT_RESULT")) {
            timer.update(Timer.builder().timerType("DAY").remainingTime(60).turn(timer.getTurn() + 1).build());
        }

        timerRedisRepository.updateTimer(roomSeq, timer);

    }

    private List<UserJobDataDTO> roomUserJobsToDatas(List<RoomUserJob> roomUserJobs) {
        return roomUserJobs.stream()
                .map(roomUserJob -> UserJobDataDTO.builder()
                        .userSeq(roomUserJob.getUserSeq())
                        .jobSeq(roomUserJob.getJobSeq())
                        .build())
                .collect(Collectors.toList());
    }

}
