package com.chibbol.wtz.domain.room.dto;

import lombok.*;

import java.util.List;
import java.util.Map;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoomSettingDTO {
    private String title;
    private Long ownerSeq;
    private Map<Long, Boolean> jobSetting;
    private List<CurrentSeatsDTO> curSeats;
    private String message;
}
