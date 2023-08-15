package com.chibbol.wtz.domain.point.conroller;

import com.chibbol.wtz.domain.job.entity.UserAbilityLog;
import com.chibbol.wtz.domain.job.repository.UserAbilityLogRepository;
import com.chibbol.wtz.domain.point.dto.PointResultDTO;
import com.chibbol.wtz.domain.point.entity.UserPointValue;
import com.chibbol.wtz.domain.point.repository.UserPointValueRedisRepository;
import com.chibbol.wtz.domain.point.service.PointService;
import com.chibbol.wtz.domain.user.entity.User;
import com.chibbol.wtz.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/point")
@RequiredArgsConstructor
public class PointController {
    private final PointService pointService;
    private final UserService userService;

    private final UserAbilityLogRepository userAbilityLogRepository;
    private final UserPointValueRedisRepository userPointValueRedisRepository;

    @PatchMapping("/{gameCode}")
    public ResponseEntity<Void> updatePoint(@PathVariable String gameCode){
        List<UserAbilityLog> userAbilityLogs = userAbilityLogRepository.findAllByGameCode(gameCode);
        List<PointResultDTO> list = pointService.updatePoint(userAbilityLogs);

        for(PointResultDTO temp: list){
            log.info(temp.getUserSeq()+" "+temp.getCurrentPoint() +" "+ temp.getPointValue());
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{gameCode}")
    public ResponseEntity<UserPointValue> getPointValueInGameCode(@PathVariable String gameCode) {
        User user = userService.getLoginUser();
        UserPointValue userPointValue = userPointValueRedisRepository.findByUserSeq(gameCode, user.getUserSeq());

        return ResponseEntity.ok(userPointValue);
    }
}
