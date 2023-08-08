package com.chibbol.wtz.domain.job.service;

import com.chibbol.wtz.domain.chat.entity.Room;
import com.chibbol.wtz.domain.chat.exception.RoomNotFoundException;
import com.chibbol.wtz.domain.chat.repository.RoomJobSettingRedisRepository;
import com.chibbol.wtz.domain.chat.repository.RoomRepository;
import com.chibbol.wtz.domain.job.dto.ExcludeJobDTO;
import com.chibbol.wtz.domain.job.dto.ResultDTO;
import com.chibbol.wtz.domain.job.entity.Job;
import com.chibbol.wtz.domain.job.entity.RoomUserJob;
import com.chibbol.wtz.domain.job.entity.UserAbilityLog;
import com.chibbol.wtz.domain.job.entity.UserAbilityRecord;
import com.chibbol.wtz.domain.job.exception.JobNotExistsException;
import com.chibbol.wtz.domain.job.exception.UserJobNotExistsException;
import com.chibbol.wtz.domain.job.repository.JobRepository;
import com.chibbol.wtz.domain.job.repository.RoomUserJobRedisRepository;
import com.chibbol.wtz.domain.job.repository.UserAbilityLogRepository;
import com.chibbol.wtz.domain.job.repository.UserAbilityRecordRedisRepository;
import com.chibbol.wtz.domain.job.type.*;
import com.chibbol.wtz.domain.user.repository.UserRepository;
import com.chibbol.wtz.domain.vote.repository.VoteRedisRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
public class JobService {
    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final RoomUserJobRedisRepository roomUserJobRedisRepository;
    private final UserAbilityLogRepository userAbilityLogRepository;

    private final VoteRedisRepository voteRedisRepository;
    private final RoomJobSettingRedisRepository roomJobSettingRedisRepository;
    private final UserAbilityRecordRedisRepository userAbilityRecordRedisRepository;

    private Map<Long, Job> jobMap;
    private Long mafiaSeq;

    public JobService(JobRepository jobRepository, UserRepository userRepository, RoomRepository roomRepository, RoomUserJobRedisRepository roomUserJobRedisRepository, UserAbilityLogRepository userAbilityLogRepository, VoteRedisRepository voteRedisRepository, RoomJobSettingRedisRepository roomJobSettingRedisRepository, UserAbilityRecordRedisRepository userAbilityRecordRedisRepository) {
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
        this.roomUserJobRedisRepository = roomUserJobRedisRepository;
        this.userAbilityLogRepository = userAbilityLogRepository;
        this.voteRedisRepository = voteRedisRepository;
        this.roomJobSettingRedisRepository = roomJobSettingRedisRepository;
        this.userAbilityRecordRedisRepository = userAbilityRecordRedisRepository;

        // jobRepository.findAll()을 사용하여 jobMap 초기화
        this.jobMap = jobRepository.findAll().stream().collect(Collectors.toMap(Job::getJobSeq, job -> job));
        this.mafiaSeq = jobRepository.findByName("Mafia").getJobSeq();
    }


