package com.chibbol.wtz.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 엔드포인트에 대해 CORS 설정을 적용
                .allowedOrigins("*") // 모든 도메인에서 요청을 허용 (원하는 도메인만 허용하려면 해당 도메인 주소를 지정)
                .allowedMethods("GET", "POST", "PUT", "DELETE") // 허용할 HTTP 메서드 지정
                .allowedHeaders("*") // 모든 요청 헤더를 허용 (필요에 따라 특정 헤더만 허용할 수도 있음)
                .allowCredentials(true); // 인증 정보를 요청에서 허용할지 여부 설정 (옵션)
    }
}