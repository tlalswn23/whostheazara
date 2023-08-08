package com.chibbol.wtz.domain.room.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CurrentSeatsDTO {
    private int roomSeq;
    private int order;
    private long userSeq;
    private String nickname;
    private int state;
}
