package com.chibbol.wtz.domain.room.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoomInfoDTO {
    private String type = "ROOM_INFO";
    private String title;
    private long ownerSeq;
    private Object jobSetting;
    private Object curSeats;
    private int maxUserNum;
    private boolean isStart;
}
