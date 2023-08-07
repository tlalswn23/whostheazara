package com.chibbol.wtz.domain.room.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CurrentSeatsDTO {
    private int roomSeq;
    private int order;
    private long userSeq;
    private String nickname;
    private int state;
}
