package com.chibbol.wtz.global.stomp.dto;

import lombok.*;

@Getter
@ToString
@NoArgsConstructor
public class DataDTO {
    String type;
    Long roomSeq;
    Object data;

    @Builder
    public DataDTO(String type, Long roomSeq, Object data){
        this.type = type;
        this.roomSeq = roomSeq;
        this.data = data;
    }

}
