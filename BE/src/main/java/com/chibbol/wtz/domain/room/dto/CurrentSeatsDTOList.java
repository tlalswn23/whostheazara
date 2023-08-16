package com.chibbol.wtz.domain.room.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class CurrentSeatsDTOList {
    private List<CurrentSeatsDTO> curSeats;

    @Builder
    public CurrentSeatsDTOList(List<CurrentSeatsDTO> curSeats) {
        this.curSeats = curSeats;
    }
}
