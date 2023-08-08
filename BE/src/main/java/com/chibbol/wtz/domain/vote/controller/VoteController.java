package com.chibbol.wtz.domain.vote.controller;

import com.chibbol.wtz.domain.vote.dto.VoteDTO;
import com.chibbol.wtz.domain.vote.service.VoteService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/vote")
@RequiredArgsConstructor
public class VoteController {
    private final VoteService voteService;

    @Operation(summary = "투표하기")
    @PostMapping("/")
    public void vote(@RequestBody VoteDTO voteDTO) {
        voteService.vote(voteDTO);
    }

    @Operation(summary = "투표 결과")
    @GetMapping("/")
    public ResponseEntity<Long> voteResult(@RequestParam String roomCode, @RequestParam int turn) {
        Long result = voteService.voteResult(roomCode, turn);
        return ResponseEntity.ok(result);
    }
}
