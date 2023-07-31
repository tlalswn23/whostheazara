package com.chibbol.wtz.domain.job.type;

import lombok.*;
import org.springframework.beans.factory.annotation.Value;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Mafia implements JobInterface {

    @Value("${job.mafia.weight}")
    private int weight;
    private long userSeq;
    private long targetUserSeq;
    @Override
    public Map<String, Long> useAbility(Map<String, Long> turnResult) {
        turnResult.put("kill", targetUserSeq);
        turnResult.put("mafia", userSeq);
        return null;
    }

    @Override
    public int compareTo(JobInterface o) {
        return Integer.compare(this.weight, o.weight);
    }

    @Builder
    public Mafia(long userSeq, long targetUserSeq) {
        this.userSeq = userSeq;
        this.targetUserSeq = targetUserSeq;
    }
}
