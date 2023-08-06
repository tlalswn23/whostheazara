package com.chibbol.wtz.global.timer.service;

import com.chibbol.wtz.domain.job.service.JobService;
import com.chibbol.wtz.domain.vote.service.VoteService;
import com.chibbol.wtz.global.timer.dto.TimerDTO;
import com.chibbol.wtz.global.timer.entity.Timer;
import com.chibbol.wtz.global.timer.exception.TimerNotExistException;
import com.chibbol.wtz.global.timer.repository.TimerRedisRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class NewTimerService {

    private final JobService jobService;
    private final VoteService voteService;

    private final TimerRedisRepository timerRedisRepository;

    // 타이머 생성
    public void createRoomTimer(Long roomSeq) {
        timerRedisRepository.createRoomTimer(roomSeq);
    }

    // 타이머 시작
    public TimerDTO startRoomTimer(Long roomSeq) {
        Timer timer = timerRedisRepository.getRoomTimerInfo(roomSeq);
        if(timer != null) {
            timer = Timer.builder().timerType("DAY").remainingTime(60).turn(1).build();
            timerRedisRepository.updateTimer(roomSeq, timer);
        }
        return timerToTimerDTO(timer);
    }

    // 해당 방 타이머 정보 조회
    public TimerDTO getTimerInfo(Long roomSeq) {
        Timer timer = timerRedisRepository.getRoomTimerInfo(roomSeq);
        if(timer == null) {
            throw new TimerNotExistException("Timer does not exist");
        }
        return timerToTimerDTO(timer);
    }

    // 해당 유저의 타이머 끝남을 저장
    public boolean timerEndUser(Long roomSeq, Long userSeq) {
        Timer timer = timerRedisRepository.getRoomTimerInfo(roomSeq);
        if(timer != null) {
            timer.getTimerEndUserSeqs().add(userSeq);
            timerRedisRepository.updateTimer(roomSeq, timer);
        }
        return checkTimerEnd(timer);
    }

    // 방에 있는 모든 유저의 타이머 끝남을 확인
    private boolean checkTimerEnd(Timer timer) {
        // TODO : room에 있는 userSeqs와 timerEndUserSeqs를 비교해서 같으면 true, 다르면 false


        return true;
    }

    // 타이머 타입 변경
    private void timerTypeChange(Long roomSeq, Timer timer) {
        String type = timer.getTimerType();

        if(type.equals("NONE")) {
            return;
        } else if (type.equals("DAY")) {
            timer.update(Timer.builder().timerType("VOTE").remainingTime(15).build());
        } else if (type.equals("VOTE")) {
            // TODO : 투표 결과 처리
            timer.update(Timer.builder().timerType("VOTE RESULT").remainingTime(0).build());
        } else if (type.equals("VOTE RESULT")) {
            timer.update(Timer.builder().timerType("NIGHT").remainingTime(15).build());
        } else if (type.equals("NIGHT")) {
            // TODO : 밤에 직업 능력 사용 처리
            timer.update(Timer.builder().timerType("DAY").remainingTime(60).turn(timer.getTurn() + 1).build());
        }

        timerRedisRepository.updateTimer(roomSeq, timer);
    }

    public TimerDTO timerToTimerDTO(Timer timer) {
        return TimerDTO.builder()
                .timerTime(timer.getRemainingTime())
                .timerType(timer.getTimerType())
                .turn(timer.getTurn())
                .build();
    }
}
