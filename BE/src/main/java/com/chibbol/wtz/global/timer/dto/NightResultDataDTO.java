package com.chibbol.wtz.global.timer.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
public class NightResultDataDTO {
    @Getter
    @Setter
    @NoArgsConstructor
    private static class NightResult {
        private Long userSeq;
        private String result;

        @Builder
        public NightResult(Long userSeq, String result) {
            this.userSeq = userSeq;
            this.result = result;
        }
    }

    private Long userSeq;
    private Map<Long, Boolean> ability;

    @Builder
    public NightResultDataDTO(Long userSeq) {
        this.userSeq = userSeq;
        this.ability = new HashMap<>();
    }

    public void addAbility(Long userSeq, Boolean result) {
        this.ability.put(userSeq, result);
    }
}
