package com.chibbol.wtz.domain.level.service;

import com.chibbol.wtz.domain.level.entity.UserAbilityLog;
import com.chibbol.wtz.domain.level.entity.UserLevel;
import com.chibbol.wtz.domain.level.repository.UserAbilityLogRepository;
import com.chibbol.wtz.domain.level.repository.UserLevelRepository;
import com.chibbol.wtz.domain.user.entity.User;
import com.chibbol.wtz.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserLevelService {

    private final Long EXP_VALUE = 100L;
    private final Double EXP_MULTI = 1.1;
    private final Long ABILITY_EXP = 10L;
    private final Long DEFAULT_EXP = 100L;

    private final UserLevelRepository userLevelRepository;
    private final UserAbilityLogRepository userAbilityLogRepository;
    private final UserService userService;

    // 승패 / 능력 성공 여부에 따라 경험치 추가
    @Transactional
    public void getExp(Long roomSeq){

        // userSeq에 맞는 저장된 정보를 가지고 오기
        User user = userService.getLoginUser();
        UserAbilityLog userAbilityLog = userAbilityLogRepository.findAllByUserUserSeqAndRoomRoomSeq(user.getUserSeq(), roomSeq);
        UserLevel userLevel = userLevelRepository.findByUserUserSeq(user.getUserSeq());

        Long exp = getTotalExp(userLevel, userAbilityLog);
        levelUp(userLevel, exp);

        log.info("얻고난 후 exp : " + userLevel.getExp());
        log.info("얻고난 후 level : " + userLevel.getLevel());

    }

    public void levelUp(UserLevel userLevel, Long exp){
        int level = userLevel.getLevel();
        Long levelUpExp = getLevelUpExp(level); // 해당 레벨에서 레벨업에 필요한 exp

        log.info(String.valueOf(levelUpExp));

        // 레벨 갱신 : 만약 현재 exp가 level의 exp 보다 크면 레벨 업
        if(exp >= levelUpExp){
            level = level + 1;
            exp = exp - levelUpExp;
        }

        userLevelRepository.save(userLevel.update(UserLevel.builder().level(level).exp(exp).build()));
    }

    public Long getTotalExp(UserLevel userLevel, UserAbilityLog userAbilityLog){

        Long exp = userLevel.getExp();

        // 게임 결과에 따라 exp 부여
        if(userAbilityLog.isResult()){ // 이겼을 때
            exp = exp + (DEFAULT_EXP * 2);
        }

        if(!userAbilityLog.isResult()){ // 졌을 때
            exp += DEFAULT_EXP;
        }

        // 능력 성공 횟수에 따라 exp 추가 부여
        exp += userAbilityLog.getAbilitySuccessCount() * ABILITY_EXP;

        return exp;
    }


    // 레벨에 따른 exp 계산
    public Long getLevelUpExp(int level){
        return Long.parseLong(String.valueOf((long) (EXP_VALUE * Math.pow(EXP_MULTI, level - 1))));
    }
}
