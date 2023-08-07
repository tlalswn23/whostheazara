package com.chibbol.wtz.domain.room.handler;

import com.chibbol.wtz.domain.room.dto.ChatMessageDTO;
import com.chibbol.wtz.domain.room.dto.CurrentSeatsDTO;
import com.chibbol.wtz.domain.room.entity.Room;
import com.chibbol.wtz.domain.room.repository.RoomRepository;
import com.chibbol.wtz.domain.room.repository.StompRepository;
import com.chibbol.wtz.domain.room.service.StompService;
import com.chibbol.wtz.domain.user.entity.User;
import com.chibbol.wtz.global.security.service.TokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Component
public class StompHandler implements ChannelInterceptor {

    private final TokenService tokenService;
    private final StompService stompService;
    private final StompRepository stompRepository;
    private final RoomRepository roomRepository;

    // websocket을 통해 들어온 요청이 처리 되기전 실행
    // 유효하지 않은 토큰이 세팅될 경우, websocket을 통해 보낸 메세지는 무시
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel messageChannel) {
        StompHeaderAccessor stompHeaderAccessor = StompHeaderAccessor.wrap(message);
        log.info("소켓 메시지 감지");

        // CONNECT할때, 헤더의 jwt token 검증 / 유저 관리
        if (StompCommand.CONNECT == stompHeaderAccessor.getCommand()) {
            log.info("소켓 연결 감지");
            List<String> tokens = stompHeaderAccessor.getNativeHeader("Authorization");
            log.info("tokens : ", tokens);
//            String token = tokens.get(0).substring(7);
//            log.info("token : ", token);
//            tokenService.verifyToken(token);
//            // room code 추출
//            log.info(message.getHeaders()+" ");
//            String roomCode = stompService.getRoomCode(
//                    Optional.ofNullable((String) message.getHeaders().get("simpDestination"))
//                            .orElse("InvalidRoomId")
//            );
//            log.info("방번호 : " +roomCode+"입니다.");
//            // sessionId 추출
//            String sessionId = (String) message.getHeaders().get("simpSessionId");
//            log.info("세션 ID "+sessionId+"입니다.");
//            // 특정 세션이 어떤 채팅방에 들어가 있는지 알기 위해 저장
//            stompRepository.setUserEnterInfo(sessionId, roomCode);
//            // 채팅방 인원수 +1
//            log.info("인원 : 채팅방 번호 저장");
//            stompRepository.plusUserCount(roomCode);
//            log.info("채팅방 인원 증가");
//            // 클라이언트 입장 메세지를 채팅방에 발송
//            String name = Optional.ofNullable((Principal) message.getHeaders().get("simpUser")).map(Principal::getName).orElse("UnknownUser");
//            log.info("SUBSCRIBED {}, {}", name, roomCode);
        }

        else if (StompCommand.SUBSCRIBE == stompHeaderAccessor.getCommand()) {
//            RoomInfoDTO roomInfoDTO;
            log.info("SUBSCROBE 시작");
            // roomCode 추출
            String roomCode = stompService.getRoomCode(
                Optional.ofNullable((String) message.getHeaders().get("simpDestination"))
                        .orElse("InvalidRoomId"));
            // user 정보 추출
            List<String> tokens = stompHeaderAccessor.getNativeHeader("Authorization");
            log.info("tokens : ", tokens);
            String token = tokens.get(0).substring(7);
            log.info("token : ", token);
            User user = tokenService.getUserFromToken(token);
            Room room = roomRepository.findByRoomCode(roomCode);
            // 유저 관리
            stompRepository.setUserEnterInfo(user.getUserSeq(), roomCode); // 유저 정보 저장
            log.info("인원 : roomCode 저장");
            stompRepository.plusUserCount(roomCode); // 채팅방 인원수 +1
            log.info("채팅방 인원 증가");
            log.info(user.getNickname()+"님이 방코드:" + roomCode+"에 들어왔습니다.");
            CurrentSeatsDTO currentSeatsDTO = stompService.setCurrentSeats(user, roomCode);
//            long count = stompRepository.getUserCount(roomCode); // 인원수 반환
//            log.info("(후) 채팅방 인원수 : " + count);
            // todo : 데이터 전달
//            redisPublisher.publish(stompRoomService.getTopic(roomCode, roomInfoDTO));
        }


        else if (StompCommand.DISCONNECT == stompHeaderAccessor.getCommand()) {
            List<String> tokens = stompHeaderAccessor.getNativeHeader("Authorization");
            log.info("tokens : ", tokens);
            String token = tokens.get(0).substring(7);
            log.info("token : ", token);
            tokenService.verifyToken(token);
            User user = tokenService.getUserFromToken(token);
            log.info("소켓 연결 끊김 감지");
            log.info("해더 목록");
            log.info(message.getHeaders()+" ");
            // sessionId 추출
//            String sessionId = (String) message.getHeaders().get("simpSessionId");
            // 세션이 있는 roomId 추출
            String roomCode = stompRepository.getUserEnterRoomId(user.getUserSeq());
            // 채팅방 인원수 -1
            stompRepository.minusUserCount(roomCode);
            //
            String name = Optional.ofNullable((Principal) message.getHeaders().get("simpUser")).map(Principal::getName).orElse("Unknown");
            stompService.sendLeaveMessage(ChatMessageDTO.builder().code(roomCode).userName(name).build());
            // 퇴장한 sessionId 삭제
            stompRepository.removeUserEnterInfo(user.getUserSeq());
            log.info("DISCONNECTED {}, {}", user.getUserSeq(), roomCode);
        }
        return message;
    }
}
