package com.chibbol.wtz.domain.job.controlller;

import com.chibbol.wtz.domain.job.dto.JobDTO;
import com.chibbol.wtz.domain.job.dto.UserAbilityDto;
import com.chibbol.wtz.domain.job.dto.UserJobListDTO;
import com.chibbol.wtz.domain.job.entity.Job;
import com.chibbol.wtz.domain.job.entity.UserAbilityRecord;
import com.chibbol.wtz.domain.job.entity.UserJob;
import com.chibbol.wtz.domain.job.repository.JobRepository;
import com.chibbol.wtz.domain.job.repository.UserJobRepository;
import com.chibbol.wtz.domain.job.service.JobService;
import com.chibbol.wtz.global.redis.repository.UserAbilityRecordRedisRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/job")
@RequiredArgsConstructor
public class JobController {

    private final JobRepository jobRepository;
    private final UserJobRepository userJobRepository;
    private final JobService jobService;
    private UserAbilityRecordRedisRepository userAbilityRecordRedisRepository = new UserAbilityRecordRedisRepository();
    @PostMapping("/make")
    public ResponseEntity<Void> makeJob(@RequestBody JobDTO jobDTO) {
        jobRepository.save(Job.builder()
                .name(jobDTO.getName())
                .description(jobDTO.getDescription())
                .build());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/ability")
    public ResponseEntity<Void> recordAbility(@RequestBody UserAbilityDto userAbilityDto) {
        userAbilityRecordRedisRepository.save(UserAbilityRecord.builder()
                .roomSeq(userAbilityDto.getRoomSeq())
                .turn(userAbilityDto.getTurn())
                .userSeq(userAbilityDto.getUserSeq())
                .targetUserSeq(userAbilityDto.getTargetUserSeq())
                .build());

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{roomSeq}")
    public ResponseEntity<List<UserJobListDTO>> getAbility(@PathVariable Long roomSeq) {
        List<UserJob> list = userJobRepository.findAllByRoomRoomSeq(roomSeq);
        List<UserJobListDTO> jobList = list.stream()
                .map(userJob -> new UserJobListDTO().toUserJobListDTO(userJob))
                .collect(Collectors.toList());
        return ResponseEntity.ok(jobList);
    }

    @GetMapping("/result/{roomSeq}/{turn}")
    public ResponseEntity<List<UserAbilityRecord>> getAbilityResult(@PathVariable Long roomSeq, @PathVariable Long turn) {
        setUserAbilityRecord();
        System.out.println("roomSeq = " + roomSeq + ", turn = " + turn);

        List<UserAbilityRecord> list = jobService.useAbilityNight(roomSeq, turn, userAbilityRecordRedisRepository);

        return ResponseEntity.ok(list);
    }

    @PostMapping("/set")
    public ResponseEntity<Void> setUserAbilityRecord() {
        UserAbilityRecord userAbilityRecordd = UserAbilityRecord.builder().roomSeq((long)1).turn((long)1).userSeq((long)1).targetUserSeq((long)5).build();

        System.out.println(userAbilityRecordd.toString());

        userAbilityRecordRedisRepository.save(UserAbilityRecord.builder().roomSeq((long)1).turn((long)1).userSeq((long)1).targetUserSeq((long)5).build());
        userAbilityRecordRedisRepository.save(UserAbilityRecord.builder().roomSeq((long)1).turn((long)1).userSeq((long)2).targetUserSeq((long)3).build());
        userAbilityRecordRedisRepository.save(UserAbilityRecord.builder().roomSeq((long)1).turn((long)1).userSeq((long)3).targetUserSeq((long)1).build());
        userAbilityRecordRedisRepository.save(UserAbilityRecord.builder().roomSeq((long)1).turn((long)1).userSeq((long)4).targetUserSeq((long)1).build());
        userAbilityRecordRedisRepository.save(UserAbilityRecord.builder().roomSeq((long)1).turn((long)1).userSeq((long)5).targetUserSeq((long)1).build());
        userAbilityRecordRedisRepository.save(UserAbilityRecord.builder().roomSeq((long)1).turn((long)1).userSeq((long)6).targetUserSeq((long)1).build());

        List<UserAbilityRecord> list = userAbilityRecordRedisRepository.findAllByRoomSeqAndTurn((long)1, (long)1);
//        for(UserAbilityRecord userAbilityRecord : list) {
//            System.out.println(userAbilityRecord.toString());
//        }

        return ResponseEntity.ok().build();


    }
}