    // 해당 roomSeq에 참여한 user에게 랜덤으로 직업 배정
    public List<RoomUserJob> randomJobInRoomUser(String roomCode) {
        Room room = roomRepository.findByCode(roomCode);

        if (room == null) {
            throw new RoomNotFoundException("방이 존재하지 않습니다.");
        }

        List<RoomUserJob> joinUser = roomUserJobRedisRepository.findAllByRoomCode(roomCode);
        List<Job> jobs = jobRepository.findAll();
        // 제외 직업
        List<Long> excludeJobSeq = roomJobSettingRedisRepository.findExcludeJobSeqByRoomCode(roomCode);
        Job mafia = jobRepository.findByName("Mafia");

        if (mafia == null) {
            throw new JobNotExistsException("마피아 직업이 존재하지 않습니다.");
        }

        // 마피아 배정 여부
        int mafiaCount = (joinUser.size() >= 8) ? 2 : 1;

        Collections.shuffle(joinUser);
        // 랜덤 직업 배정
        for (RoomUserJob RoomUserJob : joinUser) {
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
            if (job.getJobSeq() != 1) {
                excludeJobSeq.add(job.getJobSeq());
            }

            // 유저 직업 저장
            roomUserJobRedisRepository.save(RoomUserJob.builder()
                    .roomCode(roomCode)
                    .jobSeq(job.getJobSeq())
                    .userSeq(RoomUserJob.getUserSeq())
                    .canVote(true)
                    .isAlive(true)
                    .build());

        }

        log.info("=====================================");
        log.info("SUCCESS RANDOM JOB ASSIGN");
        log.info("ROOM_SEQ : " + roomCode);
        log.info("USER_SEQ : " + joinUser.stream().map(roomUser -> roomUser.getUserSeq()).collect(Collectors.toList()));
        log.info("EXCLUDE_JOB_SEQ : " + roomJobSettingRedisRepository.findExcludeJobSeqByRoomCode(roomCode));
        log.info("=====================================");

        return roomUserJobRedisRepository.findAllByRoomCode(roomCode);
    }

    // redis에서 roomSeq, turn에 사용한 능력 조회
    public List<UserAbilityRecord> getUserAbilityRecordsByRoomAndTurn(String roomCode, int turn) {
        return userAbilityRecordRedisRepository.findAllByRoomCodeAndTurn(roomCode, turn);
    }

    // 밤 능력 사용
    public Long useAbilityNight(String roomCode, int turn) {
        List<UserAbilityRecord> userAbilityRecords = getUserAbilityRecordsByRoomAndTurn(roomCode, turn);

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
            if(roomUserJobRedisRepository.findByRoomCodeAndUserSeq(roomCode, jobInterface.getUserSeq()).isAlive()) {
                jobInterface.useAbility(turnResult);
            }
        }

        List<UserAbilityRecord> list = saveTurnResult(turnResult, userAbilityRecords);

        log.info("=====================================");
        log.info("SUCCESS USE ABILITY, SAVE TURN RESULT");
        log.info("ROOM_SEQ : " + roomCode);
        log.info("TURN : " + turn);
        log.info("TURN_RESULT : " + turnResult);
        log.info("=====================================");

