package com.chibbol.wtz.domain.job.service;

import com.chibbol.wtz.domain.job.entity.Job;
import com.chibbol.wtz.domain.job.entity.UserAbilityRecord;
import com.chibbol.wtz.domain.job.entity.UserJob;
import com.chibbol.wtz.domain.job.repository.JobRepository;
import com.chibbol.wtz.domain.job.repository.UserJobRepository;
import com.chibbol.wtz.domain.job.type.*;
import com.chibbol.wtz.domain.room.entity.Room;
import com.chibbol.wtz.domain.room.entity.RoomUser;
import com.chibbol.wtz.domain.room.repository.RoomRepository;
import com.chibbol.wtz.domain.room.repository.RoomUserRepository;
import com.chibbol.wtz.global.redis.repository.RoomJobSettingRedisRepository;
import com.chibbol.wtz.global.redis.repository.UserAbilityRecordRedisRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobService {
    private final UserJobRepository userJobRepository;
    private final JobRepository jobRepository;
    private final RoomRepository roomRepository;
    private final RoomUserRepository roomUserRepository;
    private final UserAbilityRecordRedisRepository userAbilityRecordRepository;
    private final RoomJobSettingRedisRepository roomJobSettingRedisRepository;

    public List<UserJob> randomJobInRoomUser(Long roomSeq) {
        List<RoomUser> joinUser = roomUserRepository.findAllByRoomRoomSeq(roomSeq);
        List<Job> jobs = jobRepository.findAll();
        // 제외 직업seq 저장 리스트
        List<Long> excludeJobSeq = roomJobSettingRedisRepository.findExcludeJobSeqByRoomSeq(roomSeq);
        System.out.println("excludeJobSeq = " + excludeJobSeq.toString());

        // 마피아 배정 여부
        boolean isMafiaAssign = false;

        // 랜덤 직업 배정
        for(RoomUser roomUser : joinUser) {
            // 제외 직업 제외
            List<Job> jobList = new ArrayList<>(jobs);
            jobList.removeIf(job -> excludeJobSeq.contains(job.getJobSeq()));

            // 마피아 직업이 배정되지 않았다면 무조건 배정
            if (!isMafiaAssign) {
                Job mafia = jobList.stream().filter(job -> job.getJobSeq() == 7).findFirst().orElse(null);
                if (mafia != null) {
                    jobList.clear();
                    jobList.add(mafia);
                    isMafiaAssign = true;
                }
            }

            // 랜덤 직업 배정
            Collections.shuffle(jobList);
            Job job = jobList.get(0);

            // 제외 직업 저장
            if(job.getJobSeq() != 1) {
                excludeJobSeq.add(job.getJobSeq());
            }

            // 유저 직업 저장
            userJobRepository.save(UserJob.builder()
                    .room(roomRepository.findByRoomSeq(roomSeq))
                    .user(roomUser.getUser())
                    .job(job)
                    .canVote(true)
                    .isAlive(true)
                    .build());
        }

        return userJobRepository.findAllByRoomRoomSeq(roomSeq);

    }

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

    public void addExcludeJobSeq(Long roomSeq, Long excludeJobSeq) {
        roomJobSettingRedisRepository.addExcludeJobSeq(roomSeq, excludeJobSeq);
    }

    public void removeExcludeJobSeq(Long roomSeq, Long excludeJobSeq) {
        roomJobSettingRedisRepository.removeExcludeJobSeq(roomSeq, excludeJobSeq);
    }

}
