package com.chibbol.wtz.global.timer.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Getter
@RequiredArgsConstructor
public class GameResultDTO {
    boolean rabbitWin;
    List<GameResultUserInfoDTO> userInfo;
}
