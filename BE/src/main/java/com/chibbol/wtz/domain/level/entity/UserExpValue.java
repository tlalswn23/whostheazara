package com.chibbol.wtz.domain.level.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserExpValue {
    private Long lastExp;
    private Long currentExp;
    private int lastLevel;
    private int currentLevel;

    @Builder
    public UserExpValue(Long lastExp, Long currentExp, int lastLevel, int currentLevel) {
        this.lastExp = lastExp;
        this.currentExp = currentExp;
        this.lastLevel = lastLevel;
        this.currentLevel = currentLevel;
    }
}
