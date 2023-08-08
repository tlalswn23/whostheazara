package com.chibbol.wtz.domain.gamechat.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class MessageDTO {
    Long userSeq;
    String message;
}
