package com.chibbol.wtz.domain.vote.controller;

import com.chibbol.wtz.domain.vote.dto.VoteDTO;
import com.chibbol.wtz.domain.vote.service.VoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/vote")
@RequiredArgsConstructor
public class VoteController {
    private final VoteService voteService;

    @PostMapping("/")
    public void vote(@RequestBody VoteDTO voteDTO) {
        voteService.vote(voteDTO);
    }

    @GetMapping("/")
    public ResponseEntity<Long> voteResult(@RequestParam Long roomSeq, @RequestParam Long turn) {
        Long result = voteService.voteResult(roomSeq, turn);
        return ResponseEntity.ok(result);
    }
}
