package com.chibbol.wtz.domain.level.controller;

import com.chibbol.wtz.domain.job.repository.UserAbilityLogRepository;
import com.chibbol.wtz.domain.level.service.UserLevelService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/v1/level")
@RequiredArgsConstructor
public class UserLevelController {
    private final UserLevelService userLevelService;
    private final UserAbilityLogRepository userAbilityLogRepository;

//    @PatchMapping("/{gameCode}")
//    public ResponseEntity<Void> updateUserLevel(@PathVariable String gameCode){
//        List<UserAbilityLog> userAbilityLogs = userAbilityLogRepository.findAllByGameCode(gameCode);
//        List<LevelResultDTO> list = userLevelService.updateExp(userAbilityLogs);
//
//        for(LevelResultDTO temp : list){
//            log.info(temp.getUserSeq()+" "+temp.getLevel()+" "+temp.getCurrentExp()+" "+temp.getMaxExp()+" "+temp.getExpValue());
//        }
//
//        return ResponseEntity.ok().build();
//    }
}
