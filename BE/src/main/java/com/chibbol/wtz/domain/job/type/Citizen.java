package com.chibbol.wtz.domain.job.type;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Citizen implements JobInterface{

    @Value("${job.citizen.weight}")
    private int weight;
    private long userSeq;
    @Override
    public Map<String, Long> useAbility(Map<String, Long> turnResult) {
        return null;
    }

    @Override
    public int compareTo(JobInterface o) {
        return Integer.compare(this.weight, o.weight);
    }
}
