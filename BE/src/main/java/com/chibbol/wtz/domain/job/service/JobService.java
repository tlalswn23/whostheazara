package com.chibbol.wtz.domain.job.service;

import com.chibbol.wtz.domain.job.entity.Job;
import com.chibbol.wtz.domain.job.entity.UserAbilityRecord;
import com.chibbol.wtz.domain.job.entity.UserJob;
import com.chibbol.wtz.domain.job.repository.JobRepository;
import com.chibbol.wtz.domain.job.repository.UserJobRepository;
import com.chibbol.wtz.domain.job.type.*;
import com.chibbol.wtz.domain.room.entity.Room;
import com.chibbol.wtz.global.redis.repository.UserAbilityRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobService {
    private final UserJobRepository userJobRepository;
    private final JobRepository jobRepository;
    private final UserAbilityRecordRepository userAbilityRecordRepository;

    public List<UserAbilityRecord> getUserAbilityRecordsByRoomAndTurn(Long roomSeq, Long turn) {
        return userAbilityRecordRepository.findAllByRoomSeqAndTurn(roomSeq, turn);
    }

    public void randomJob(Room room) {
        List<Job> jobs = jobRepository.findAll();
    }

    public void useAbilityDay(Room room, Long turn) {

    }

    public List<UserAbilityRecord> useAbilityNight(Long roomSeq, Long turn) {
        List<UserAbilityRecord> userAbilityRecords = getUserAbilityRecordsByRoomAndTurn(roomSeq, turn);

        // 능력 사용 순서 정하기
        PriorityQueue<JobInterface> jobAbility =
                new PriorityQueue<>(userAbilityRecords.stream()
                    .map(this::matchJobNight)
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList()));

        // 능력 사용
        Map<String, Long> turnResult = new HashMap<>();
        while(!jobAbility.isEmpty()) {
            JobInterface jobInterface = jobAbility.poll();
            jobInterface.useAbility(turnResult);
        }

        List<UserAbilityRecord> list = saveTurnResult(turnResult, userAbilityRecords);

        return list;
    }


    public JobInterface matchJobNight(UserAbilityRecord userAbilityRecord) {
        Long userSeq = userAbilityRecord.getUserSeq();
        Long roomSeq = userAbilityRecord.getRoomSeq();
        Long targetUserSeq = userAbilityRecord.getTargetUserSeq();

        UserJob userJob = userJobRepository.findByRoomRoomSeqAndUserUserSeq(roomSeq, userSeq);

        // 직업 정보 없을때
        if(userJob == null) {
            return null;
        }
        // 죽었을때
        if(!userJob.isAlive()) {
            return null;
        }

        // 밤 능력 직업별 매칭
        if (userJob.getJob().getName().equals("Doctor")) {
            System.out.println("Doctor : " + userJob.getUser().getUserSeq());
            return Doctor.builder().userSeq(userSeq).targetUserSeq(targetUserSeq).build();
        } else if (userJob.getJob().getName().equals("Police")) {
            System.out.println("Police : " + userJob.getUser().getUserSeq());
            return Police.builder().userSeq(userSeq).targetUserSeq(targetUserSeq).build();
        } else if (userJob.getJob().getName().equals("Gangster")) {
            System.out.println("Gangster : " + userJob.getUser().getUserSeq());
            return Gangster.builder().userSeq(userSeq).targetUserSeq(targetUserSeq).build();
        } else if (userJob.getJob().getName().equals("Soldier")) {
            System.out.println("Soldier : " + userJob.getUser().getUserSeq());
            return Soldier.builder().userSeq(userSeq).targetUserSeq(targetUserSeq).build();
        } else if (userJob.getJob().getName().equals("Mafia")) {
            System.out.println("Mafia : " + userJob.getUser().getUserSeq());
            return Mafia.builder().userSeq(userSeq).targetUserSeq(targetUserSeq).build();
        }

        return null;
    }

    public List<UserAbilityRecord> saveTurnResult(Map<String, Long> turnResult, List<UserAbilityRecord> userAbilityRecords) {
        for(UserAbilityRecord userAbilityRecord : userAbilityRecords) {
            Long userSeq = userAbilityRecord.getUserSeq();
            Long roomSeq = userAbilityRecord.getRoomSeq();

            UserJob userJob = userJobRepository.findByRoomRoomSeqAndUserUserSeq(roomSeq, userSeq);

            if(userJob.getJob().getName().equals("Doctor")) {
                if(turnResult.containsKey("Doctor")) {
                    userAbilityRecord.success();
                }
            } else if(userJob.getJob().getName().equals("Police")) {
                if(turnResult.containsKey("Police")) {
                    userAbilityRecord.success();
                }
            } else if(userJob.getJob().getName().equals("Gangster")) {
                if(turnResult.containsKey("Gangster")) {
                    userJobRepository.save(userJob.update(UserJob.builder().canVote(false).build()));
                }
            } else if(userJob.getJob().getName().equals("Soldier")) {
                if(turnResult.containsKey("Soldier")) {
                    if(userJob.isUseAbility()) {
                        userJobRepository.save(userJob.update(UserJob.builder().isAlive(false).build()));
                        turnResult.put("kill", userSeq);
                    } else {
                        userJobRepository.save(userJob.update(UserJob.builder().useAbility(true).build()));
                        userAbilityRecord.success();
                        System.out.println("Soldier use life");
                    }
                }
            } else if(userJob.getJob().getName().equals("Mafia")) {
                if(turnResult.containsKey("kill")) {
                    UserJob deaduserJob = userJobRepository.findByRoomRoomSeqAndUserUserSeq(roomSeq, turnResult.get("kill"));
                    System.out.println("Mafia kill userSeq:" + deaduserJob.getUser().getUserSeq());
                    userJobRepository.save(deaduserJob.update(UserJob.builder().isAlive(false).build()));
                    userAbilityRecord.success();
                }
            }
            userAbilityRecordRepository.saveAll(userAbilityRecords);
        }
        return userAbilityRecords;
    }
}
