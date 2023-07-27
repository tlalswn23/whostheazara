package com.chibbol.wtz.domain.vote.controller;

import com.chibbol.wtz.domain.vote.service.VoteService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/vote")
public class VoteController {
    private VoteService voteService;


    // TODO: userSeq 임시
    @PostMapping("/{roomSeq}/{targetUserSeq}/{userSeq}")
    public void vote(@PathVariable Long roomSeq, @PathVariable Long targetUserSeq, @PathVariable Long userSeq) {
        voteService.vote(roomSeq, targetUserSeq, userSeq);
    }
}
