package com.chibbol.wtz.global.redis.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.redis.core.RedisHash;

import javax.persistence.Id;

@Getter
@ToString
@RedisHash("test")
public class Test {
    @Id
    private Long id;
    private String name;

    @Builder
    public Test(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
