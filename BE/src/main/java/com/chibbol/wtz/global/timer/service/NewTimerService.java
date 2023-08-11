package com.chibbol.wtz.global.timer.service;

import com.chibbol.wtz.domain.job.entity.RoomUserJob;
import com.chibbol.wtz.domain.job.entity.UserAbilityLog;
import com.chibbol.wtz.domain.job.entity.UserAbilityRecord;
import com.chibbol.wtz.domain.job.repository.RoomUserJobRedisRepository;
import com.chibbol.wtz.domain.job.repository.UserAbilityRecordRedisRepository;
import com.chibbol.wtz.domain.job.service.JobService;
import com.chibbol.wtz.domain.user.repository.UserRepository;
import com.chibbol.wtz.domain.vote.service.VoteService;
import com.chibbol.wtz.global.timer.dto.GameResultDataDTO;
import com.chibbol.wtz.global.timer.dto.NightResultDataDTO;
import com.chibbol.wtz.global.timer.dto.TimerDTO;
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

    // TODO : 시간 수정 필요(현재 테스트용)
    private int DAY_TIME = 10000;
    private int VOTE_TIME = 10001;
    private int VOTE_RESULT_TIME = 10002;
    private int NIGHT_TIME = 10003;
    private int NIGHT_RESULT_TIME = 10004;

    private final JobService jobService;
    private final VoteService voteService;
    private final StompTimerService stompTimerService;

    private final UserRepository userRepository;
    private final TimerRedisRepository timerRedisRepository;
    private final RoomUserJobRedisRepository roomUserJobRedisRepository;
    private final UserAbilityRecordRedisRepository userAbilityRecordRedisRepository;

    // 타이머 생성
    public Timer createRoomTimer(String gameCode) {
        timerRedisRepository.createGameTimer(gameCode);
        return timerRedisRepository.getGameTimerInfo(gameCode);
    }

    // 타이머 시작
    public Timer startRoomTimer(String gameCode) {
        Timer timer = timerRedisRepository.getGameTimerInfo(gameCode);
        if(timer != null) {
            timer = Timer.builder().timerType("DAY").remainingTime(DAY_TIME).turn(1).build();
            timerRedisRepository.updateTimer(gameCode, timer);
        }
        return timer;
    }

    // 해당 방 타이머 정보 조회
    public Timer getTimerInfo(String gameCode) {
        Timer timer = timerRedisRepository.getGameTimerInfo(gameCode);
        if(timer == null) {
            throw new TimerNotExistException("Timer does not exist");
        }
        return timer;
    }

    // 해당 유저의 타이머 끝남을 저장
    public void timerEndUser(String gameCode, Long userSeq) {
        Timer timer = timerRedisRepository.getGameTimerInfo(gameCode);
        if(timer != null) {
            timer.getTimerEndUserSeqs().add(userSeq);
            timerRedisRepository.updateTimer(gameCode, timer);

            checkTimerEnd(gameCode, timer);
        }
    }

    // 방에 있는 모든 유저의 타이머 끝남을 확인
    private void checkTimerEnd(String gameCode, Timer timer) {
        // TODO : room에 있는 userSeqs와 timerEndUserSeqs를 비교해서 같으면 true, 다르면 false

        // true일때
        timerTypeChange(gameCode, timer);
    }

    public void timerDecreaseUser(String gameCode, Long userSeq) {
        Timer timer = timerRedisRepository.getGameTimerInfo(gameCode);
        if(timer != null) {
            if(timer.getTimerDecreaseUserSeqs().contains(userSeq)) {
                return;
            }
            timer.getTimerDecreaseUserSeqs().add(userSeq);
            timerRedisRepository.updateTimer(gameCode, timer);
            stompTimerService.sendToClient("GAME_TIMER_DECREASE", gameCode, userSeq);
        }
    }

    // 타이머 타입 변경
    public void timerTypeChange(String gameCode, Timer timer) {
        String type = timer.getTimerType();

        switch (type) {
            case "NONE" :
                timer = Timer.builder().timerType("DAY").remainingTime(DAY_TIME).turn(1).build();
                timerRedisRepository.updateTimer(gameCode, timer);

                List<RoomUserJob> roomUserJobs = jobService.randomJobInGameUser(gameCode);

                // 직업 정보, 게임 시작 알림
                stompTimerService.sendToClient("GAME_START", gameCode, roomUserJobsToData(roomUserJobs));
                stompTimerService.sendToClient("GAME_TIMER", gameCode, TimerDTO.builder().type(timer.getTimerType()).time(timer.getRemainingTime()).build());
                break;

            case "DAY" :
                timer.update(Timer.builder().timerType("VOTE").remainingTime(VOTE_TIME).build());
                timerRedisRepository.updateTimer(gameCode, timer);

                stompTimerService.sendToClient("GAME_TIMER", gameCode, TimerDTO.builder().type(timer.getTimerType()).time(timer.getRemainingTime()).build());
                break;

            case "VOTE" :
                Long mostVotedUser = voteService.voteResult(gameCode, timer.getTurn());
                stompTimerService.sendToClient("GAME_VOTE_RESULT", gameCode, mostVotedUser);

                // 게임 끝났으면 GAME_OVER, 아니면 VOTE_RESULT
                List<UserAbilityLog> userAbilityLogsV = jobService.checkGameOver(gameCode);
                if(userAbilityLogsV != null) {
                    stompTimerService.sendToClient("GAME_OVER", gameCode, userAbilityLogsToData(userAbilityLogsV));

                    timerRedisRepository.deleteGameTimer(gameCode);
                } else {
                    timer.update(Timer.builder().timerType("VOTE_RESULT").remainingTime(VOTE_RESULT_TIME).build());
                    timerRedisRepository.updateTimer(gameCode, timer);
                    stompTimerService.sendToClient("GAME_TIMER", gameCode, TimerDTO.builder().type(timer.getTimerType()).time(timer.getRemainingTime()).build());
                }
                break;

            case "VOTE_RESULT" :
                timer.update(Timer.builder().timerType("NIGHT").remainingTime(NIGHT_TIME).build());
                timerRedisRepository.updateTimer(gameCode, timer);
                stompTimerService.sendToClient("GAME_TIMER", gameCode, TimerDTO.builder().type(timer.getTimerType()).time(timer.getRemainingTime()).build());
                break;

            case "NIGHT" :
                Long deadUser = jobService.useAbilityNight(gameCode, timer.getTurn());
                List<UserAbilityRecord> userAbilityRecords = userAbilityRecordRedisRepository.findAllByGameCodeAndTurn(gameCode, timer.getTurn());

                stompTimerService.sendToClient("GAME_NIGHT_RESULT", gameCode, userAbilityLogsToData(deadUser, userAbilityRecords));

                // 게임 끝났으면 GAME_OVER, 아니면 NIGHT_RESULT
                List<UserAbilityLog> userAbilityLogsN = jobService.checkGameOver(gameCode);
                if(userAbilityLogsN != null) {
                    stompTimerService.sendToClient("GAME_OVER", gameCode, userAbilityLogsToData(userAbilityLogsN));

                    timerRedisRepository.deleteGameTimer(gameCode);
                } else {
                    timer.update(Timer.builder().timerType("NIGHT_RESULT").remainingTime(NIGHT_RESULT_TIME).build());
                    timerRedisRepository.updateTimer(gameCode, timer);
                    stompTimerService.sendToClient("GAME_TIMER", gameCode, TimerDTO.builder().type(timer.getTimerType()).time(timer.getRemainingTime()).build());
                }
                break;

            case "NIGHT_RESULT" :
                timer.update(Timer.builder().timerType("DAY").remainingTime(DAY_TIME).turn(timer.getTurn() + 1).build());
                timerRedisRepository.updateTimer(gameCode, timer);
                stompTimerService.sendToClient("GAME_TIMER", gameCode, TimerDTO.builder().type(timer.getTimerType()).time(timer.getRemainingTime()).build());
                break;
            default :
                break;
        }

    }

    private List<UserJobDataDTO> roomUserJobsToData(List<RoomUserJob> roomUserJobs) {
        return roomUserJobs.stream()
                .map(roomUserJob -> UserJobDataDTO.builder()
                        .userSeq(roomUserJob.getUserSeq())
                        .jobSeq(roomUserJob.getJobSeq())
                        .nickname(userRepository.findNicknameByUserSeq(roomUserJob.getUserSeq()))
                        .build())
                .collect(Collectors.toList());
    }

    private GameResultDataDTO userAbilityLogsToData(List<UserAbilityLog> userAbilityLogs) {
        if(userAbilityLogs.size() > 0) {
            return GameResultDataDTO.builder()
                    .roomCode(userAbilityLogs.get(0).getGameCode())
                    .rabbitWin(isRabbitWin(userAbilityLogs.get(0).getGameCode()))
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

    private NightResultDataDTO userAbilityLogsToData(Long userSeq, List<UserAbilityRecord> userAbilityLogs) {
        NightResultDataDTO nightResultDataDTO = NightResultDataDTO.builder()
                .userSeq(userSeq)
                .build();
        for(UserAbilityRecord userAbilityRecord : userAbilityLogs) {
            nightResultDataDTO.addAbility(userAbilityRecord.getUserSeq(), userAbilityRecord.isSuccess());
        }

        return nightResultDataDTO;
    }

    private boolean isRabbitWin(String gameCode) {
        long mafiaCount = roomUserJobRedisRepository.countByAliveUser(gameCode, jobService.getMafiaSeq(), true);

        return mafiaCount == 0 ? true : false;
    }
}
