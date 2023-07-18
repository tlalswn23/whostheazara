package com.ssafy.mafia.email.dto;

import java.time.Duration;
import java.time.LocalDateTime;

public class VerificationCode {
    private String code;    // 인증번호
    private LocalDateTime expirationTime;   // 유효시간

    private LocalDateTime lastResendTime;

    public VerificationCode(String code, LocalDateTime expirationTime, LocalDateTime lastResendTime) {
        this.code = code;
        this.expirationTime = expirationTime;
        this.lastResendTime = lastResendTime;
    }

    public String getCode() {
        return code;
    }

    public LocalDateTime getExpirationTime() {
        return expirationTime;
    }

    public LocalDateTime getLastResendTime() {
        return lastResendTime;
    }

    public boolean isResendTimeNotExpired() {
        LocalDateTime currentTime = LocalDateTime.now();
        Duration timeSinceLastResend = Duration.between(lastResendTime, currentTime);
        Duration resendInterval = Duration.ofMinutes(1);
        return timeSinceLastResend.compareTo(resendInterval) < 0;
    }

    public boolean isNotExpired() {
        return LocalDateTime.now().isBefore(expirationTime);
    }
}
