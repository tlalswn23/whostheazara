package com.chibbol.wtz.domain.vote.service;

import com.chibbol.wtz.domain.job.entity.RoomUserJob;
import com.chibbol.wtz.domain.job.repository.JobRepository;
import com.chibbol.wtz.domain.job.repository.RoomUserJobRedisRepository;
import com.chibbol.wtz.domain.vote.dto.VoteDTO;
import com.chibbol.wtz.domain.vote.entity.Vote;
import com.chibbol.wtz.domain.vote.repository.VoteRedisRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class VoteService {
    private final VoteRedisRepository voteRedisRepository;
    private final RoomUserJobRedisRepository roomUserJobRedisRepository;
    private final JobRepository jobRepository;

    public void vote(VoteDTO voteDTO) {
        // 투표 가능한 상태인지 확인 ( 살아있는지, 투표권한이 있는지 )
        boolean canVote = roomUserJobRedisRepository.canVote(voteDTO.getRoomSeq(), voteDTO.getUserSeq());
        if (!canVote) {
            log.info("====================================");
            log.info("VOTE FAIL (CAN'T VOTE)");
            log.info("ROOM: " + voteDTO.getRoomSeq());
            log.info("TURN: " + voteDTO.getTurn());
            log.info("VOTE USER: " + voteDTO.getUserSeq());
            log.info("====================================");
            return;
        }

        Vote vote = Vote.builder().roomSeq(voteDTO.getRoomSeq()).turn(voteDTO.getTurn()).userSeq(voteDTO.getUserSeq()).targetUserSeq(voteDTO.getTargetUserSeq()).build();
        voteRedisRepository.save(vote);

        log.info("====================================");
        log.info("VOTE SUCCESS");
        log.info("ROOM: " + voteDTO.getRoomSeq());
        log.info("TURN: " + voteDTO.getTurn());
        log.info("VOTE USER: " + voteDTO.getUserSeq());
        log.info("TARGET USER: " + voteDTO.getTargetUserSeq());
        log.info("====================================");
    }

    @Transactional
    public Long voteResult(Long roomSeq, Long turn) {
        List<Vote> votes = voteRedisRepository.findAllByRoomSeqAndTurn(roomSeq, turn);

        Long politicianSeq = jobRepository.findByName("Politician").getJobSeq();
        Long politician = null;

        List<RoomUserJob> roomUserJobs = roomUserJobRedisRepository.findAllByRoomSeq(roomSeq);
        Map<Long, Boolean> canVoteMap = new HashMap<>();
        for(RoomUserJob roomUserJob : roomUserJobs) {
            canVoteMap.put(roomUserJob.getUserSeq(), roomUserJob.isAlive() && roomUserJob.isCanVote());
            if(roomUserJob.getJobSeq().equals(politicianSeq)) {
                politician = roomUserJob.getUserSeq();
            }
        }

        // 투표 결과를 저장할 맵
        Map<Long, Integer> voteCountMap = new HashMap<>();
        for(Vote vote : votes) {
            if(!canVoteMap.get(vote.getUserSeq())) {
                continue;
            }

            Long targetUserSeq = vote.getTargetUserSeq();
            // 정치인은 2표 나머지는 1표씩 적용
            if(vote.getUserSeq().equals(politician)) {
                voteCountMap.put(targetUserSeq, voteCountMap.getOrDefault(targetUserSeq, 0) + 2);
            } else {
                voteCountMap.put(targetUserSeq, voteCountMap.getOrDefault(targetUserSeq, 0) + 1);
            }
        }

        // 가장 많이 투표된 targetUserSeq를 찾기 위해 맵을 순회
        Long mostVotedTargetUserSeq = null;
        int maxVotes = 0;
        for (Map.Entry<Long, Integer> entry : voteCountMap.entrySet()) {
            Long targetUserSeq = entry.getKey();
            int voteCount = entry.getValue();
            if (voteCount > maxVotes) {
                maxVotes = voteCount;
                mostVotedTargetUserSeq = targetUserSeq;
            } else if (voteCount == maxVotes) {
                // 최다 득표자가 2명 이상일 때 null을 반환
                mostVotedTargetUserSeq = null;
            }
        }

        //
        roomUserJobRedisRepository.updateCanVoteByRoomSeq(roomSeq, true);

        // 최다 득표자가 존재하면 사망 처리
        if(mostVotedTargetUserSeq != null) {
            RoomUserJob mostVotedTargetUser = roomUserJobRedisRepository.findByRoomSeqAndUserSeq(roomSeq, mostVotedTargetUserSeq);

            // 최다 득표자가 정치인이면 사망 X
            if(!mostVotedTargetUser.getJobSeq().equals(politicianSeq)) {
                mostVotedTargetUser.setAlive(false);
                mostVotedTargetUser.setCanVote(false);
                roomUserJobRedisRepository.save(mostVotedTargetUser);
            } else {
                log.info("====================================");
                log.info("MOST VOTED USER IS POLITICIAN");
                log.info("====================================");
            }

        }

        boolean gameOver = checkGameOver(roomSeq);

        log.info("====================================");
        log.info("VOTE RESULT");
        log.info("ROOM: " + roomSeq);
        log.info("TURN: " + turn);
        log.info("VOTE COUNT MAP: " + voteCountMap);
        log.info("MOST VOTED TARGET USER: " + mostVotedTargetUserSeq);
        log.info("GAME OVER: " + gameOver);
        log.info("====================================");

        return mostVotedTargetUserSeq;
    }

    public Map<Long, Integer> getRealTimeVoteResult(Long roomSeq, Long turn) {
        List<Vote> votes = voteRedisRepository.findAllByRoomSeqAndTurn(roomSeq, turn);

        Map<Long, Integer> voteCountMap = new HashMap<>();
        for (Vote vote : votes) {
            Long targetUserSeq = vote.getTargetUserSeq();
            voteCountMap.put(targetUserSeq, voteCountMap.getOrDefault(targetUserSeq, 0) + 1);
        }

        return voteCountMap;
    }


    public boolean checkGameOver(Long roomSeq) {
        Long mafiaSeq = jobRepository.findByName("Mafia").getJobSeq();

        int mafiaCount = roomUserJobRedisRepository.countByAliveUser(roomSeq, mafiaSeq, true);
        int citizenCount = roomUserJobRedisRepository.countByAliveUser(roomSeq, mafiaSeq, false);

        return mafiaCount >= citizenCount ? true : false;
    }
}
