package com.chibbol.wtz.domain.job.service;

import com.chibbol.wtz.domain.job.entity.*;
import com.chibbol.wtz.domain.job.exception.JobNotExistsException;
import com.chibbol.wtz.domain.job.exception.UserJobNotExistsException;
import com.chibbol.wtz.domain.job.repository.*;
import com.chibbol.wtz.domain.job.type.*;
import com.chibbol.wtz.domain.room.entity.Game;
import com.chibbol.wtz.domain.room.repository.GameRepository;
import com.chibbol.wtz.domain.room.repository.RoomJobSettingRedisRepository;
import com.chibbol.wtz.domain.room.repository.RoomRepository;
import com.chibbol.wtz.domain.user.repository.UserRepository;
import com.chibbol.wtz.domain.vote.entity.VoteTurnRecord;
import com.chibbol.wtz.domain.vote.repository.VoteRedisRepository;
import com.chibbol.wtz.domain.vote.repository.VoteTurnRecordRepository;
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
    private final GameRepository gameRepository;
    private final RoomJobSettingRedisRepository roomJobSettingRedisRepository;
    private final VoteTurnRecordRepository voteTurnRecordRepository;
    private final UserAbilityRecordRedisRepository userAbilityRecordRedisRepository;
    private final UserAbilityTurnRecordRepository userAbilityTurnRecordRepository;

    private Map<Long, Job> jobMap;
    private Long mafiaSeq;

    public JobService(JobRepository jobRepository, UserRepository userRepository, RoomRepository roomRepository, RoomUserJobRedisRepository roomUserJobRedisRepository, UserAbilityLogRepository userAbilityLogRepository, VoteRedisRepository voteRedisRepository, GameRepository gameRepository, RoomJobSettingRedisRepository roomJobSettingRedisRepository, VoteTurnRecordRepository voteTurnRecordRepository, UserAbilityRecordRedisRepository userAbilityRecordRedisRepository, UserAbilityTurnRecordRepository userAbilityTurnRecordRepository) {
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
        this.roomUserJobRedisRepository = roomUserJobRedisRepository;
        this.userAbilityLogRepository = userAbilityLogRepository;
        this.voteRedisRepository = voteRedisRepository;
        this.gameRepository = gameRepository;
        this.roomJobSettingRedisRepository = roomJobSettingRedisRepository;
        this.voteTurnRecordRepository = voteTurnRecordRepository;
        this.userAbilityRecordRedisRepository = userAbilityRecordRedisRepository;

        // jobRepository.findAll()을 사용하여 jobMap 초기화
        this.jobMap = jobRepository.findAll().stream().collect(Collectors.toMap(Job::getJobSeq, job -> job));
        this.mafiaSeq = jobRepository.findByName("Mafia").getJobSeq();
        this.userAbilityTurnRecordRepository = userAbilityTurnRecordRepository;
    }

    public Long getMafiaSeq() {
        return mafiaSeq;
    }


    // 해당 roomSeq에 참여한 user에게 랜덤으로 직업 배정
    public List<RoomUserJob> randomJobInGameUser(String gameCode) {
//        Room room = roomRepository.findByCode(gameCode);
//
//        if (room == null) {
//            throw new RoomNotFoundException("방이 존재하지 않습니다.");
//        }

        List<RoomUserJob> joinUser = roomUserJobRedisRepository.findAllByGameCode(gameCode);
        List<Job> jobs = jobRepository.findAll();
        // 제외 직업
        List<Long> excludeJobSeq = roomJobSettingRedisRepository.findExcludeJobSeqByGameCode(gameCode);
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
                    .gameCode(gameCode)
                    .jobSeq(job.getJobSeq())
                    .userSeq(RoomUserJob.getUserSeq())
                    .canVote(true)
                    .isAlive(true)
                    .build());

        }

        log.info("=====================================");
        log.info("SUCCESS RANDOM JOB ASSIGN");
        log.info("GAME_CODE : " + gameCode);
        log.info("USER_SEQ : " + joinUser.stream().map(roomUser -> roomUser.getUserSeq()).collect(Collectors.toList()));
        log.info("EXCLUDE_JOB_SEQ : " + roomJobSettingRedisRepository.findExcludeJobSeqByGameCode(gameCode));
        log.info("=====================================");

        return roomUserJobRedisRepository.findAllByGameCode(gameCode);
    }

    // redis에서 roomSeq, turn에 사용한 능력 조회
    public List<UserAbilityRecord> getUserAbilityRecordsByGameAndTurn(String gameCode, int turn) {
        return userAbilityRecordRedisRepository.findAllByGameCodeAndTurn(gameCode, turn);
    }

    // 밤 능력 사용
    public Map<String, Long> useAbilityNight(String gameCode, int turn) {
        List<RoomUserJob> roomUsers = roomUserJobRedisRepository.findAllByGameCode(gameCode);
        List<UserAbilityRecord> userAbilityRecords = getUserAbilityRecordsByGameAndTurn(gameCode, turn);

        Map<String, Long> turnResult = new HashMap<>();

        // 군인 능력
        Long soldierSeq = jobRepository.findByName("Soldier").getJobSeq();
        for(RoomUserJob roomUser : roomUsers) {
            if(roomUser.getJobSeq().equals(soldierSeq)) {
                if(roomUser.isAlive()) {
                    log.info("SOLDIER_USER_SEQ : " + roomUser.getUserSeq());
                    userAbilityRecords.add(UserAbilityRecord.builder()
                            .gameCode(gameCode)
                            .userSeq(roomUser.getUserSeq())
                            .targetUserSeq(roomUser.getUserSeq())
                            .build());
                }
            }
        }


        // 능력 사용 순서 정하기
        List<JobInterface> jobAbility = new ArrayList<>();

        jobAbility.addAll(userAbilityRecords.stream()
                .map(this::matchJobNight)
                .filter(Objects::nonNull)
                .collect(Collectors.toList()));

        log.info(jobAbility.toString());
        log.info(jobAbility.size() + "");
        jobAbility.sort(Comparator.comparing(JobInterface::getWeight));

        // 능력 사용
        for(JobInterface jobInterface : jobAbility) {
            if(roomUserJobRedisRepository.findByGameCodeAndUserSeq(gameCode, jobInterface.getUserSeq()).isAlive()) {
                jobInterface.useAbility(turnResult);
            }
        }

        List<UserAbilityRecord> list = saveTurnResult(gameCode, turnResult, userAbilityRecords);

        log.info("=====================================");
        log.info("SUCCESS USE ABILITY, SAVE TURN RESULT");
        log.info("GAME_CODE : " + gameCode);
        log.info("TURN : " + turn);
        log.info("TURN_RESULT : " + turnResult);
        log.info("=====================================");

        return turnResult;
    }

    // 능력 매칭
    public JobInterface matchJobNight(UserAbilityRecord userAbilityRecord) {
        Long userSeq = userAbilityRecord.getUserSeq();
        String gameCode = userAbilityRecord.getGameCode();
        Long targetUserSeq = userAbilityRecord.getTargetUserSeq();
        LocalDateTime useTime = userAbilityRecord.getUsedAt();

        RoomUserJob roomUserJob = roomUserJobRedisRepository.findByGameCodeAndUserSeq(gameCode, userSeq);


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
        log.info("JOB_NAME: " + jobName);
        if (jobName.equals("Doctor")) {
            return Doctor.builder().userSeq(userSeq).targetUserSeq(targetUserSeq).build();
        } else if (jobName.equals("Police")) {
            return Police.builder().userSeq(userSeq).targetUserSeq(targetUserSeq).build();
        } else if (jobName.equals("Gangster")) {
            return Gangster.builder().userSeq(userSeq).targetUserSeq(targetUserSeq).build();
        } else if (jobName.equals("Soldier")) {
            return Soldier.builder().userSeq(userSeq).targetUserSeq(targetUserSeq).build();
        } else if (jobName.equals("Mafia")) {
            return Mafia.builder().userSeq(userSeq).targetUserSeq(targetUserSeq).useTime(useTime).build();
        }

        return null;
    }

    // 턴 결과 redis 에 업데이트
    public List<UserAbilityRecord> saveTurnResult(String gameCode, Map<String, Long> turnResult, List<UserAbilityRecord> userAbilityRecords) {
        Map<Long, RoomUserJob> userJobs = new HashMap<>();
        List<RoomUserJob> jobsToUpdate = new ArrayList<>();
        List<UserAbilityRecord> recordsToSave = new ArrayList<>();

        if(turnResult.containsKey("Soldier")) {
            Long userSeq = turnResult.get("Soldier");
            RoomUserJob userJob = roomUserJobRedisRepository.findByGameCodeAndUserSeq(gameCode, userSeq);
            if (turnResult.containsKey("Soldier")) {
                if(userJob.isUseAbility()) {
                    turnResult.remove("Soldier");
                    turnResult.put("kill", userSeq);
                }
            }
        }

        log.info(turnResult.toString());
        for (UserAbilityRecord userAbilityRecord : userAbilityRecords) {
            Long userSeq = userAbilityRecord.getUserSeq();

            RoomUserJob userJob = userJobs.computeIfAbsent(userSeq,
                    (userId) -> roomUserJobRedisRepository.findByGameCodeAndUserSeq(gameCode, userId));

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
                            Long targetUserSeq = turnResult.get("Police");
                            RoomUserJob targetUserJob = roomUserJobRedisRepository.findByGameCodeAndUserSeq(gameCode, targetUserSeq);
                            if(targetUserJob.getJobSeq().equals(mafiaSeq)) {
                                recordsToSave.add(userAbilityRecord.success());
                            }
                        }
                        break;
                    case "Gangster":
                        if (turnResult.containsKey("Gangster")) {
                            RoomUserJob roomUserJob = roomUserJobRedisRepository.findByGameCodeAndUserSeq(gameCode, turnResult.get("Gangster"));
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
                            jobsToUpdate.add(userJob.useAbility());
                            recordsToSave.add(userAbilityRecord.success());
                        }
                        break;
                    case "Mafia":
                        if (turnResult.containsKey("kill")) {
                            RoomUserJob roomUserJob = roomUserJobRedisRepository.findByGameCodeAndUserSeq(gameCode, turnResult.get("kill"));
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
            roomUserJobRedisRepository.saveAll(jobsToUpdate);
        }
        if (!recordsToSave.isEmpty()) {
            userAbilityRecordRedisRepository.saveAll(recordsToSave);
        }

        return userAbilityRecords;
    }



    public List<UserAbilityLog> checkGameOver(String gameCode) {
        List<UserAbilityLog> userAbilityLogs = null;

        List<RoomUserJob> roomUserJobs = roomUserJobRedisRepository.findAllByGameCode(gameCode);
        int citizenCount = 0;
        int mafiaCount = 0;
        for(RoomUserJob roomUserJob : roomUserJobs) {
            if(roomUserJob.isAlive()) {
                if(roomUserJob.getJobSeq().equals(mafiaSeq)) {
                    mafiaCount++;
                } else {
                    citizenCount++;
                }
            }
        }

        log.info("==================================");
        log.info("roomUserJobs: " + roomUserJobs.toString());
        log.info("citizenCount: " + citizenCount);
        log.info("mafiaCount: " + mafiaCount);
        log.info("==================================");

        if(mafiaCount == 0) {
            userAbilityLogs = saveUserAbilityRecord(gameCode, true);
        } else if(mafiaCount >= citizenCount) {
            userAbilityLogs = saveUserAbilityRecord(gameCode, false);
        }

        return userAbilityLogs;
    }

    public List<UserAbilityLog> saveUserAbilityRecord(String gameCode, boolean win) {  // win = true -> 시민 승리
        List<UserAbilityRecord> userAbilityRecords = userAbilityRecordRedisRepository.findAllByGameCode(gameCode);

        // 게임 종료 시간 저장
        Game game = gameRepository.findByGameCode(gameCode);
        game.endGame();

        Map<Long, UserAbilityLog> userAbilityLogs = new HashMap<>();
        Map<Long, RoomUserJob> userJobs = new HashMap<>();

        List<RoomUserJob> roomUserJobList = roomUserJobRedisRepository.findAllByGameCode(gameCode);
        for(RoomUserJob roomUser : roomUserJobList) {
            userAbilityLogs.put(roomUser.getUserSeq(), UserAbilityLog.builder()
                    .user(userRepository.findByUserSeq(roomUser.getUserSeq()))
                    .gameCode(gameCode)
                    .job(jobMap.get(roomUser.getJobSeq()))
                    .result(checkUserJobWin(roomUser.getJobSeq(), win))
                    .abilitySuccessCount(0)
                    .startAt(game.getStartAt())
                    .endAt(game.getEndAt())
                    .build());
        }

        for(UserAbilityRecord userAbilityRecord : userAbilityRecords) {
            Long userSeq = userAbilityRecord.getUserSeq();
            RoomUserJob roomUserJob = userJobs.computeIfAbsent(userSeq,
                    (userId) -> roomUserJobRedisRepository.findByGameCodeAndUserSeq(gameCode, userId));
            if (!userAbilityLogs.containsKey(userSeq)) {
                userAbilityLogs.put(userSeq, UserAbilityLog.builder()
                        .user(userRepository.findByUserSeq(userSeq))
                        .gameCode(gameCode)
                        .job(jobMap.get(roomUserJob.getJobSeq()))
                        .result(checkUserJobWin(roomUserJob.getJobSeq(), win))
                        .abilitySuccessCount(0)
                        .startAt(game.getStartAt())
                        .endAt(game.getEndAt())
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
        userAbilityTurnRecordRepository.saveAll(userAbilityRecords.stream()
                .map(userAbilityRecord -> UserAbilityTurnRecord.builder()
                        .gameCode(userAbilityRecord.getGameCode())
                        .userSeq(userAbilityRecord.getUserSeq())
                        .targetUserSeq(userAbilityRecord.getTargetUserSeq())
                        .success(userAbilityRecord.isSuccess())
                        .usedAt(userAbilityRecord.getUsedAt())
                        .build())
                .collect(Collectors.toList()));
        userAbilityRecordRedisRepository.deleteAllByGameCode(gameCode);

        voteTurnRecordRepository.saveAll(voteRedisRepository.findAllByGameCode(gameCode).stream()
                .map(vote -> VoteTurnRecord.builder()
                        .gameCode(vote.getGameCode())
                        .userSeq(vote.getUserSeq())
                        .targetUserSeq(vote.getTargetUserSeq())
                        .build())
                .collect(Collectors.toList()));
        voteRedisRepository.deleteAllByGameCode(gameCode);

        roomUserJobRedisRepository.deleteByGameCode(gameCode);

        log.info("=====================================");
        log.info("SUCCESS SAVE USER ABILITY LOG");
        log.info("GAME_CODE : " + gameCode);
        log.info("=====================================");

        return new ArrayList<>(userAbilityLogs.values());
    }

    public boolean checkUserJobWin(Long jobSeq, boolean win) {
        return win != (mafiaSeq.equals(jobSeq));
    }

//    // TODO : 추후 roomService로 이동 필요
//    public void addExcludeJobSeq(ExcludeJobDTO excludeJobDTO) {
//        String gameCode = excludeJobDTO.getGameCode();
//        Long excludeJobSeq = excludeJobDTO.getJobSeq();
//
//        roomJobSettingRedisRepository.addExcludeJobSeq(gameCode, excludeJobSeq);
//
//        log.info("=====================================");
//        log.info("SUCCESS ADD EXCLUDE JOB SEQ");
//        log.info("GAME_CODE : " + gameCode);
//        log.info("EXCLUDE_JOB_SEQ : " + excludeJobSeq);
//        log.info("=====================================");
//    }
//
//    // TODO : 추후 roomService로 이동 필요
//    public void removeExcludeJobSeq(ExcludeJobDTO excludeJobDTO) {
//        String gameCode = excludeJobDTO.getGameCode();
//        Long excludeJobSeq = excludeJobDTO.getJobSeq();
//
//        roomJobSettingRedisRepository.removeExcludeJobSeq(gameCode, excludeJobSeq);
//
//        log.info("=====================================");
//        log.info("SUCCESS REMOVE EXCLUDE JOB SEQ");
//        log.info("GAME_CODE : " + gameCode);
//        log.info("EXCLUDE_JOB_SEQ : " + excludeJobSeq);
//        log.info("=====================================");
//    }
}
