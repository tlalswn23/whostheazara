package com.chibbol.wtz.domain.room.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InitialRoomSettingDTO {
    private String title;
    private Long ownerSeq;
    private Map<Long, Boolean> jobSetting;
    private CurrentSeatsDTO currentSeatsDTO;
}
