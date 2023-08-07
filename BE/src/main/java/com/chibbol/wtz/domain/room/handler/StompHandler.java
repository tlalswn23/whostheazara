package com.chibbol.wtz.domain.room.handler;

import com.chibbol.wtz.domain.room.repository.RoomEnterRedisRepository;
import com.chibbol.wtz.domain.room.repository.RoomJobSettingRedisRepository;
import com.chibbol.wtz.domain.room.repository.RoomRepository;
import com.chibbol.wtz.domain.room.service.RedisPublisher;
import com.chibbol.wtz.domain.room.service.StompHandlerService;
import com.chibbol.wtz.domain.room.service.StompService;
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
    private final StompService stompService;
    private final StompHandlerService stompHandlerService;
    private final RoomRepository roomRepository;
    private final RoomEnterRedisRepository roomEnterRedisRepository;
    private final RoomJobSettingRedisRepository roomJobSettingRedisRepository;
    private final RedisPublisher redisPublisher;

    // websocket을 통해 들어온 요청이 처리 되기전 실행
    // 유효하지 않은 토큰이 세팅될 경우, websocket을 통해 보낸 메세지는 무시
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel messageChannel) {
        StompHeaderAccessor stompHeaderAccessor = StompHeaderAccessor.wrap(message);
        log.info("소켓 메시지 감지");

        log.info(stompHeaderAccessor.getCommand().toString());
//        // CONNECT할때, 헤더의 jwt token 검증 / 유저 관리
        if (StompCommand.CONNECT == stompHeaderAccessor.getCommand()) {
            log.info("소켓 연결 감지");
            String token = stompHeaderAccessor.getFirstNativeHeader("Authorization");
//            log.info("tokens : ", tokens);
            log.info("token : " + token);
            String processedToken = token.replace("Bearer ", "");
            log.info("processedToken : "+ processedToken);
            tokenService.verifyToken(processedToken);
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
//
//        else if (StompCommand.SUBSCRIBE == stompHeaderAccessor.getCommand()) {
////            RoomInfoDTO roomInfoDTO;
//            log.info("SUBSCROBE 시작");
//            // roomCode 추출
//            String roomCode = stompService.getRoomCode(
//                Optional.ofNullable((String) message.getHeaders().get("simpDestination"))
//                        .orElse("InvalidRoomId"));
//            // user 정보 추출
//            List<String> tokens = stompHeaderAccessor.getNativeHeader("Authorization");
//            log.info("tokens : ", tokens);
//            String token = tokens.get(0).substring(7);
//            log.info("token : ", token);
//            User user = tokenService.getUserFromToken(token);
//            Room room = roomRepository.findByRoomCode(roomCode);
//            // 유저 관리
//            CurrentSeatsDTO currentSeatsDTO = roomEnterRedisRepository.enterUser(roomCode, user); // 유저 정보 저장
//            if (currentSeatsDTO == null) {
//                throw new SeatNotFoundException("빈 자리가 없습니다!");
//            }
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
//        }
//
//
//        else if (StompCommand.DISCONNECT == stompHeaderAccessor.getCommand()) {
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
//        }
        return message;
    }
}
