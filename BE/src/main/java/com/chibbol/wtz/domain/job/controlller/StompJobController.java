package com.chibbol.wtz.domain.job.controlller;

import com.chibbol.wtz.domain.job.dto.UserAbilityRecordDTO;
import com.chibbol.wtz.domain.job.entity.RoomUserJob;
import com.chibbol.wtz.domain.job.entity.UserAbilityRecord;
import com.chibbol.wtz.domain.job.repository.UserAbilityRecordRedisRepository;
import com.chibbol.wtz.domain.job.service.JobService;
import com.chibbol.wtz.domain.job.service.RedisJobPublisher;
import com.chibbol.wtz.domain.job.service.StompJobService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
public class StompJobController {
    private final JobService jobService;
    private final UserAbilityRecordRedisRepository userAbilityRecordRepository;
    private final RedisJobPublisher redisJobPublisher;
    private final StompJobService stompJobService;

    @Operation(summary = "게임 시작할때 roomSeq방에 참여한 인원들에게 랜덤으로 직업 부여")
    @MessageMapping("/job/randomJob/{roomSeq}")
    public void randomJobInRoomUser(@DestinationVariable Long roomSeq) {
        List<RoomUserJob> list = jobService.randomJobInRoomUser(roomSeq);
        String topicRoomSeq = String.valueOf(roomSeq);
        stompJobService.addJobTopic(topicRoomSeq);
        redisJobPublisher.publish(stompJobService.getTopic(topicRoomSeq), list);
    }

    // 얘는 됨
    @Operation(summary = "능력 사용 정보")
    @MessageMapping("/job/ability")
    public void recordAbility(UserAbilityRecordDTO userAbilityDto) {
        userAbilityRecordRepository.save(UserAbilityRecord.builder()
                .roomSeq(userAbilityDto.getRoomSeq())
                .turn(userAbilityDto.getTurn())
                .userSeq(userAbilityDto.getUserSeq())
                .targetUserSeq(userAbilityDto.getTargetUserSeq())
                .build());
    }

    // 유저 직업 정보가 없움
    @Operation(summary = "밤이 끝났을때 해당 턴에 사용한 능력들의 결과")
    @MessageMapping("/job/result/{roomSeq}/{turn}")
    public void getAbilityResult(@DestinationVariable Long roomSeq, @DestinationVariable Long turn) {
        log.info("요청");
        List<UserAbilityRecord> list = jobService.useAbilityNight(roomSeq, turn); // 데이터 들어있음
        log.info("로직처리");
        String topic = roomSeq+"/"+turn;
        stompJobService.addJobTopic(topic);
        redisJobPublisher.publish(stompJobService.getTopic(topic), list);
    }
}
