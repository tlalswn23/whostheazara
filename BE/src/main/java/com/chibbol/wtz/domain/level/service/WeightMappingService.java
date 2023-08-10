package com.chibbol.wtz.domain.level.service;

import com.chibbol.wtz.domain.level.config.WeightProperties;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
@Slf4j
@RequiredArgsConstructor
public class WeightMappingService {

    private final WeightProperties weightProperties;

    public Map<Integer, Double> getJobWeightMap(){
        Map<Integer, Double> jobWeightMap = new HashMap<>();

        Map<String, Integer> seqMap = weightProperties.getSeq();
        Map<String, Double> weightMap = weightProperties.getWeight();

        for(Map.Entry<String, Integer> entry : seqMap.entrySet()){
            Integer seq = entry.getValue();
            Double weight = weightMap.get(seq);
            jobWeightMap.put(seq, weight);
        }

        return jobWeightMap;
    }
}
