package com.chibbol.wtz.domain.job.type;

import lombok.*;
import org.springframework.beans.factory.annotation.Value;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Doctor implements JobInterface {

    @Value("${job.doctor.weight}")
    private int weight;
    private long userSeq;
    private long targetUserSeq;

    @Override
    public Map<String, Long> useAbility(Map<String, Long> turnResult) {
        if(turnResult.containsKey("kill")) {
            if(turnResult.get("kill") == targetUserSeq) {
                turnResult.remove("kill");
                System.out.println("Doctor save rabbit");
                turnResult.put("Doctor", null);
            }
        }
        return null;
    }

    @Override
    public int compareTo(JobInterface o) {
        return Integer.compare(this.weight, o.weight);
    }

    @Builder
    public Doctor(long userSeq, long targetUserSeq) {
        this.userSeq = userSeq;
        this.targetUserSeq = targetUserSeq;
    }
}
