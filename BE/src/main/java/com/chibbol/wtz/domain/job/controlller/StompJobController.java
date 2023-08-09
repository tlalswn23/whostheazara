package com.chibbol.wtz.domain.job.controlller;

import com.chibbol.wtz.domain.job.dto.TargetUserDTO;
import com.chibbol.wtz.domain.job.entity.RoomUserJob;
import com.chibbol.wtz.domain.job.entity.UserAbilityRecord;
import com.chibbol.wtz.domain.job.repository.RoomUserJobRedisRepository;
import com.chibbol.wtz.domain.job.repository.UserAbilityRecordRedisRepository;
import com.chibbol.wtz.global.stomp.service.StompService;
import com.chibbol.wtz.global.stomp.dto.DataDTO;
import com.chibbol.wtz.global.stomp.service.RedisPublisherAll;
import com.chibbol.wtz.global.timer.service.NewTimerService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;


@Slf4j
@Controller
@RequiredArgsConstructor
public class StompJobController {
    private final UserAbilityRecordRedisRepository userAbilityRecordRepository;
    private final RedisPublisherAll publisher;
    private final StompService stompService;
    private final NewTimerService newTimerService;
    private final RoomUserJobRedisRepository roomUserJobRedisRepository;

    @Operation(summary = "능력 사용 정보")
    @MessageMapping("/game/{gameCode}/ability")
    public void recordAbility(@DestinationVariable String gameCode, TargetUserDTO targetUserDTO) {
        stompService.addTopic(gameCode);

        // 능력 사용 저장
        userAbilityRecordRepository.save(UserAbilityRecord.builder()
                .gameCode(gameCode)
                .turn(newTimerService.getTimerInfo(gameCode).getTurn())
                .userSeq(targetUserDTO.getUserSeq())
                .targetUserSeq(targetUserDTO.getTargetUserSeq())
                .build());

        // 자라이면 targetUserSeq 전송
        RoomUserJob userJob = roomUserJobRedisRepository.findByGameCodeAndUserSeq(gameCode, targetUserDTO.getUserSeq());
            if(userJob.getJobSeq() == 2){ // 자라 jobSeq == 2
                publisher.publish(stompService.getTopic(gameCode),
                        DataDTO.builder()
                                .type("ABILITY")
                                .gameCode(gameCode)
                                .data(targetUserDTO.getTargetUserSeq())
                                .build());
            }
    }
}
