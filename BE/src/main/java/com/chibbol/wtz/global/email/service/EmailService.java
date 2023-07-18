package com.chibbol.wtz.global.email.service;

import com.chibbol.wtz.global.email.dto.VerificationCode;
import com.chibbol.wtz.global.email.exception.EmailCodeNotMatchException;
import com.chibbol.wtz.global.email.exception.EmailSendingFailedException;
import com.chibbol.wtz.global.email.exception.ResendTimeNotExpiredException;
import com.ssafy.mafia.email.message.EmailMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender javaMailSender;
    private final EmailMessage emailMessage;

    private static Map<String, VerificationCode> verificationCodes = new HashMap<>();

    public boolean sendEmailCode(String email, String type) {
        if(!sendVerificationEmail(email, type)) {
            throw new EmailSendingFailedException("이메일 전송에 실패했습니다.");
        }
        return true;
    }

    public void checkEmailVerificationCode(String email, String code) {
        if(!isVerificationCodeValid(email, code)) {
            throw new EmailCodeNotMatchException("이메일 인증번호가 일치하지 않습니다.");
        }
    }

    public void removeEmailVerificationCode(String email) {
        removeVerificationCode(email);
    }

    // 인증번호 저장
    public static void storeVerificationCode(String email, String code) {
        LocalDateTime currentTime = LocalDateTime.now();
        LocalDateTime expirationTime = currentTime.plusMinutes(5);
        VerificationCode verificationCode  = new VerificationCode(code, expirationTime, currentTime);
        verificationCodes.put(email, verificationCode);
    }

    // 인증번호가 유요한지
    public static boolean isVerificationCodeValid(String email, String code) {
        VerificationCode verificationCode = verificationCodes.get(email);
        return verificationCode != null && verificationCode.getCode().equals(code) && verificationCode.isNotExpired();
    }

    // 인증번호 삭제
    public static void removeVerificationCode(String email) {
        VerificationCode verificationCode = verificationCodes.get(email);
        if(verificationCode != null) {
            verificationCodes.remove(email);
        }
    }

    @Scheduled(fixedDelay = 60000)  // 매 분마다 실행
    public void removeExpiredVerificationCodes() {
        LocalDateTime currentTime = LocalDateTime.now();
        verificationCodes.entrySet().removeIf(entry -> entry.getValue().getExpirationTime().isBefore(currentTime));
    }

    public boolean sendVerificationEmail(String email, String type) {
        VerificationCode verificationCode = verificationCodes.get(email);
        if (verificationCode != null && verificationCode.isResendTimeNotExpired()) {
            throw new ResendTimeNotExpiredException("Resend time has not expired yet for email: " + email + "\nexpired time: " + verificationCode.getLastResendTime());
        } else {
            boolean messageSend = true;

            MimeMessage message = javaMailSender.createMimeMessage();

            String code = generateCode();

            String info = null;
            if(type.equals("register")) {
                info = emailMessage.registerEmailMessage(code);
            } else if(type.equals("passwordChange")) {
                info = emailMessage.passwordChangeEmailMessage(code);
            }

            if(info != null) {
                try {
                    message.setSubject("[who's the Zara] 인증코드");
                    message.addRecipient(Message.RecipientType.TO, new InternetAddress(email, "", "UTF-8"));
                    message.setText(info, "UTF-8", "html");

                    javaMailSender.send(message);

                    storeVerificationCode(email, code); // 전송한 코드 저장

                    log.info("==================================================");
                    log.info("SEND EMAIL VERIFICATION CODE");
                    log.info("EMAIL : " + email);
                    log.info("CODE  : " + code);
                    log.info("==================================================");
                } catch (MessagingException e) {
                    e.printStackTrace();
                    messageSend = false;
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                    messageSend = false;
                }
            } else {
                messageSend = false;
            }

            return messageSend;
        }
    }

    private String generateCode() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 8; i++) { // 인증코드 8자리
            int index = rnd.nextInt(3); // 0~2 까지 랜덤, rnd 값에 따라서 아래 switch 문이 실행됨

            switch (index) {
                case 0:
                    key.append((char) ((int) (rnd.nextInt(26)) + 97));
                    // a~z (ex. 1+97=98 => (char)98 = 'b')
                    break;
                case 1:
                    key.append((char) ((int) (rnd.nextInt(26)) + 65));
                    // A~Z
                    break;
                case 2:
                    key.append((rnd.nextInt(10)));
                    // 0~9
                    break;
            }
        }

        return key.toString();
    }


}
