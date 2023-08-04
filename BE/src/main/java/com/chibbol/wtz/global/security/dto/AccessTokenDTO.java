package com.chibbol.wtz.global.security.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class AccessTokenDTO {
    private Long userSeq;
    private String accessToken;

    @Builder
    public AccessTokenDTO(Long userSeq, String accessToken) {
        this.userSeq = userSeq;
        this.accessToken = accessToken;
    }
}
