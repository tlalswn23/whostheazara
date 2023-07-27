package com.chibbol.wtz.domain.vote.service;

import com.chibbol.wtz.domain.vote.dto.VoteDTO;
import com.chibbol.wtz.domain.vote.entity.Vote;
import com.chibbol.wtz.domain.vote.repository.VoteRedisRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class VoteService {
    private final VoteRedisRepository voteRedisRepository;

    public void vote(VoteDTO voteDTO) {
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

    public Long voteResult(Long roomSeq, Long turn) {
        Map<Long, Long> votes = voteRedisRepository.findAllByRoomSeqAndTurn(roomSeq, turn);

        // 투표 결과를 저장할 맵
        Map<Long, Integer> voteCountMap = new HashMap<>();
        for (Object targetUserSeq : votes.values()) {
            Long targetUserSeqLong;
            if (targetUserSeq instanceof Integer) {
                targetUserSeqLong = ((Integer) targetUserSeq).longValue();
            } else {
                targetUserSeqLong = (Long) targetUserSeq;
            }
            voteCountMap.put(targetUserSeqLong, voteCountMap.getOrDefault(targetUserSeqLong, 0) + 1);
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
                // 최다 득표자가 2명 이상일 때 null을 반환하도록 수정
                mostVotedTargetUserSeq = null;
            }
        }

        log.info("====================================");
        log.info("VOTE RESULT");
        log.info("ROOM: " + roomSeq);
        log.info("TURN: " + turn);
        log.info("MOST VOTED TARGET USER: " + mostVotedTargetUserSeq);
        log.info("====================================");

        return mostVotedTargetUserSeq;
    }
}
