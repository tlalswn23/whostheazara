package com.chibbol.wtz.domain.job.dto;

import com.chibbol.wtz.domain.job.entity.RoomUserJob;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserJobListDTO {
    private Long roomSeq;
    private Long userSeq;
    private boolean isAlive;

    public UserJobListDTO toUserJobListDTO(RoomUserJob roomUserJob) {
        this.roomSeq = roomUserJob.getRoomSeq();
        this.userSeq = roomUserJob.getUserSeq();
        this.isAlive = roomUserJob.isAlive();

        return this;
    }
}
