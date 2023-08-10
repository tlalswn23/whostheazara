package com.chibbol.wtz.domain.level.service;

import com.chibbol.wtz.domain.job.entity.UserAbilityLog;
import com.chibbol.wtz.domain.level.dto.LevelResultDTO;
import com.chibbol.wtz.domain.level.entity.UserLevel;
import com.chibbol.wtz.domain.level.repository.UserLevelRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserLevelService {

    private final Long EXP_VALUE = 100L;    // 1레벨 경험치
    private final Double EXP_MULTI = 1.1;   // 레벨당 경험치 배수
    private final Long ABILITY_EXP = 10L;

    private final UserLevelRepository userLevelRepository;
    private List<LevelResultDTO> levelResults;

    // 승패 / 능력 성공 여부에 따라 경험치 추가
    @Transactional
    public List<LevelResultDTO> updateExp(List<UserAbilityLog> userAbilityLogs){
        levelResults = new ArrayList<>();

        for(UserAbilityLog user: userAbilityLogs) {
            UserLevel userLevel = userLevelRepository.findByUserUserSeq(user.getUser().getUserSeq());
            LevelResultDTO levelResult = new LevelResultDTO();

            Long exp = getTotalExp(userLevel, user, levelResult);
            levelUp(userLevel, exp, levelResult);

            levelResults.add(levelResult);
        }
        return levelResults;
    }

    public void levelUp(UserLevel userLevel, Long exp, LevelResultDTO levelResult){
        int level = userLevel.getLevel();

        // 해당 레벨에서 레벨업에 필요한 exp
        Long levelUpExp = getLevelUpExp(level);

        // 레벨 갱신 : 만약 현재 exp가 level의 exp 보다 크면 레벨 업
        while(exp >= levelUpExp){
            level = level + 1;
            exp = exp - levelUpExp;
            levelUpExp = getLevelUpExp(level);
        }

        levelResult.setUserSeq(userLevel.getUser().getUserSeq());
        levelResult.setLevel(level);
        levelResult.setCurrentExp(exp);
        levelResult.setMaxExp(getLevelUpExp(level));

        userLevelRepository.save(userLevel.update(UserLevel.builder().level(level).exp(exp).build()));
    }

    public Long getTotalExp(UserLevel userLevel, UserAbilityLog userAbilityLog, LevelResultDTO levelResult){

        Long exp = userLevel.getExp();

        // 게임 결과에 따라 exp 부여
        if(userAbilityLog.isResult()){ // 이겼을 때
            Long temp = (long) (EXP_VALUE * 1.8);
            levelResult.setExpValue(temp);
            exp = exp + temp;
        }

        if(!userAbilityLog.isResult()){ // 졌을 때
            levelResult.setExpValue(EXP_VALUE);
            exp += EXP_VALUE;
        }

        // 능력 성공 횟수에 따라 exp 추가 부여
        Long abilityExp = userAbilityLog.getAbilitySuccessCount() * ABILITY_EXP;
        exp += abilityExp;
        levelResult.setExpValue(levelResult.getExpValue()+abilityExp);
        return exp;
    }

    // 레벨에 따른 exp 계산
    public Long getLevelUpExp(int level){
        return (long) (EXP_VALUE * Math.pow(EXP_MULTI, level - 1));
    }
}
