package com.chibbol.wtz.global.security.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class LoginTokenDTO {
    private Long userSeq;
    private String accessToken;
    private String refreshToken;

    @Builder
    public LoginTokenDTO(Long userSeq, String accessToken, String refreshToken) {
        this.userSeq = userSeq;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
