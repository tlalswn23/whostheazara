package com.chibbol.wtz.global.stomp.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class DataDTO {
    private String type;
    private String roomCode;
    Object data;

    @Builder
    public DataDTO(String type, String roomCode, Object data){
        this.type = type;
        this.roomCode = roomCode;
        this.data = data;
    }

}
