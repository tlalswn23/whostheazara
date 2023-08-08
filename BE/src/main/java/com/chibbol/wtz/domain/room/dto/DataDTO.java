package com.chibbol.wtz.domain.room.dto;

import lombok.*;

@ToString
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DataDTO {
    private String type;
    private String roomCode;
    private Object objectDTO;
}
