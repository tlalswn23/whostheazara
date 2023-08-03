package com.chibbol.wtz.domain.job.service;

import com.chibbol.wtz.domain.job.dto.RecentRecordDTO;
import com.chibbol.wtz.domain.job.entity.Job;
import com.chibbol.wtz.domain.job.entity.UserAbilityLog;
import com.chibbol.wtz.domain.job.exception.JobNotExistsException;
import com.chibbol.wtz.domain.job.repository.JobRepository;
import com.chibbol.wtz.domain.job.repository.UserAbilityLogRepository;
import com.chibbol.wtz.domain.user.entity.User;
import com.chibbol.wtz.domain.user.exception.UserNotFoundException;
import com.chibbol.wtz.domain.user.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@AllArgsConstructor
public class RecordService {

    private final UserService userService;

    private final JobRepository jobRepository;
    private final UserAbilityLogRepository userAbilityLogRepository;

    public List<RecentRecordDTO> getRecentRecord() {
        User user = userService.getLoginUser();
        if(user == null) {
            throw new UserNotFoundException("유저 정보를 찾을 수 없습니다.");
        }

        List<UserAbilityLog> userAbilityLogs = userAbilityLogRepository.findTop10ByUserOrderByStartAtDesc(user);

        return userAbilityLogToRecentRecordDTO(userAbilityLogs);
    }

    public int getWinRate() {
        User user = userService.getLoginUser();
        if(user == null) {
            throw new UserNotFoundException("유저 정보를 찾을 수 없습니다.");
        }

        int playCount = userAbilityLogRepository.countByUser(user);
        int winCount = userAbilityLogRepository.countByUserAndResult(user, true);

        if(playCount == 0) {
            return 0;
        }

        return (int) ((double) winCount / playCount * 100);
    }

    public int getJobWinRate(Long jobSeq) {
        User user = userService.getLoginUser();
        if(user == null) {
            throw new UserNotFoundException("유저 정보를 찾을 수 없습니다.");
        }

        Job job = jobRepository.findById(jobSeq).orElse(null);
        if(job == null) {
            throw new JobNotExistsException("직업 정보를 찾을 수 없습니다.");
        }

        int playCount = userAbilityLogRepository.countByUserAndJob(user, job);
        int winCount = userAbilityLogRepository.countByUserAndJobAndResult(user, job, true);

        if(playCount == 0) {
            return 0;
        }

        return (int) ((double) winCount / playCount * 100);
    }


    public List<RecentRecordDTO> userAbilityLogToRecentRecordDTO(List<UserAbilityLog> userAbilityLogs) {
        return userAbilityLogs.stream()
                .map(userAbilityLog -> RecentRecordDTO.builder()
                        .jobSeq(userAbilityLog.getJob().getJobSeq())
                        .roomSeq(userAbilityLog.getRoom().getRoomSeq())
                        .isWin(userAbilityLog.isResult())
                        .playAt(userAbilityLog.getStartAt())
                        .build())
                .collect(Collectors.toList());
    }
}
