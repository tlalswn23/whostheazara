package com.chibbol.wtz.domain.level.controller;

import com.chibbol.wtz.domain.job.entity.UserAbilityLog;
import com.chibbol.wtz.domain.level.service.UserLevelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/level")
@RequiredArgsConstructor
public class UserLevelController {
    private final UserLevelService userLevelService;

    @PatchMapping("/{gameCode}")
    public ResponseEntity<Void> updateUserLevel(@PathVariable String gameCode){
        List<UserAbilityLog> userAbilityLogs = null;
        userLevelService.updateExp(userAbilityLogs);
        return ResponseEntity.ok().build();
    }
}
