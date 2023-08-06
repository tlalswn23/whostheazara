package com.chibbol.wtz.global.timer.controller;

import com.chibbol.wtz.domain.job.entity.RoomUserJob;
import com.chibbol.wtz.domain.job.entity.UserAbilityLog;
import com.chibbol.wtz.domain.job.repository.RoomUserJobRedisRepository;
import com.chibbol.wtz.domain.job.service.JobService;
import com.chibbol.wtz.domain.job.repository.UserAbilityLogRepository;
import com.chibbol.wtz.domain.vote.service.VoteService;
import com.chibbol.wtz.global.stomp.dto.dataDTO;
import com.chibbol.wtz.global.stomp.service.RedisPublisherAll;
import com.chibbol.wtz.global.stomp.service.StompService;
import com.chibbol.wtz.global.timer.dto.GameResultUserInfoDTO;
import com.chibbol.wtz.global.timer.dto.UserAliveDTO;
import com.chibbol.wtz.global.timer.dto.timerDTO;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.List;

/***
 게임 시작 : 방 세팅 정보(/pub)에서 isStart가 true가 되면

 <낮>
 - 대화 시간?
    - 타이머 : (/sub) 낮 시작 알림
    - 타이머 : (/pub) 낮 종료 알림 -> 서버에서 따로 처리할 일 X, 투표 시작 알림 주기
 - 투표
    - 타이머 : (/sub) 투표 시작 알림
    - 타이머 : (/pub) 투표  종료 알림 -> 서버에서 투표 결과 처리 후 투표 결과 전송

 <밤>
 - 능력 사용
    - 타이머 : (/sub) 능력 사용 시작 알림 -> 이건 언제 보내주지?
    - 타이머 : (/pub) 밤 종료 알림 -> 서버에서 능력 처리 후 능력 처리 결과 전송

 ??? : 게임 종료 확인은 투표 처리 후와 밤 능력 사용 후 둘 다 하는 건가?
 ***/

@Slf4j
@Controller
@RequiredArgsConstructor
public class StompTimerController {
    private final VoteService voteService;
    private final StompService stompService;
    private final RedisPublisherAll publisher;
    private final JobService jobService;
    private final UserAbilityLogRepository userAbilityLogRepository;
    private final RoomUserJobRedisRepository roomUserJobRedisRepository;

    // 투표 결과 알리기
    @Operation(summary = "타이머 종료 알림")
    @MessageMapping("/{roomSeq}/timer")
    public void timer(@DestinationVariable Long roomSeq, timerDTO timerDTO){
        stompService.addTopic(roomSeq); // 공통

        // 테스트용
        boolean gameOver = true; //jobService.checkGameOver(roomSeq)
        boolean allUserTimerOver = true; // 모든 유저가 타이머가 종료 되었는지

        if(allUserTimerOver) { // 모든 유저의 타이머가 종료되면 다음 처리 진행

            if (gameOver) { // 게임 종료시 처리 -> 게임 결과 전송
                // 해당 방에 맞는 UserAbilityLog들 가져오기
                List<UserAbilityLog> userAbilityLogs = userAbilityLogRepository.findAllByRoomRoomSeq(roomSeq);
                List<GameResultUserInfoDTO> gameResults = new ArrayList<>(); // 클라이언트에 전달할 data(List)

                // 클라이언트에 보낼 data(GameResultUserInfoDTO) 만들기
                for (UserAbilityLog user : userAbilityLogs) {
                    GameResultUserInfoDTO gameResult = GameResultUserInfoDTO.builder()
                            .userSeq(user.getUser().getUserSeq())
                            .jobSeq(user.getJob().getJobSeq())
                            .win(user.isResult()).build();

                    gameResults.add(gameResult);
                }

                publisher.publish(stompService.getTopic(roomSeq),
                        dataDTO.builder()
                                .type("GAME_RESULT")
                                .roomSeq(roomSeq)
                                .data(gameResults)
                                .build());
            }

            if(!gameOver) { // 게임이 아직 안끝났으면 -> 1. 투표 결과를 전송하거나(낮) 2. 생존 여부를 전송(밤)

                // 1. 투표 결과 전송(낮)
                if(timerDTO.getTime().equals("DAY")){
                    Long mostVotedUser = voteService.voteResult(roomSeq, timerDTO.getTurn());
                    publisher.publish(stompService.getTopic(roomSeq),
                            dataDTO.builder().
                                    type("VOTE_RESULT")
                                    .roomSeq(roomSeq)
                                    .data(mostVotedUser)
                                    .build());
                }

                // 2. 밤에 능력 사용 후 생존여부 전송(밤)
                if(timerDTO.getTime().equals("NIGHT")){
                    List<RoomUserJob> userInfo = roomUserJobRedisRepository.findAllByRoomSeq(roomSeq);
                    List<UserAliveDTO> aliveInfo = new ArrayList<>();

                    for (RoomUserJob user : userInfo) {
                        aliveInfo.add(UserAliveDTO.builder()
                                .userSeq(user.getUserSeq())
                                .alive(user.isAlive())
                                .build());
                    }

                    publisher.publish(stompService.getTopic(roomSeq),
                            dataDTO.builder()
                                    .type("ALIVE")
                                    .roomSeq(roomSeq)
                                    .data(aliveInfo)
                                    .build());
                }
            }

            // 타이머 시작 공지 : 모든 서버 처리 + 결과 전송 후 다음 턴을 위해 매번 전송
            Long number = 30L; // 타이머 시간초 : 임시 30초
            publisher.publish(stompService.getTopic(roomSeq),
                    dataDTO.builder()
                            .type("TIMER")
                            .roomSeq(roomSeq)
                            .data(number)
                            .build());
        }
    }
}
