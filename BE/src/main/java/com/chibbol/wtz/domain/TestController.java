package com.chibbol.wtz.domain;

import com.chibbol.wtz.domain.job.entity.UserAbilityRecord;
import com.chibbol.wtz.domain.job.repository.UserAbilityRecordRedisRepository;
import com.chibbol.wtz.domain.vote.entity.Vote;
import com.chibbol.wtz.domain.vote.repository.VoteRedisRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/test")
public class TestController {

    private final VoteRedisRepository voteRedisRepository;
    private final UserAbilityRecordRedisRepository userAbilityRecordRedisRepository;

    @PostMapping("/test")
    public ResponseEntity<Void> test(@RequestBody Long roomSeq) {

        for (Long turn = 1L; turn <= 10L; turn++) {
            for (Long i = 1L; i <= 8L; i++) {
                int target = ((int)(Math.random() * 8)) + 1;
                Long targetL = (long) target;
                voteRedisRepository.save(Vote.builder().roomSeq(roomSeq).turn(turn).userSeq(i).targetUserSeq(targetL).build());
            }
        }

        for (Long turn = 1L; turn <= 10L; turn++) {
            for (Long i = 1L; i <= 8L; i++) {
                int target = ((int)(Math.random() * 8)) + 1;
                Long targetL = (long) target;
                userAbilityRecordRedisRepository.save(UserAbilityRecord.builder().roomSeq(roomSeq).turn(turn).userSeq(i).targetUserSeq(targetL).build());
            }
        }


        return ResponseEntity.ok().build();
    }

}
