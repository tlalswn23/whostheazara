package com.chibbol.wtz.domain.user.controller;

import com.chibbol.wtz.domain.user.dto.*;
import com.chibbol.wtz.domain.user.entity.User;
import com.chibbol.wtz.domain.user.service.UserService;
import com.chibbol.wtz.global.email.service.EmailService;
import com.chibbol.wtz.global.security.dto.LoginTokenDTO;
import com.chibbol.wtz.global.security.dto.RefreshTokenDTO;
import com.chibbol.wtz.global.security.dto.Token;
import com.chibbol.wtz.global.security.service.TokenService;
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

    @Operation(summary = "1. 이메일 중복 확인, 인증번호 전송")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "사용 가능"),
            @ApiResponse(responseCode = "409", description = "중복된 이메일"),
            @ApiResponse(responseCode = "422", description = "이메일 형식 오류"),
            @ApiResponse(responseCode = "429", description = "재전송 대기 시간"),
            @ApiResponse(responseCode = "502", description = "이메일 전송 실패")
    })
    @PostMapping("/email/confirm")
    public ResponseEntity<Void> email(@RequestBody EmailDTO emailDto) {
        userService.checkEmailDuplicate(emailDto.getEmail());
        emailService.sendEmailCode(emailDto.getEmail(), "register");
        return ResponseEntity.ok(null);
    }

    @Operation(summary = "2. 회원가입")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "회원가입 성공"),
            @ApiResponse(responseCode = "400", description = "이메일 인증번호 불일치"),
            @ApiResponse(responseCode = "409", description = "중복된 이메일"),
            @ApiResponse(responseCode = "422", description = "이메일, 비밀번호, 닉네임 중 형식 오류")
    })
    @PostMapping("/join")
    public ResponseEntity<Void> join(@RequestBody UserCreateDTO userCreateDto) {
        emailService.checkEmailVerificationCode(userCreateDto.getEmail(), userCreateDto.getEmailVerificationCode());
        userService.join(userCreateDto, passwordEncoder);
        emailService.removeEmailVerificationCode(userCreateDto.getEmail());

        log.info("====================");
        log.info("REGISTER SUCCESS");
        log.info("EMAIL : " + userCreateDto.getEmail());
        log.info("====================");

        return ResponseEntity.created(null).build();
    }

    @Operation(summary = "3. 로그인")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "로그인 성공"),
            @ApiResponse(responseCode = "401", description = "비밀번호가 일치하지 않습니다."),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "422", description = "이메일, 비밀번호 중 형식 오류")
    })
    @PostMapping("/login")
    public ResponseEntity<LoginTokenDTO> login(@RequestBody LoginDTO loginDto) {
        User user = userService.login(loginDto, passwordEncoder);
        Token token = tokenService.generateToken(user.getEmail(), user.getRole());
        // RefreshToken 저장
        tokenService.saveRefreshToken(user.getEmail(), token.getRefreshToken());

        log.info("====================");
        log.info("LOGIN SUCCESS");
        log.info("EMAIL : " + loginDto.getEmail());
        log.info("====================");

        return ResponseEntity.ok(LoginTokenDTO.builder().userSeq(user.getUserSeq()).accessToken(token.getAccessToken()).refreshToken(token.getRefreshToken()).build());
    }

    @Operation(summary = "4. 비밀번호 초기화 이메일 인증")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "이메일 전송 성공"),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "429", description = "재전송 대기 시간"),
            @ApiResponse(responseCode = "502", description = "이메일 전송 실패")
    })
    @PostMapping("/email")
    public ResponseEntity<String> sendEmailCode(@RequestBody EmailDTO emailDto) {
        userService.checkEmailExist(emailDto.getEmail());
        emailService.sendEmailCode(emailDto.getEmail(), "passwordChange");
        return ResponseEntity.ok(null);
    }

    @Operation(summary = "5. 비밀번호 초기화")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "비밀번호 초기화 성공"),
            @ApiResponse(responseCode = "400", description = "이메일 인증번호 불일치"),
            @ApiResponse(responseCode = "422", description = "이메일, 비밀번호 중 형식 오류"),
    })
    @PostMapping("/reset-password")
    public ResponseEntity<Void> resetPassword(@RequestBody PasswordResetDTO passwordResetDto) {
        emailService.checkEmailVerificationCode(passwordResetDto.getEmail(), passwordResetDto.getEmailVerificationCode());
        userService.resetPassword(passwordResetDto, passwordEncoder);
        emailService.removeEmailVerificationCode(passwordResetDto.getEmail());

        log.info("====================");
        log.info("RESET PASSWORD");
        log.info("EMAIL : " + passwordResetDto.getEmail());
        log.info("====================");

        return ResponseEntity.ok(null);
    }

    @Operation(summary = "6. 비밀번호 변경")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "비밀번호 변경 성공"),
            @ApiResponse(responseCode = "401", description = "비밀번호가 일치하지 않습니다."),
            @ApiResponse(responseCode = "401", description = "토큰이 유효하지 않습니다."),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "422", description = "비밀번호 형식 오류")
    })
    @PatchMapping("/change-password")
    public ResponseEntity<Void> changePassword(@RequestBody ChangePasswordDTO changePasswordDto) {
        userService.changePassword(changePasswordDto.getPassword(), changePasswordDto.getNewPassword(), userService.getLoginUser(), passwordEncoder);

        log.info("====================");
        log.info("CHANGE PASSWORD");
        log.info("EMAIL : " + userService.getLoginUser().getEmail());
        log.info("====================");

        return ResponseEntity.ok(null);
    }

    @Operation(summary = "7. 닉네임 변경")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "닉네임 변경 성공"),
            @ApiResponse(responseCode = "401", description = "비밀번호가 일치하지 않습니다."),
            @ApiResponse(responseCode = "401", description = "토큰이 유효하지 않습니다."),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없습니다."),
            @ApiResponse(responseCode = "422", description = "닉네임 형식 오류")
    })
    @PatchMapping("/change-nickname")
    public ResponseEntity<Void> changeNickname(@RequestBody ChangeNicknameDTO changeNicknameDto) {
        userService.changeNickname(changeNicknameDto.getNickname(), userService.getLoginUser());

        log.info("====================");
        log.info("CHANGE NICKNAME");
        log.info("EMAIL : " + userService.getLoginUser().getEmail());
        log.info("====================");

        return ResponseEntity.ok(null);
    }

    @Operation(summary = "8. 회원탈퇴")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "회원탈퇴 성공"),
            @ApiResponse(responseCode = "401", description = "비밀번호가 일치하지 않습니다."),
            @ApiResponse(responseCode = "401", description = "토큰이 유효하지 않습니다."),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없습니다.")
    })
    @DeleteMapping("/")
    public ResponseEntity<Void> deleteUser(@RequestBody String password) {
        User user = userService.getLoginUser();
        userService.deleteUser(password, user, passwordEncoder);

        log.info("====================");
        log.info("DELETE USER");
        log.info("EMAIL : " + user.getEmail());
        log.info("====================");

        return ResponseEntity.ok(null);
    }

    @Operation(summary = "내 정보 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "내 정보 조회 성공"),
            @ApiResponse(responseCode = "401", description = "토큰이 유효하지 않습니다."),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없습니다.")
    })
    @GetMapping("/me")
    public UserDTO getMyUser() {
        User user = userService.getLoginUser();
        log.info("====================");
        log.info("USER INFO");
        log.info("EMAIL : " + user.getEmail());
        log.info("====================");
        return userService.getMyUser();
    }

    @Operation(summary = "토큰 재발급")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "토큰 재발급 성공"),
            @ApiResponse(responseCode = "401", description = "토큰이 유효하지 않습니다."),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없습니다.")
    })
    @PostMapping("/refresh-token")
    public ResponseEntity<RefreshTokenDTO> refreshToken(@RequestBody com.chibbol.wtz.domain.user.dto.RefreshTokenDTO refreshTokenDto) {
        String token = refreshTokenDto.getRefreshToken();
        if (StringUtils.hasText(token)) {
            // 토큰이 있는 경우
            if (tokenService.verifyToken(token)) {
                User user = tokenService.getUserFromToken(token);
                if (tokenService.verifyRefreshTokenOwner(token, user.getEmail())) { // refreshToken이 같으면
                    Token newToken = tokenService.generateToken(user.getEmail(), user.getRole()); // 새 토큰 발급
                    tokenService.saveRefreshToken(user.getEmail(), newToken.getRefreshToken()); // 새 refreshToken 디비에 저장

                    log.info("====================");
                    log.info("GENERATE NEW ACCESSTOKEN BY REFRESHTOKEN");
                    log.info("EMAIL : " + user.getEmail());
                    log.info("====================");

                    return ResponseEntity.ok(RefreshTokenDTO.builder().userSeq(user.getUserSeq()).refreshToken(newToken.getRefreshToken()).build());
                }
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
