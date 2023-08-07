package com.chibbol.wtz.domain.room.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatRoomDTO {

    private String code;
    private String title;
    private long userCount;

//    public static ChatRoomDTO create(String name) {
//        ChatRoomDTO chatRoomDTO = new ChatRoomDTO();
//        chatRoomDTO.code =
//        chatRoomDTO.
//    }
}
