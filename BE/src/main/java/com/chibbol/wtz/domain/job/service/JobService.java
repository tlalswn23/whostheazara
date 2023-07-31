package com.chibbol.wtz.domain.job.service;

import com.chibbol.wtz.domain.job.entity.Job;
import com.chibbol.wtz.domain.job.entity.UserAbilityRecord;
import com.chibbol.wtz.domain.job.entity.UserJob;
import com.chibbol.wtz.domain.job.exception.JobNotExistsException;
import com.chibbol.wtz.domain.job.exception.UserJobNotExistsException;
import com.chibbol.wtz.domain.job.exception.UserNotAliveException;
import com.chibbol.wtz.domain.job.repository.JobRepository;
import com.chibbol.wtz.domain.job.repository.UserAbilityRecordRedisRepository;
import com.chibbol.wtz.domain.job.repository.UserJobRepository;
import com.chibbol.wtz.domain.job.type.*;
import com.chibbol.wtz.domain.room.entity.Room;
import com.chibbol.wtz.domain.room.entity.RoomUser;
import com.chibbol.wtz.domain.room.exception.RoomNotExistException;
import com.chibbol.wtz.domain.room.repository.RoomRepository;
import com.chibbol.wtz.domain.room.repository.RoomUserRepository;
import com.chibbol.wtz.global.redis.repository.RoomJobSettingRedisRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class JobService {
    private final JobRepository jobRepository;
    private final RoomRepository roomRepository;
    private final UserJobRepository userJobRepository;
    private final RoomUserRepository roomUserRepository;
    private final RoomJobSettingRedisRepository roomJobSettingRedisRepository;
    private final UserAbilityRecordRedisRepository userAbilityRecordRepository;

    // 해당 roomSeq에 참여한 user에게 랜덤으로 직업 배정
    public List<UserJob> randomJobInRoomUser(Long roomSeq) {
        Room room = roomRepository.findByRoomSeq(roomSeq);

        if(room != null) {
            throw new RoomNotExistException("방이 존재하지 않습니다.");
        }

        List<RoomUser> joinUser = roomUserRepository.findAllByRoomRoomSeq(roomSeq);
        List<Job> jobs = jobRepository.findAll();
        // 제외 직업
        List<Long> excludeJobSeq = roomJobSettingRedisRepository.findExcludeJobSeqByRoomSeq(roomSeq);
        Job mafia = jobRepository.findByName("Mafia");

        if(mafia == null) {
            throw new JobNotExistsException("마피아 직업이 존재하지 않습니다.");
        }

        // 마피아 배정 여부
        int mafiaCount = (joinUser.size() >= 8) ? 2 : 1;

        Collections.shuffle(joinUser);
        // 랜덤 직업 배정
        for(RoomUser roomUser : joinUser) {
            // 제외 직업 제외
            List<Job> jobList = new ArrayList<>(jobs);
            jobList.removeIf(job -> excludeJobSeq.contains(job.getJobSeq()));

            // 마피아 직업이 배정되지 않았다면 무조건 배정
            if (mafiaCount > 0) {
                if (mafia != null) {
                    jobList.clear();
                    jobList.add(mafia);
                    mafiaCount--;
                }
            }

            // 랜덤 직업 배정
            Collections.shuffle(jobList);
            Job job = jobList.get(0);

            // 배정한 직업 재배정하지 않기 위해 제외 직업에 추가
            if(job.getJobSeq() != 1) {
                excludeJobSeq.add(job.getJobSeq());
            }

            // 유저 직업 저장
            userJobRepository.save(UserJob.builder()
                    .room(room)
                    .user(roomUser.getUser())
                    .job(job)
                    .canVote(true)
                    .isAlive(true)
                    .build());

        }

        log.info("=====================================");
        log.info("SUCCESS RANDOM JOB ASSIGN");
        log.info("ROOM_SEQ : " + roomSeq);
        log.info("USER_SEQ : " + joinUser.stream().map(roomUser -> roomUser.getUser().getUserSeq()).collect(Collectors.toList()));
        log.info("EXCLUDE_JOB_SEQ : " + roomJobSettingRedisRepository.findExcludeJobSeqByRoomSeq(roomSeq));
        log.info("=====================================");

        return userJobRepository.findAllByRoomRoomSeq(roomSeq);

    }

    // redis에서 roomSeq, turn에 사용한 능력 조회
    public List<UserAbilityRecord> getUserAbilityRecordsByRoomAndTurn(Long roomSeq, Long turn) {
        return userAbilityRecordRepository.findAllByRoomSeqAndTurn(roomSeq, turn);
    }

    // 밤 능력 사용
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
            if(userJobRepository.findByRoomRoomSeqAndUserUserSeq(roomSeq, jobInterface.getUserSeq()).isAlive()) {
                jobInterface.useAbility(turnResult);
            }
        }

        List<UserAbilityRecord> list = saveTurnResult(turnResult, userAbilityRecords);

        // 게임 종료 여부 확인
        // TODO: 게임 종료 여부 알려줘야함
        boolean gameEnd = checkGameOver(roomSeq);

        log.info("=====================================");
        log.info("SUCCESS USE ABILITY, SAVE TURN RESULT");
        log.info("ROOM_SEQ : " + roomSeq);
        log.info("TURN : " + turn);
        log.info("TURN_RESULT : " + turnResult);
        log.info("GAME_END : " + gameEnd);
        log.info("=====================================");

        return list;
    }

    // 능력 매칭
    public JobInterface matchJobNight(UserAbilityRecord userAbilityRecord) {
        Long userSeq = userAbilityRecord.getUserSeq();
        Long roomSeq = userAbilityRecord.getRoomSeq();
        Long targetUserSeq = userAbilityRecord.getTargetUserSeq();

        UserJob userJob = userJobRepository.findByRoomRoomSeqAndUserUserSeq(roomSeq, userSeq);

        // 직업 정보 없을때
        if(userJob == null) {
            throw new UserJobNotExistsException("유저 직업 정보가 없습니다.");
        }
        // 죽었을때
        if(!userJob.isAlive()) {
            throw new UserNotAliveException("유저가 죽었습니다.");
        }

        // 밤 능력 직업별 매칭
        if (userJob.getJob().getName().equals("Doctor")) {
            return Doctor.builder().userSeq(userSeq).targetUserSeq(targetUserSeq).build();
        } else if (userJob.getJob().getName().equals("Police")) {
            return Police.builder().userSeq(userSeq).targetUserSeq(targetUserSeq).build();
        } else if (userJob.getJob().getName().equals("Gangster")) {
            return Gangster.builder().userSeq(userSeq).targetUserSeq(targetUserSeq).build();
        } else if (userJob.getJob().getName().equals("Soldier")) {
            return Soldier.builder().userSeq(userSeq).targetUserSeq(targetUserSeq).build();
        } else if (userJob.getJob().getName().equals("Mafia")) {
            return Mafia.builder().userSeq(userSeq).targetUserSeq(targetUserSeq).build();
        }

        return null;
    }

    // 턴 결과 redis 에 업데이트
    public List<UserAbilityRecord> saveTurnResult(Map<String, Long> turnResult, List<UserAbilityRecord> userAbilityRecords) {
        for(UserAbilityRecord userAbilityRecord : userAbilityRecords) {
            Long userSeq = userAbilityRecord.getUserSeq();
            Long roomSeq = userAbilityRecord.getRoomSeq();

            UserJob userJob = userJobRepository.findByRoomRoomSeqAndUserUserSeq(roomSeq, userSeq);

            if(userJob.getJob().getName().equals("Doctor")) {
                if(turnResult.containsKey("Doctor")) {
                    userAbilityRecordRepository.save(userAbilityRecord.success());
                }
            } else if(userJob.getJob().getName().equals("Police")) {
                if(turnResult.containsKey("Police")) {
                    userAbilityRecordRepository.save(userAbilityRecord.success());
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
                        userAbilityRecordRepository.save(userAbilityRecord.success());
                    }
                }
            } else if(userJob.getJob().getName().equals("Mafia")) {
                if(turnResult.containsKey("kill")) {
                    UserJob deaduserJob = userJobRepository.findByRoomRoomSeqAndUserUserSeq(roomSeq, turnResult.get("kill"));
                    userJobRepository.save(deaduserJob.update(UserJob.builder().isAlive(false).build()));
                    userAbilityRecordRepository.save(userAbilityRecord.success());
                }
            }
        }
        return userAbilityRecords;
    }

    public boolean checkGameOver(Long roomSeq) {
        Long jobSeq = jobRepository.findByName("Mafia").getJobSeq();

        int mafiaCount = userJobRepository.countByRoomRoomSeqAndJobJobSeqAndIsAliveTrue(roomSeq, jobSeq);
        int citizenCount = userJobRepository.countByRoomRoomSeqAndJobJobSeqNotAndIsAliveTrue(roomSeq, jobSeq);

        return (mafiaCount >= citizenCount) ? true : false;
    }


    // TODO : 추후 roomService로 이동 필요
    public void addExcludeJobSeq(Long roomSeq, Long excludeJobSeq) {
        roomJobSettingRedisRepository.addExcludeJobSeq(roomSeq, excludeJobSeq);

        log.info("=====================================");
        log.info("SUCCESS ADD EXCLUDE JOB SEQ");
        log.info("ROOM_SEQ : " + roomSeq);
        log.info("EXCLUDE_JOB_SEQ : " + excludeJobSeq);
        log.info("=====================================");
    }

    // TODO : 추후 roomService로 이동 필요
    public void removeExcludeJobSeq(Long roomSeq, Long excludeJobSeq) {
        roomJobSettingRedisRepository.removeExcludeJobSeq(roomSeq, excludeJobSeq);

        log.info("=====================================");
        log.info("SUCCESS REMOVE EXCLUDE JOB SEQ");
        log.info("ROOM_SEQ : " + roomSeq);
        log.info("EXCLUDE_JOB_SEQ : " + excludeJobSeq);
        log.info("=====================================");
    }

}
