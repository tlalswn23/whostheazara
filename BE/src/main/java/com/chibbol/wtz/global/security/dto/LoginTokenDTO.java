package com.chibbol.wtz.global.security.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class LoginTokenDTO {
    private Long userSeq;
    private String accessToken;

    @Builder
    public LoginTokenDTO(Long userSeq, String accessToken) {
        this.userSeq = userSeq;
        this.accessToken = accessToken;
    }
}
