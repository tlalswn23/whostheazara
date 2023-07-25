package com.chibbol.wtz.domain.job.dto;

import com.chibbol.wtz.domain.job.entity.UserJob;
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
    private String jobName;
    private boolean isAlive;

    public UserJobListDTO toUserJobListDTO(UserJob userJob) {
        this.roomSeq = userJob.getRoom().getRoomSeq();
        this.userSeq = userJob.getUser().getUserSeq();
        this.jobName = userJob.getJob().getName();
        this.isAlive = userJob.isAlive();

        return this;
    }
}
