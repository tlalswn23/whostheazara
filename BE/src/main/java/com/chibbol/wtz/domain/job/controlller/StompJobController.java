package com.chibbol.wtz.domain.job.controlller;

<<<<<<< HEAD
import com.chibbol.wtz.domain.job.dto.TargetUserDTO;
import com.chibbol.wtz.domain.job.entity.UserAbilityRecord;
import com.chibbol.wtz.domain.job.repository.UserAbilityRecordRedisRepository;
=======
import com.chibbol.wtz.domain.job.dto.UserAbilityRecordDTO;
import com.chibbol.wtz.domain.job.entity.RoomUserJob;
import com.chibbol.wtz.domain.job.entity.UserAbilityRecord;
import com.chibbol.wtz.domain.job.repository.UserAbilityRecordRedisRepository;
import com.chibbol.wtz.domain.job.service.JobService;
import com.chibbol.wtz.domain.job.service.RedisJobPublisher;
import com.chibbol.wtz.domain.job.service.StompJobService;
>>>>>>> 83a5752e34a64840388b6df0b76eaee05f7d139e
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

<<<<<<< HEAD
=======
import java.util.List;
>>>>>>> 83a5752e34a64840388b6df0b76eaee05f7d139e

@Slf4j
@Controller
@RequiredArgsConstructor
public class StompJobController {
    private final UserAbilityRecordRedisRepository userAbilityRecordRepository;

<<<<<<< HEAD
=======
    @Operation(summary = "게임 시작할때 roomSeq방에 참여한 인원들에게 랜덤으로 직업 부여")
    @MessageMapping("/job/randomJob/{roomSeq}")
    public void randomJobInRoomUser(@DestinationVariable Long roomSeq) {
        List<RoomUserJob> list = jobService.randomJobInRoomUser(roomSeq);
        String topicRoomSeq = String.valueOf(roomSeq);
        stompJobService.addJobTopic(topicRoomSeq);
        redisJobPublisher.publish(stompJobService.getTopic(topicRoomSeq), list);
    }

    // 얘는 됨
>>>>>>> 83a5752e34a64840388b6df0b76eaee05f7d139e
    @Operation(summary = "능력 사용 정보")
    @MessageMapping("/{roomSeq}/ability")
    public void recordAbility(@DestinationVariable Long roomSeq, TargetUserDTO targetUserDTO) {
        userAbilityRecordRepository.save(UserAbilityRecord.builder()
                .roomSeq(roomSeq)
                .turn(targetUserDTO.getTurn())
                .userSeq(targetUserDTO.getUserSeq())
                .targetUserSeq(targetUserDTO.getTargetUserSeq())
                .build());
    }
}
