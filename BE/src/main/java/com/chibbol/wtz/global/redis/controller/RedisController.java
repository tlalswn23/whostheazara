package com.chibbol.wtz.global.redis.controller;

import com.chibbol.wtz.global.redis.service.RedisService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/v1/redis")
@RequiredArgsConstructor
public class RedisController {
     private final RedisService redisService;

     @GetMapping("/test")
     public void test(@RequestParam String name) {
         redisService.test(name);
     }

     @GetMapping("/get")
    public void get(@RequestParam Long id) {
        redisService.get(id);
    }
}
