package com.chibbol.wtz.global.timer.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class GameResultDataDTO {
    @Getter
    @Setter
    @NoArgsConstructor
    public static class GameResult {
        private Long userSeq;
        private Long jobSeq;
        private boolean win;

        @Builder
        public GameResult(Long userSeq, Long jobSeq, boolean win) {
            this.userSeq = userSeq;
            this.jobSeq = jobSeq;
            this.win = win;
        }
    }

    private String roomCode;
    private boolean rabbitWin;
    private List<GameResult> userInfo;

    @Builder
    public GameResultDataDTO(String roomCode, boolean rabbitWin, List<GameResult> userInfo) {
        this.roomCode = roomCode;
        this.rabbitWin = rabbitWin;
        this.userInfo = userInfo;
    }
}
