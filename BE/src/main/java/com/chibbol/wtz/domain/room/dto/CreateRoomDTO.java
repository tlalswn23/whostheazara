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
public class CreateRoomDTO {
    private String title;
    private String code;
    private Map<Integer, Boolean> jobSetting; // size : 5
}
