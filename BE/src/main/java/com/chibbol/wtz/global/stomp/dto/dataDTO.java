package com.chibbol.wtz.global.stomp.dto;

import lombok.*;

import java.util.Map;

@Getter
@ToString
@NoArgsConstructor
public class dataDTO {
    String type;
    Long roomSeq;
    Object data;

    @Builder
    public dataDTO(String type, Long roomSeq, Object data){
        this.type = type;
        this.roomSeq = roomSeq;
        this.data = data;
    }

}