        return turnResult.get("kill") == null ? turnResult.get("kill") : null;
    }

    // 능력 매칭
    public JobInterface matchJobNight(UserAbilityRecord userAbilityRecord) {
        Long userSeq = userAbilityRecord.getUserSeq();
        String roomCode = userAbilityRecord.getRoomCode();
        Long targetUserSeq = userAbilityRecord.getTargetUserSeq();

        RoomUserJob roomUserJob = roomUserJobRedisRepository.findByRoomCodeAndUserSeq(roomCode, userSeq);


        // 직업 정보 없을때
        if(roomUserJob == null) {
            throw new UserJobNotExistsException("유저 직업 정보가 없습니다.");
        }
        // 죽었을때
        if(!roomUserJob.isAlive()) {
            return null;
        }

        String jobName = jobMap.get(roomUserJob.getJobSeq()).getName();
        // 직업 이름으로 직업 클래스 매핑
        if (jobName.equals("Doctor")) {
            return Doctor.builder().userSeq(userSeq).targetUserSeq(targetUserSeq).build();
        } else if (jobName.equals("Police")) {
            return Police.builder().userSeq(userSeq).targetUserSeq(targetUserSeq).build();
        } else if (jobName.equals("Gangster")) {
            return Gangster.builder().userSeq(userSeq).targetUserSeq(targetUserSeq).build();
        } else if (jobName.equals("Soldier")) {
            return Soldier.builder().userSeq(userSeq).targetUserSeq(targetUserSeq).build();
        } else if (jobName.equals("Mafia")) {
            return Mafia.builder().userSeq(userSeq).targetUserSeq(targetUserSeq).build();
        }

        return null;
    }

    // 턴 결과 redis 에 업데이트
    public List<UserAbilityRecord> saveTurnResult(Map<String, Long> turnResult, List<UserAbilityRecord> userAbilityRecords) {
        Map<Long, RoomUserJob> userJobs = new HashMap<>();
        List<RoomUserJob> jobsToUpdate = new ArrayList<>();
        List<UserAbilityRecord> recordsToSave = new ArrayList<>();

        for (UserAbilityRecord userAbilityRecord : userAbilityRecords) {
            Long userSeq = userAbilityRecord.getUserSeq();
            String roomCode = userAbilityRecord.getRoomCode();

            RoomUserJob userJob = userJobs.computeIfAbsent(userSeq,
                    (userId) -> roomUserJobRedisRepository.findByRoomCodeAndUserSeq(roomCode, userId));

            if (userJob != null) {
                String jobName = jobMap.get(userJob.getJobSeq()).getName();

                switch (jobName) {
                    case "Doctor":
                        if (turnResult.containsKey("Doctor")) {
                            recordsToSave.add(userAbilityRecord.success());
                        }
                        break;
                    case "Police":
                        if (turnResult.containsKey("Police")) {
                            recordsToSave.add(userAbilityRecord.success());
                        }
                        break;
                    case "Gangster":
                        if (turnResult.containsKey("Gangster")) {
                            RoomUserJob roomUserJob = roomUserJobRedisRepository.findByRoomCodeAndUserSeq(roomCode, turnResult.get("Gangster"));
                            if (roomUserJob != null) {
                                jobsToUpdate.add(roomUserJob.canVote(false));
                                recordsToSave.add(userAbilityRecord.success());
                            }
                            // 마피아를 선택했을 경우 능력 성공
                            if(roomUserJob.getJobSeq().equals(mafiaSeq)) {
                                recordsToSave.add(userAbilityRecord.success());
                            }
                        }
                        break;
                    case "Soldier":
                        if (turnResult.containsKey("Soldier")) {
                            if (userJob.isUseAbility()) {
                                turnResult.put("kill", userSeq);
                            } else {
                                jobsToUpdate.add(userJob.useAbility());
                                recordsToSave.add(userAbilityRecord.success());
                            }
                        }
                        break;
                    case "Mafia":
                        if (turnResult.containsKey("kill")) {
                            RoomUserJob roomUserJob = roomUserJobRedisRepository.findByRoomCodeAndUserSeq(roomCode, turnResult.get("kill"));
                            if (roomUserJob != null) {
                                jobsToUpdate.add(roomUserJob.kill());
                                recordsToSave.add(userAbilityRecord.success());
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
        }

        // Batch 처리
        if (!jobsToUpdate.isEmpty()) {
            System.out.print("jobsToUpdate");
            roomUserJobRedisRepository.saveAll(jobsToUpdate);
        }
        if (!recordsToSave.isEmpty()) {
            userAbilityRecordRedisRepository.saveAll(recordsToSave);
        }

        return userAbilityRecords;
    }



    public List<UserAbilityLog> checkGameOver(String roomCode) {
        List<UserAbilityLog> userAbilityLogs = null;

        long mafiaCount = roomUserJobRedisRepository.countByAliveUser(roomCode, mafiaSeq, true);
        long citizenCount = roomUserJobRedisRepository.countByAliveUser(roomCode, mafiaSeq, false);
        if(mafiaCount == 0) {
            userAbilityLogs = saveUserAbilityRecord(roomCode, true);
        } else if(mafiaCount >= citizenCount) {
            userAbilityLogs = saveUserAbilityRecord(roomCode, false);
        }

        return userAbilityLogs;
    }


    public ResultDTO toggleExcludeJobSeq(ExcludeJobDTO excludeJobDTO) {
        ResultDTO resultDTO;
        if(roomJobSettingRedisRepository.findByRoomCodeAndJobSeq(excludeJobDTO.getRoomCode(), excludeJobDTO.getJobSeq())) {
            addExcludeJobSeq(excludeJobDTO);
            resultDTO = ResultDTO.builder().roomId(excludeJobDTO.getRoomSeq().toString()).result(true).build();
        } else {
            removeExcludeJobSeq(excludeJobDTO);
            resultDTO = ResultDTO.builder().roomId(excludeJobDTO.getRoomSeq().toString()).result(false).build();
        }
        return resultDTO;
    }

    public List<UserAbilityLog> saveUserAbilityRecord(String roomCode, boolean win) {  // win = true -> 시민 승리
        List<UserAbilityRecord> userAbilityRecords = userAbilityRecordRedisRepository.findAllByRoomSeq(roomCode);

        Room room = roomRepository.findByCode(roomCode);
        roomRepository.save(room.update(Room.builder().endAt(LocalDateTime.now()).build()));

        Map<Long, UserAbilityLog> userAbilityLogs = new HashMap<>();
        Map<Long, RoomUserJob> userJobs = new HashMap<>();
        for(UserAbilityRecord userAbilityRecord : userAbilityRecords) {
            Long userSeq = userAbilityRecord.getUserSeq();
            RoomUserJob roomUserJob = userJobs.computeIfAbsent(userSeq,
                    (userId) -> roomUserJobRedisRepository.findByRoomCodeAndUserSeq(roomCode, userId));

            if (!userAbilityLogs.containsKey(userSeq)) {
                userAbilityLogs.put(userSeq, UserAbilityLog.builder()
                        .user(userRepository.findByUserSeq(userSeq))
                        .room(room)
                        .job(jobMap.get(roomUserJob.getJobSeq()))
                        .result(checkUserJobWin(roomUserJob.getJobSeq(), win))
                        .abilitySuccessCount(0)
                        .startAt(room.getStartAt())
                        .endAt(room.getEndAt())
                        .build());
            }

            // 능력 사용 성공 여부
            if(userAbilityRecord.isSuccess()) {
                UserAbilityLog userAbilityLog = userAbilityLogs.get(userAbilityRecord.getUserSeq());
                userAbilityLog.addAbilitySuccessCount();
                userAbilityLogs.put(userAbilityRecord.getUserSeq(), userAbilityLog);
            }
        }

        userAbilityLogRepository.saveAll(userAbilityLogs.values());
        userAbilityRecordRedisRepository.deleteAllByRoomSeq(roomCode);
        voteRedisRepository.deleteAllByRoomCode(roomCode);

        log.info("=====================================");
        log.info("SUCCESS SAVE USER ABILITY LOG");
        log.info("ROOM_SEQ : " + roomCode);
        log.info("=====================================");

        return new ArrayList<>(userAbilityLogs.values());
    }

    public boolean checkUserJobWin(Long jobSeq, boolean win) {
        return win == (mafiaSeq.equals(jobSeq));
    }

    // TODO : 추후 roomService로 이동 필요
    public void addExcludeJobSeq(ExcludeJobDTO excludeJobDTO) {
        String roomCode = excludeJobDTO.getRoomCode();
        Long excludeJobSeq = excludeJobDTO.getJobSeq();

        roomJobSettingRedisRepository.addExcludeJobSeq(roomCode, excludeJobSeq);

        log.info("=====================================");
        log.info("SUCCESS ADD EXCLUDE JOB SEQ");
        log.info("ROOM_SEQ : " + roomCode);
        log.info("EXCLUDE_JOB_SEQ : " + excludeJobSeq);
        log.info("=====================================");
    }

    // TODO : 추후 roomService로 이동 필요
    public void removeExcludeJobSeq(ExcludeJobDTO excludeJobDTO) {
        String roomCode = excludeJobDTO.getRoomCode();
        Long excludeJobSeq = excludeJobDTO.getJobSeq();

        roomJobSettingRedisRepository.removeExcludeJobSeq(roomCode, excludeJobSeq);

        log.info("=====================================");
        log.info("SUCCESS REMOVE EXCLUDE JOB SEQ");
        log.info("ROOM_SEQ : " + roomCode);
        log.info("EXCLUDE_JOB_SEQ : " + excludeJobSeq);
        log.info("=====================================");
    }
}
