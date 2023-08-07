package com.chibbol.wtz.domain.room.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CurrentSeatsDTO {

    class data {
        int order;
        long userSeq;
        String nickname;
        int state;
    }
    private String type = "CUR_SEATS";
    private List<data> data;
}
