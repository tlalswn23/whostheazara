package com.chibbol.wtz.domain.point.conroller;

import com.chibbol.wtz.domain.job.entity.UserAbilityLog;
import com.chibbol.wtz.domain.job.repository.UserAbilityLogRepository;
import com.chibbol.wtz.domain.point.dto.PointResultDTO;
import com.chibbol.wtz.domain.point.service.PointService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/point")
@RequiredArgsConstructor
public class PointController {
    private final PointService pointService;
    private final UserAbilityLogRepository userAbilityLogRepository;

    @PatchMapping("/{gameCode}")
    public ResponseEntity<Void> updatePoint(@PathVariable String gameCode){
        List<UserAbilityLog> userAbilityLogs = userAbilityLogRepository.findAllByGameCode(gameCode);
        List<PointResultDTO> list = pointService.updatePoint(userAbilityLogs);

        for(PointResultDTO temp: list){
            log.info(temp.getUserSeq()+" "+temp.getCurrentPoint() +" "+ temp.getPointValue());
        }
        return ResponseEntity.ok().build();
    }
}
