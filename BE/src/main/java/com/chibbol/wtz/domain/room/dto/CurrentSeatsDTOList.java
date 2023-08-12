package com.chibbol.wtz.domain.room.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class CurrentSeatsDTOList {
    private List<CurrentSeatsDTO> curSeats;
}
