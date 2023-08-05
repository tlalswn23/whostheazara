package com.chibbol.wtz.domain.job.controlller;

import com.chibbol.wtz.domain.job.dto.TargetUserDTO;
import com.chibbol.wtz.domain.job.entity.UserAbilityRecord;
import com.chibbol.wtz.domain.job.repository.UserAbilityRecordRedisRepository;
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
