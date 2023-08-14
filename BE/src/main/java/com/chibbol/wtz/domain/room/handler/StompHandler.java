package com.chibbol.wtz.domain.room.handler;

import com.chibbol.wtz.domain.room.service.HandlerService;
import com.chibbol.wtz.domain.room.service.RoomEnterInfoRedisService;
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

@Slf4j
@RequiredArgsConstructor
@Component
public class StompHandler implements ChannelInterceptor {

    private final TokenService tokenService;
    private final HandlerService handlerService;
    private final RoomEnterInfoRedisService roomEnterInfoRedisService;

    // websocket을 통해 들어온 요청이 처리 되기전 실행
    // 유효하지 않은 토큰이 세팅될 경우, websocket을 통해 보낸 메세지는 무시
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel messageChannel) {
        StompHeaderAccessor stompHeaderAccessor = StompHeaderAccessor.wrap(message);
        log.info("소켓 메시지 감지");
        log.info(stompHeaderAccessor.getDestination());
        log.info(stompHeaderAccessor.getCommand().toString());

//        // CONNECT할때, 헤더의 jwt token 검증 / 유저 관리
        if (StompCommand.CONNECT == stompHeaderAccessor.getCommand()) {
            log.info("CONNECT 감지");
            String sessionId = stompHeaderAccessor.getSessionId();
            log.info("sessionId : " + sessionId);
            String token = stompHeaderAccessor.getFirstNativeHeader("Authorization");
            log.info("token : " + token);
            String processedToken = token.replace("Bearer ", "");
            User user = tokenService.getUserFromToken(processedToken);
            log.info("user : " + user.toString());
            handlerService.connectUser(sessionId, user.getUserSeq());
            log.info("CONNECT 감지 끝");
        }

        else if (StompCommand.SUBSCRIBE == stompHeaderAccessor.getCommand()) {
            log.info("SUBSCRIBE 감지");
            // roomCode 추출
//            String roomCode = stompService.getRoomCode(
//                Optional.ofNullable((String) message.getHeaders().get("simpDestination"))
//                        .orElse("InvalidRoomId"));
//            // user 정보 추출
//            log.info("유저정보 추출 시작");
//            String token = stompHeaderAccessor.getFirstNativeHeader("Authorization");
//            log.info("token : " + token);
//            String processedToken = token.replace("Bearer ", "");
//            log.info("processedToken : "+ processedToken);
//            User user = tokenService.getUserFromToken(processedToken);
//            log.info("유저정보 추출 끝");
//            // 유저 관리
//            log.info("유저 관리 시작");
//            CurrentSeatsDTO currentSeatsDTO = roomEnterRedisRepository.enterUser(roomCode, user); // 유저 정보 저장
//            if (currentSeatsDTO == null) {
//                throw new SeatNotFoundException("빈 자리가 없습니다!");
//            }
//            log.info(roomEnterRedisRepository.getUsingSeats(roomCode) +" 현재 유저 수");
//            log.info("유저 관리 끝");
//            // todo : 메세지 보내기
//            log.info("입장 메세지 시작");
//            ChatMessageDTO chatMessageDTO = ChatMessageDTO
//                    .builder()
//                    .userName(user.getNickname())
//                    .message(user.getNickname()+"님이 입장하셨습니다.")
//                    .build();
//            log.info(chatMessageDTO.toString());
//            DataDTO dataDTO = DataDTO
//                    .builder()
//                    .type("CHAT")
//                    .roomCode(roomCode)
//                    .objectDTO(chatMessageDTO)
//                    .build();
//            log.info(dataDTO.toString());
//            stompRoomService.enterChatRoom(roomCode);
//            redisPublisher.publish(stompRoomService.getTopic(roomCode), dataDTO);
//            log.info("입장 메세지 끝");
//            Room room = roomRepository.findByRoomCode(roomCode);
//            // job setting 추출
//            List<Long> excludeJobSetting = roomJobSettingRedisRepository.findExcludeJobSeqByRoomSeq(room.getRoomSeq());
//            Map<Long, Boolean> jobSetting = new HashMap<>();
//            for (long i = 1; i <= 7; i++) {
//                jobSetting.put(i, true);
//            }
//            for (Long ex : excludeJobSetting) {
//                jobSetting.put(ex, false);
//            }
//
//            InitialRoomSettingDTO initialRoomSettingDTO = new InitialRoomSettingDTO();
//            initialRoomSettingDTO.setJobSetting(jobSetting);
//            initialRoomSettingDTO.setTitle(room.getTitle());
//            initialRoomSettingDTO.setOwnerSeq(room.getOwner().getUserSeq());
//            initialRoomSettingDTO.setCurrentSeatsDTO(currentSeatsDTO);
//
//            DataDTO dataDTO = DataDTO.builder()
//                    .type("INITIAL_ROOM_SETTING")
//                    .roomCode(roomCode)
//                    .objectDTO(initialRoomSettingDTO)
//                    .build();
//            // todo : 데이터 전달
//            redisPublisher.publish(stompHandlerService.getTopic(roomCode), dataDTO);
        }

        else if (StompCommand.UNSUBSCRIBE == stompHeaderAccessor.getCommand()) {
            log.info("UNSUBSCRIBE 감지");
        }

        else if (StompCommand.DISCONNECT == stompHeaderAccessor.getCommand()) {
            log.info("DISCONNECT 감지");
            String sessionId = stompHeaderAccessor.getSessionId();
            handlerService.disconnectUser(sessionId);
//            roomEnterInfoRedisService.setUserExitInfo(roomCode, user.getUserSeq());
//            List<String> tokens = stompHeaderAccessor.getNativeHeader("Authorization");
//            log.info("tokens : ", tokens);
//            String token = tokens.get(0).substring(7);
//            log.info("token : ", token);
//            tokenService.verifyToken(token);
//            User user = tokenService.getUserFromToken(token);
//            log.info("소켓 연결 끊김 감지");
//            log.info("해더 목록");
//            log.info(message.getHeaders()+" ");
//            // sessionId 추출
////            String sessionId = (String) message.getHeaders().get("simpSessionId");
//            // 세션이 있는 roomId 추출
////            String roomCode = stompRepository.enterUser(roomCode, user);
//            // 채팅방 인원수 -1
//            //
////            String name = Optional.ofNullable((Principal) message.getHeaders().get("simpUser")).map(Principal::getName).orElse("Unknown");
//
        }
        return message;
    }
}
