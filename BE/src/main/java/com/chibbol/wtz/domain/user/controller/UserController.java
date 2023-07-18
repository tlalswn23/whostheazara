package com.ssafy.mafia.domain.user.controller;

import com.ssafy.mafia.domain.user.dto.*;
import com.ssafy.mafia.domain.user.entity.User;
import com.ssafy.mafia.domain.user.service.UserService;
import com.ssafy.mafia.email.service.EmailService;
import com.ssafy.mafia.security.dto.Token;
import com.ssafy.mafia.security.service.TokenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final TokenService tokenService;
    private final UserService userService;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    @Operation(summary = "이메일 중복 확인, 인증번호 전송")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "사용 가능"),
            @ApiResponse(responseCode = "409", description = "중복된 이메일"),
            @ApiResponse(responseCode = "422", description = "이메일 형식 오류"),
            @ApiResponse(responseCode = "429", description = "재전송 대기 시간"),
            @ApiResponse(responseCode = "502", description = "이메일 전송 실패")
    })
    @PostMapping("/email")
    public ResponseEntity<Void> email(@RequestParam String email) {
        userService.checkEmailDuplicate(email);
        emailService.sendEmailCode(email, "register");
        return ResponseEntity.ok(null);
    }

    @Operation(summary = "로그인")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "로그인 성공"),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "401", description = "비밀번호가 일치하지 않습니다.")
    })
    @PostMapping("/login")
    public ResponseEntity<Token> login(@RequestBody LoginDto loginDto) {
        User user = userService.login(loginDto, passwordEncoder);
        Token token = tokenService.generateToken(user.getEmail(), user.getRole());
        // RefreshToken 저장
        tokenService.saveRefreshToken(user.getEmail(), token.getRefreshToken());
        log.info("dddd");
        return ResponseEntity.ok(token);
    }

    @Operation(summary = "회원가입")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "회원가입 성공"),
            @ApiResponse(responseCode = "400", description = "이메일 인증번호 불일치"),
            @ApiResponse(responseCode = "409", description = "중복된 이메일입니다."),
            @ApiResponse(responseCode = "422", description = "이메일, 비밀번호, 닉네임 중 형식 오류")
    })
    @PostMapping("/join")
    public ResponseEntity<Void> join(@RequestBody UserCreateDto userCreateDto) {
        emailService.checkEmailVerificationCode(userCreateDto.getEmail(), userCreateDto.getEmailVerificationCode());
        userService.join(userCreateDto, passwordEncoder);
        emailService.removeEmailVerificationCode(userCreateDto.getEmail());
        return ResponseEntity.created(null).build();
    }

    @Operation(summary = "비밀번호 초기화 이메일 인증")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "이메일 전송 성공"),
            @ApiResponse(responseCode = "429", description = "재전송 대기 시간"),
            @ApiResponse(responseCode = "502", description = "이메일 전송 실패")
    })
    @PostMapping("/email-confirm")
    public ResponseEntity<String> sendEmailCode(@RequestParam String email) {
        emailService.sendEmailCode(email, "passwordChange");
        return ResponseEntity.ok(null);
    }

    @Operation(summary = "비밀번호 초기화")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "비밀번호 초기화 성공"),
            @ApiResponse(responseCode = "400", description = "이메일 인증번호 불일치"),
            @ApiResponse(responseCode = "422", description = "이메일, 비밀번호 중 형식 오류"),
    })
    @PostMapping("/reset-password")
    public ResponseEntity<Void> resetPassword(@RequestBody PasswordResetDto passwordResetDto) {
        emailService.checkEmailVerificationCode(passwordResetDto.getEmail(), passwordResetDto.getEmailVerificationCode());
        userService.resetPassword(passwordResetDto, passwordEncoder);
        emailService.removeEmailVerificationCode(passwordResetDto.getEmail());
        return ResponseEntity.ok(null);
    }

    @Operation(summary = "비밀번호 변경")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "비밀번호 변경 성공"),
            @ApiResponse(responseCode = "401", description = "비밀번호가 일치하지 않습니다."),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "422", description = "비밀번호 형식 오류")
    })
    @PatchMapping("/change-password")
    public ResponseEntity<Void> changePassword(@RequestBody ChangePasswordDto changePasswordDto) {
        userService.changePassword(changePasswordDto.getPassword(), changePasswordDto.getNewPassword(), userService.getLoginUser(), passwordEncoder);
        return ResponseEntity.ok(null);
    }

    @Operation(summary = "회원탈퇴")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "회원탈퇴 성공"),
            @ApiResponse(responseCode = "401", description = "비밀번호가 일치하지 않습니다."),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없습니다.")
    })
    @DeleteMapping("/")
    public ResponseEntity<Void> deleteUser(@RequestBody String password) {
        userService.deleteUser(password, userService.getLoginUser(), passwordEncoder);
        return ResponseEntity.ok(null);
    }

    @Operation(summary = "내 정보 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "내 정보 조회 성공"),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없습니다.")
    })
    @GetMapping("/me")
    public UserDto getMyUser() {
        return userService.getMyUser();
    }

    @Operation(summary = "토큰 재발급")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "토큰 재발급 성공"),
            @ApiResponse(responseCode = "401", description = "토큰이 유효하지 않습니다."),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없습니다.")
    })
    @PostMapping("/refresh-token")
    public ResponseEntity<Token> refreshToken(@RequestBody RefreshTokenDto refreshTokenDto) {
        String token = refreshTokenDto.getRefreshToken();
        if (StringUtils.hasText(token)) {
            // 토큰이 있는 경우
            if (tokenService.verifyToken(token)) {
                User user = tokenService.getUserFromToken(token);
                if (tokenService.verifyRefreshTokenOwner(token, user.getEmail())) { // refreshToken이 같으면
                    Token newToken = tokenService.generateToken(user.getEmail(), user.getRole()); // 새 토큰 발급
                    tokenService.saveRefreshToken(user.getEmail(), newToken.getRefreshToken()); // 새 refreshToken 디비에 저장
                    return ResponseEntity.ok(newToken);
                }
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
