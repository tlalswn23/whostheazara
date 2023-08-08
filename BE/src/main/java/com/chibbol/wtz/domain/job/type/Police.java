package com.chibbol.wtz.domain.job.type;

import lombok.*;
import org.springframework.beans.factory.annotation.Value;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Police implements JobInterface {

    @Value("${job.police.weight}")
    private int weight;
    private long userSeq;
    private long targetUserSeq;
    @Override
    public Map<String, Long> useAbility(Map<String, Long> turnResult) {
        if(turnResult.containsKey("mafia")) {
            if(turnResult.get("mafia").equals(targetUserSeq)) {
                turnResult.remove("mafia");
                System.out.println("Police find mafia");
                turnResult.put("Police", null);
            }
        }
        return null;
    }

    @Override
    public int compareTo(JobInterface o) {
        return Integer.compare(this.weight, o.weight);
    }

    @Builder
    public Police(long userSeq, long targetUserSeq) {
        this.userSeq = userSeq;
        this.targetUserSeq = targetUserSeq;
    }
}
