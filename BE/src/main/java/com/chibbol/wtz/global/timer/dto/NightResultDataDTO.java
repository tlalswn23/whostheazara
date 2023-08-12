package com.chibbol.wtz.global.timer.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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
        private Boolean result;

        @Builder
        public NightResult(Long userSeq, Boolean result) {
            this.userSeq = userSeq;
            this.result = result;
        }
    }

    private Long userSeq;
    private List<NightResult> ability;

    @Builder
    public NightResultDataDTO(Long userSeq) {
        this.userSeq = userSeq;
        this.ability = new ArrayList<>();
    }

    public void addAbility(Long userSeq, Boolean result) {
        for(NightResult nightResult : this.ability) {
            if(nightResult.getUserSeq().equals(userSeq)) {
                nightResult.setResult(result);
                return;
            }
        }

        this.ability.add(NightResult.builder().userSeq(userSeq).result(result).build());
    }
}
