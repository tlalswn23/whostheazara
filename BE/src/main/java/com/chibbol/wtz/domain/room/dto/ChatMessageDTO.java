package com.chibbol.wtz.domain.room.dto;

import lombok.*;

@ToString
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageDTO {
    private String code;
    private Long userSeq; // 보낸사람
    private String nickName;
    private String userName; // 보낸 사람
    private String message;

    @Override
    public String toString() {
        return "ChatMessageDTO{" +
                "code='" + code + '\'' +
                ", userSeq=" + userSeq +
                ", userName='" + userName + '\'' +
                ", message='" + message + '\'' +
                '}';
    }
}
