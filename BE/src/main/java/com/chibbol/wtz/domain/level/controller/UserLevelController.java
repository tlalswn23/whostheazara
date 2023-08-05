package com.chibbol.wtz.domain.level.controller;

import com.chibbol.wtz.domain.level.service.UserLevelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/level")
@RequiredArgsConstructor
public class UserLevelController {
    private final UserLevelService userLevelService;

    @PatchMapping("/{roomSeq}")
    public ResponseEntity<Void> updateUserLevel(@PathVariable Long roomSeq){
        userLevelService.getExp(roomSeq);
        return ResponseEntity.ok().build();
    }
}
