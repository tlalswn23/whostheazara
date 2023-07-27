package com.chibbol.wtz.domain.job.controlller;

import com.chibbol.wtz.domain.job.dto.JobDTO;
import com.chibbol.wtz.domain.job.dto.UserAbilityRecordDto;
import com.chibbol.wtz.domain.job.dto.UserJobListDTO;
import com.chibbol.wtz.domain.job.entity.Job;
import com.chibbol.wtz.domain.job.entity.UserAbilityRecord;
import com.chibbol.wtz.domain.job.entity.UserJob;
import com.chibbol.wtz.domain.job.repository.JobRepository;
import com.chibbol.wtz.domain.job.repository.UserJobRepository;
import com.chibbol.wtz.domain.job.service.JobService;
import com.chibbol.wtz.domain.job.repository.UserAbilityRecordRedisRepository;
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
    private final UserAbilityRecordRedisRepository userAbilityRecordRepository;
    @PostMapping("/make")
    public ResponseEntity<Void> makeJob(@RequestBody JobDTO jobDTO) {
        jobRepository.save(Job.builder()
                .name(jobDTO.getName())
                .description(jobDTO.getDescription())
                .build());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/randomJob/{roomSeq}")
    public ResponseEntity<Void> randomJobInRoomUser(@PathVariable Long roomSeq) {
        System.out.println("roomSeq = " + roomSeq);
        List<UserJob> list = jobService.randomJobInRoomUser(roomSeq);
        return ResponseEntity.ok().build();
    }

    // 테스트용
    @PostMapping("/ability")
    public ResponseEntity<Void> recordAbility(@RequestBody UserAbilityRecordDto userAbilityDto) {
        userAbilityRecordRepository.save(UserAbilityRecord.builder()
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
        List<UserAbilityRecord> list = jobService.useAbilityNight(roomSeq, turn);

        return ResponseEntity.ok(list);
    }


    // 테스트용
    @PostMapping("/set")
    public ResponseEntity<Void> setUserAbilityRecord() {

        userAbilityRecordRepository.save(UserAbilityRecord.builder().roomSeq((long)3).turn((long)1).userSeq((long)1).targetUserSeq((long)6).build());
        userAbilityRecordRepository.save(UserAbilityRecord.builder().roomSeq((long)3).turn((long)1).userSeq((long)2).targetUserSeq((long)3).build());
        userAbilityRecordRepository.save(UserAbilityRecord.builder().roomSeq((long)3).turn((long)1).userSeq((long)3).targetUserSeq((long)1).build());
        userAbilityRecordRepository.save(UserAbilityRecord.builder().roomSeq((long)3).turn((long)1).userSeq((long)4).targetUserSeq((long)1).build());
        userAbilityRecordRepository.save(UserAbilityRecord.builder().roomSeq((long)3).turn((long)1).userSeq((long)5).targetUserSeq((long)1).build());
        userAbilityRecordRepository.save(UserAbilityRecord.builder().roomSeq((long)3).turn((long)1).userSeq((long)6).targetUserSeq((long)1).build());

        return ResponseEntity.ok().build();
    }

    // 테스트옹
    @PatchMapping("/excludeJobSeq/{roomSeq}/{jobSeq}")
    public void addExcludeJobSeq(@PathVariable Long roomSeq, @PathVariable Long jobSeq) {
        jobService.addExcludeJobSeq(roomSeq, jobSeq);
    }

    @DeleteMapping("/excludeJobSeq/{roomSeq}/{jobSeq}")
    public void removeExcludeJobSeq(@PathVariable Long roomSeq, @PathVariable Long jobSeq) {
        jobService.removeExcludeJobSeq(roomSeq, jobSeq);
    }
}
