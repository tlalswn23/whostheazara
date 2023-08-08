package com.chibbol.wtz.global.timer.service;

import com.chibbol.wtz.domain.job.entity.RoomUserJob;
import com.chibbol.wtz.domain.job.entity.UserAbilityLog;
import com.chibbol.wtz.domain.job.service.JobService;
import com.chibbol.wtz.domain.vote.service.VoteService;
import com.chibbol.wtz.global.timer.dto.GameResultDataDTO;
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
    public Timer createRoomTimer(String roomCode) {
        timerRedisRepository.createRoomTimer(roomCode);
        return timerRedisRepository.getRoomTimerInfo(roomCode);
    }

    // 타이머 시작
    public Timer startRoomTimer(String roomCode) {
        Timer timer = timerRedisRepository.getRoomTimerInfo(roomCode);
        if(timer != null) {
            timer = Timer.builder().timerType("DAY").remainingTime(60).turn(1).build();
            timerRedisRepository.updateTimer(roomCode, timer);
        }
        return timer;
    }

    // 해당 방 타이머 정보 조회
    public Timer getTimerInfo(String roomCode) {
        Timer timer = timerRedisRepository.getRoomTimerInfo(roomCode);
        if(timer == null) {
            throw new TimerNotExistException("Timer does not exist");
        }
        return timer;
    }

    // 해당 유저의 타이머 끝남을 저장
    public void timerEndUser(String roomCode, Long userSeq) {
        Timer timer = timerRedisRepository.getRoomTimerInfo(roomCode);
        if(timer != null) {
            timer.getTimerEndUserSeqs().add(userSeq);
            timerRedisRepository.updateTimer(roomCode, timer);
        }

        checkTimerEnd(roomCode, timer);
    }

    // 방에 있는 모든 유저의 타이머 끝남을 확인
    private void checkTimerEnd(String roomCode, Timer timer) {
        // TODO : room에 있는 userSeqs와 timerEndUserSeqs를 비교해서 같으면 true, 다르면 false


        timerTypeChange(roomCode, timer);
    }

    // 타이머 타입 변경
    public void timerTypeChange(String roomCode, Timer timer) {
        String type = timer.getTimerType();

        if(type.equals("NONE")) {
            timer = Timer.builder().timerType("DAY").remainingTime(60).turn(1).build();
            timerRedisRepository.updateTimer(roomCode, timer);

            List<RoomUserJob> roomUserJobs = jobService.randomJobInRoomUser(roomCode);

            // 직업 정보, 게임 시작 알림
            stompTimerService.sendToClient("START", roomCode, roomUserJobsToData(roomUserJobs));
            stompTimerService.sendToClient("TIMER", roomCode, timer.getRemainingTime());
        } else if (type.equals("DAY")) {
            timer.update(Timer.builder().timerType("VOTE").remainingTime(15).build());

            stompTimerService.sendToClient("TIMER", roomCode, timer.getRemainingTime());
        } else if (type.equals("VOTE")) {
            Long mostVotedUser = voteService.voteResult(roomCode, timer.getTurn());
            stompTimerService.sendToClient("VOTE_RESULT", roomCode, mostVotedUser);

            // 게임 끝났으면 GAME_OVER, 아니면 VOTE_RESULT
            List<UserAbilityLog> userAbilityLogs = jobService.checkGameOver(roomCode);
            if(userAbilityLogs != null) {
                stompTimerService.sendToClient("GAME_OVER", roomCode, userAbilityLogsToData(userAbilityLogs));

                timerRedisRepository.deleteRoomTimer(roomCode);
            } else {
                timer.update(Timer.builder().timerType("VOTE_RESULT").remainingTime(3).build());
                stompTimerService.sendToClient("TIMER", roomCode, timer.getRemainingTime());
            }
        } else if (type.equals("VOTE_RESULT")) {
            timer.update(Timer.builder().timerType("NIGHT").remainingTime(15).build());
        } else if (type.equals("NIGHT")) {
            Long deadUser = jobService.useAbilityNight(roomCode, timer.getTurn());
            stompTimerService.sendToClient("NIGHT_RESULT", roomCode, deadUser);

            // 게임 끝났으면 GAME_OVER, 아니면 NIGHT_RESULT
            List<UserAbilityLog> userAbilityLogs = jobService.checkGameOver(roomCode);
            if(userAbilityLogs != null) {
                stompTimerService.sendToClient("GAME_OVER", roomCode, userAbilityLogsToData(userAbilityLogs));

                timerRedisRepository.deleteRoomTimer(roomCode);
            } else {
                timer.update(Timer.builder().timerType("NIGHT_RESULT").remainingTime(3).build());
            }
        } else if (type.equals("NIGHT_RESULT")) {
            timer.update(Timer.builder().timerType("DAY").remainingTime(60).turn(timer.getTurn() + 1).build());
            stompTimerService.sendToClient("TIMER", roomCode, timer.getRemainingTime());
        }

        timerRedisRepository.updateTimer(roomCode, timer);

    }

    private List<UserJobDataDTO> roomUserJobsToData(List<RoomUserJob> roomUserJobs) {
        return roomUserJobs.stream()
                .map(roomUserJob -> UserJobDataDTO.builder()
                        .userSeq(roomUserJob.getUserSeq())
                        .jobSeq(roomUserJob.getJobSeq())
                        .build())
                .collect(Collectors.toList());
    }

    private GameResultDataDTO userAbilityLogsToData(List<UserAbilityLog> userAbilityLogs) {
        // TODO : rabbitWin 수정 필요
        if(userAbilityLogs.size() > 0) {
            return GameResultDataDTO.builder()
                    .roomSeq(userAbilityLogs.get(0).getRoom().getRoomSeq())
                    .rabbitWin(true)
                    .userInfo(userAbilityLogs.stream()
                            .map(userAbilityLog -> GameResultDataDTO.GameResult.builder()
                                    .userSeq(userAbilityLog.getUser().getUserSeq())
                                    .jobSeq(userAbilityLog.getJob().getJobSeq())
                                    .win(userAbilityLog.isResult())
                                    .build())
                            .collect(Collectors.toList()))
                    .build();
        } else {
            return null;
        }
    }
}
