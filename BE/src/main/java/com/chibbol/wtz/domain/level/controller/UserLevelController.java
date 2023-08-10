package com.chibbol.wtz.domain.level.controller;

import com.chibbol.wtz.domain.job.entity.UserAbilityLog;
import com.chibbol.wtz.domain.job.repository.UserAbilityLogRepository;
import com.chibbol.wtz.domain.level.config.WeightProperties;
import com.chibbol.wtz.domain.level.dto.LevelResultDTO;
import com.chibbol.wtz.domain.level.service.UserLevelService;
import com.chibbol.wtz.domain.level.service.WeightMappingService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/v1/level")
@RequiredArgsConstructor
public class UserLevelController {
    private final UserLevelService userLevelService;
    private final UserAbilityLogRepository userAbilityLogRepository;
    private final WeightMappingService weightMappingService;
    private final WeightProperties weightProperties;

    @PatchMapping("/{gameCode}")
    public ResponseEntity<Void> updateUserLevel(@PathVariable String gameCode){
        List<UserAbilityLog> userAbilityLogs = userAbilityLogRepository.findAllByGameCode(gameCode);
        List<LevelResultDTO> list = userLevelService.updateExp(userAbilityLogs);

        for(LevelResultDTO temp : list){
            log.info(temp.getUserSeq()+" "+temp.getLevel()+" "+temp.getCurrentExp()+" "+temp.getMaxExp()+" "+temp.getExpValue());
        }

        return ResponseEntity.ok().build();
    }

    @GetMapping("/weight")
    public ResponseEntity<Void> getWeightList(){
        Map<Integer, Double> map = weightMappingService.getJobWeightMap();

        for(Map.Entry<Integer, Double> entry: map.entrySet()){
            log.info(entry.getKey()+" "+entry.getValue());
        }

        log.info(String.valueOf(map.size()));

        log.info(weightProperties.toString());

        return ResponseEntity.ok().build();
    }
}
