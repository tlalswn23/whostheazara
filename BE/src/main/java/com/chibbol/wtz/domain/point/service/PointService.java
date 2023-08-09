package com.chibbol.wtz.domain.point.service;

import com.chibbol.wtz.domain.job.entity.UserAbilityLog;
import com.chibbol.wtz.domain.point.entity.Point;
import com.chibbol.wtz.domain.point.pointRepository.PointRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class PointService {
    private final PointRepository pointRepository;

    public void updatePoint(List<UserAbilityLog> userAbilityLogs) {

        for(UserAbilityLog userInfo: userAbilityLogs){
            Point point = pointRepository.findByUserUserSeq(userInfo.getUser().getUserSeq()).orElse(Point.builder().user(userInfo.getUser()).point(0).build());

            log.info(userInfo.toString());
            log.info(point.toString());

            getPoint(userInfo, point);

            pointRepository.save(point);
        }
    }

    // 승패에 따라 포인트 얻기
    public void getPoint(UserAbilityLog userInfo, Point point){

        if(userInfo.isResult()){ // 이기면 15
            point.addPoint(15);
        }

        if(!userInfo.isResult()){ // 지면 10
            point.addPoint(10);
        }
    }
}