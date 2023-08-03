package com.chibbol.wtz.domain.chat.dto;

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
    private Map<String, Boolean> jobSetting;
}
