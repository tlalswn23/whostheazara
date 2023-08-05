package com.chibbol.wtz.global.stomp.dto;

import lombok.*;

import java.util.Map;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class dataDTO {
    String type;
    Long roomSeq;
    Map<Long, Integer> realTimeVoteResult;

    @Builder
    public dataDTO(String type, Long roomSeq, Map<Long, Integer> realTimeVoteResult){
        this.type = type;
        this.roomSeq = roomSeq;
        this.realTimeVoteResult = realTimeVoteResult;
    }


}
