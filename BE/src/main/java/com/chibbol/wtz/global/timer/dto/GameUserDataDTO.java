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
public class GameUserDataDTO {
    private Long userSeq;
    private Long jobSeq;
    private String nickname;
    private Map<String, byte[]> equippedItems;

    @Builder
    public GameUserDataDTO(Long userSeq, Long jobSeq, String nickname) {
        this.userSeq = userSeq;
        this.jobSeq = jobSeq;
        this.nickname = nickname;
        this.equippedItems = new HashMap<>();

        equippedItems.put("face", "".getBytes());
        equippedItems.put("cap", "".getBytes());
        equippedItems.put("clothing", "".getBytes());
    }
}
