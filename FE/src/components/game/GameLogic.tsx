import { GameCamList } from "./GameCamList";
import { GameChat } from "./GameChat";
import { GameMenu } from "./GameMenu";
import { GameTimer } from "./GameTimer";
import { GameJobInfo } from "../modal/GameJobInfo";
import { GameMyJob } from "../modal/GameMyJob";
// import { GameVote } from "./GameVote";
import { GameRabbit } from "./GameRabbit";
import { useWebSocket } from "../../context/socketContext";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  SubChat,
  SubStartTimer,
  SubVote,
  SubVoteResult,
  SubNightResult,
  SubGameResult,
  SubStart,
  SubZaraChat,
  SubGhostChat,
  SubZaraTarget,
} from "../../types/StompGameSubType";
import { useAccessTokenState } from "../../context/accessTokenContext";
// import { GameNight } from "./GameNight";
import { useLocation } from "react-router-dom";
import { ChatList } from "../../types/GameLogicType";
import { GameVote } from "./GameVote";
import { GameNight } from "./GameNight";
// import { GameAlert } from "../modal/GameAlert";
import { NIGHT_RESULT_MAP } from "../../constants/game/NightResultMap";
import GameAbilityResult from "../modal/GameAbilityResult";
import { GameDayAlert } from "../modal/GameDayAlert";
import GameTimerAlert from "./GameTimerAlert";
import { GameResultFromGamePage } from "../result/ResultForm";
// import { usePreventBrowserControl } from "../../hooks/usePreventBrowserControl";

interface GameLogicProps {
  mainStreamManager?: any;
  subscribers: any[];
  infoOn: boolean;
  onSetInfoOn: () => void;
  setMyCamera: (cameraOn: boolean) => void;
  setMyMic: (micOn: boolean) => void;
  setUserVideo: (videoOn: boolean) => void;
  setUserAudio: (videoOn: boolean) => void;
}

export const GameLogic = ({
  infoOn,
  mainStreamManager,
  subscribers,
  onSetInfoOn,
  setMyCamera,
  setMyMic,
  setUserVideo,
  setUserAudio,
}: GameLogicProps) => {
  const { client } = useWebSocket();
  const { userSeq } = useAccessTokenState();
  const { gameCode } = useParams();
  const navigate = useNavigate();
  const [ghostChatList, setGhostChatList] = useState<ChatList>([]);
  const [zaraChatList, setZaraChatList] = useState<ChatList>([]);
  const [allChatList, setAllChatList] = useState<ChatList>([]);
  const [timer, setTimer] = useState<number>(0);
  const [voteList, setVoteList] = useState([
    { userSeq: 0, cnt: 0 },
    { userSeq: 0, cnt: 0 },
    { userSeq: 0, cnt: 0 },
    { userSeq: 0, cnt: 0 },
    { userSeq: 0, cnt: 0 },
    { userSeq: 0, cnt: 0 },
    { userSeq: 0, cnt: 0 },
    { userSeq: 0, cnt: 0 },
    { userSeq: 0, cnt: 0 },
  ]);
  const [deathByVoteOrderNo, setDeathByVoteOrderNo] = useState<number | null>(null);
  const [deathByZaraOrderNo, setDeathByZaraOrderNo] = useState<number | null>(null);
  const [myJobSeq, setMyJobSeq] = useState(0);
  const location = useLocation();
  const [userInfo, setUserInfo] = useState([{ userSeq: 0, jobSeq: 0, nickname: "" }]);
  const [zaraList, setZaraList] = useState([{ userSeq: 0, jobSeq: 0, nickname: "" }]);
  const [loading, setLoading] = useState(true);
  const [amIDead, setAmIDead] = useState(false);
  const [amIZara, setAmIZara] = useState(false);
  const [amIVoted, setAmIVoted] = useState(false);
  const [ghostList, setGhostList] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [nowTime, setNowTime] = useState("");
  const [zaraTarget, setZaraTarget] = useState(-1);
  const [alertType, setAlertType] = useState(0);
  const [abilityList, setAbilityList] = useState([{ userSeq: 0, result: false }]);
  const [viewTimerAlert, setViewTimerAlert] = useState(false);
  const [gameResultData, setGameResultData] = useState<GameResultFromGamePage | null>(null);

  useEffect(() => {
    console.log(
      ghostChatList,
      zaraChatList,
      allChatList,
      voteList,
      deathByZaraOrderNo,
      location,
      zaraList,
      setAmIDead,
      alertType
    );
  }, []);

  // FIXME: 배포시 주석 해제
  // usePreventBrowserControl();

  const userSeqOrderMap: { [userSeq: number]: number } = location.state.userSeqOrderMap;
  console.log("userSeqOrderMap", userSeqOrderMap);
  const userSeqListSortedByOrder: number[] = location.state.userSeqListSortedByOrder;

  // const userSeqOrderMap: { [userSeq: number]: number } = {
  //   24: 0,
  //   26: 1,
  //   28: 2,
  //   30: 3,
  //   25: 4,
  //   27: 5,
  //   29: 6,
  //   31: 7,
  //   0: 8,
  //   // userSeq를 userOrder로 매핑
  // };
  const myOrderNo = userSeqOrderMap[userSeq];

  useEffect(() => {
    console.log("myJob Seq = " + myJobSeq);
    console.log(loading);
    if (myJobSeq > 0) {
      setLoading(false);
    }
  }, [myJobSeq]);

  useEffect(() => {
    const userJobZara = userInfo.filter((user) => {
      return user.jobSeq === 2;
    });
    setZaraList(userJobZara);
  }, [userInfo]);

  interface sortUserInfoParams {
    data: {
      userSeq: number;
      jobSeq: number;
      nickname: string;
    }[];
  }
  interface sortVoteInfoParams {
    data: {
      userSeq: number;
      cnt: number;
    }[];
  }

  interface sortNightInfoParams {
    ability: {
      userSeq: number;
      result: boolean;
    }[];
  }

  const sortUserInfo = ({ data }: sortUserInfoParams) => {
    const sortedData = userSeqListSortedByOrder.map((userSeq) => {
      if (userSeq === 0) {
        return {
          userSeq: 0,
          jobSeq: 0,
          nickname: "",
        };
      } else {
        const matchingItem = data.find((item) => item.userSeq === userSeq);
        if (matchingItem) {
          return matchingItem;
        } else {
          return {
            userSeq: userSeq,
            jobSeq: 0,
            nickname: "",
          };
        }
      }
    });

    return sortedData;
  };

  const sortVoteInfo = ({ data }: sortVoteInfoParams) => {
    const sortedData = userSeqListSortedByOrder.map((userSeq) => {
      if (userSeq === 0) {
        return {
          userSeq: 0,
          cnt: 0,
        };
      } else {
        const matchingItem = data.find((item) => item.userSeq === userSeq);
        if (matchingItem) {
          return matchingItem;
        } else {
          return {
            userSeq: userSeq,
            cnt: 0,
          };
        }
      }
    });
    sortedData[8] = { userSeq: 0, cnt: data[0].cnt };

    return sortedData;
  };

  const sortNightInfo = ({ ability }: sortNightInfoParams) => {
    const sortedData = userSeqListSortedByOrder.map((userSeq) => {
      if (userSeq === 0) {
        return {
          userSeq: 0,
          result: false,
        };
      } else {
        const matchingItem = ability.find((item) => item.userSeq === userSeq);
        if (matchingItem) {
          return matchingItem;
        } else {
          return {
            userSeq: userSeq,
            result: false,
          };
        }
      }
    });

    return sortedData;
  };

  const subGame = (gameCode: string) => {
    client?.subscribe(`/sub/game/${gameCode}/all`, (subData) => {
      const subDataBody = JSON.parse(subData.body);
      console.log("SUBSCRIBE GAME");
      console.log(subDataBody);
      switch (subDataBody.type) {
        case "GAME_START":
          const startData: SubStart = subDataBody;
          const initMyJobSeq = startData.data.find((user) => {
            return user.userSeq === userSeq;
          })?.jobSeq;

          const sortUserData = sortUserInfo(startData);
          setAmIZara(sortUserData[myOrderNo].jobSeq === 2 ? true : false);
          setUserInfo(sortUserData);
          setMyJobSeq(initMyJobSeq!);
          break;

        case "CHAT_ALL":
          const chatData: SubChat = subDataBody;
          const myChatData = {
            userOrder: userSeqOrderMap[chatData.data.sender],
            nickname: chatData.data.nickname,
            message: chatData.data.message,
          };
          setAllChatList((prev) => [...prev, myChatData]);
          break;

        case "GAME_TIMER":
          const timerData: SubStartTimer = subDataBody;
          setViewTimerAlert(true);
          setTimeout(() => {
            setViewTimerAlert(false);
          }, 5000);
          setTimer(timerData.data.time);
          setNowTime(timerData.data.type);
          break;

        case "GAME_TIMER_DECREASE":
          const skipTimeData: SubStartTimer = subDataBody;
          console.log(skipTimeData);
          setTimer(() => (timer - 5 < 0 ? 0 : timer - 5));
          break;

        case "GAME_VOTE":
          const voteData: SubVote = subDataBody;
          const sortVoteData = sortVoteInfo(voteData);
          console.log("테스트 필요 : sortVoteData");
          console.log(sortVoteData);
          setVoteList(sortVoteData);
          break;

        case "GAME_VOTE_RESULT":
          const voteResultData: SubVoteResult = subDataBody;
          const votedUserSeq = voteResultData.data;
          const votedUserOrderNo = userSeqOrderMap[votedUserSeq];
          setAmIVoted(votedUserOrderNo === myOrderNo);
          setDeathByVoteOrderNo(votedUserOrderNo);
          break;

        case "GAME_NIGHT_RESULT":
          const aliveData: SubNightResult = subDataBody;
          console.log(aliveData);
          if (aliveData.data.userSeq !== null) {
            setDeathByZaraOrderNo(userSeqOrderMap[aliveData.data.userSeq]);
          }

          // 상태를 업데이트합니다.
          const sortNightResultData = sortNightInfo(aliveData.data);
          console.log("sortNightResultData 테스트 필요");
          console.log(sortNightResultData);

          setAbilityList(sortNightResultData);
          break;

        case "GAME_OVER":
          const gameResultData: SubGameResult = subDataBody;
          setGameResultData({
            userInfo: gameResultData.data.userInfo.map((user) => {
              return {
                ...user,
                order: userSeqOrderMap[user.userSeq],
              };
            }),
            rabbitWin: gameResultData.data.rabbitWin,
            roomCode: location.state.roomCode,
          });
          break;

        default:
          console.log("잘못된 타입의 데이터가 왔습니다.");
          break;
      }
    });
  };

  useEffect(() => {
    if (gameResultData) {
      navigate("/result", {
        state: gameResultData,
      });
    }
  }, [gameResultData]);

  const unSubGame = (gameCode: string) => {
    client?.unsubscribe(`/sub/game/${gameCode}/all`);
  };

  const subGameZara = (gameCode: string) => {
    client?.subscribe(`/sub/game/${gameCode}/zara`, (subData) => {
      const subDataBody = JSON.parse(subData.body);
      console.log("SUBSCRIBE GAME ZARA");
      console.log(subDataBody);
      switch (subDataBody.type) {
        case "CHAT_ZARA":
          const subChatData: SubZaraChat = subDataBody;
          const myChatData = {
            userOrder: userSeqOrderMap[subChatData.data.sender],
            nickname: subChatData.data.nickname,
            message: subChatData.data.message,
          };
          setZaraChatList((prev) => [...prev, myChatData]);
          break;
        case "ABILITY":
          const subZaraTargetData: SubZaraTarget = subDataBody;
          const zaraTargetData = {
            targetOrderNo: userSeqOrderMap[subZaraTargetData.data],
          };
          setZaraTarget(zaraTargetData.targetOrderNo);
          break;
        default:
          console.log("잘못된 타입의 데이터가 왔습니다.");
          break;
      }
    });
  };

  const unSubGameZara = (gameCode: string) => {
    client?.unsubscribe(`/sub/game/${gameCode}/zara`);
  };

  const subGameGhost = (gameCode: string) => {
    client?.subscribe(`/sub/game/${gameCode}/ghost`, (subData) => {
      const subDataBody = JSON.parse(subData.body);
      console.log("SUBSCRIBE GAME GHOST");
      console.log(subDataBody);
      switch (subDataBody.type) {
        case "CHAT_GHOST":
          const subDeadData: SubGhostChat = subDataBody;
          const myChatData = {
            userOrder: userSeqOrderMap[subDeadData.data.sender],
            nickname: subDeadData.data.nickname,
            message: subDeadData.data.message,
          };
          setGhostChatList((prev) => [...prev, myChatData]);
          break;

        default:
          console.log("잘못된 타입의 데이터가 왔습니다.");
          break;
      }
    });
  };

  const unSubGameGhost = (gameCode: string) => {
    client?.unsubscribe(`/sub/game/${gameCode}/ghost`);
  };

  useEffect(() => {
    if (amIZara) subGameZara(gameCode!);

    return () => {
      unSubGameZara(gameCode!);
    };
  }, [amIZara]);

  useEffect(() => {
    subGame(gameCode!);

    return () => {
      unSubGame(gameCode!);
    };
  }, [gameCode]);

  useEffect(() => {
    if (amIDead) subGameGhost(gameCode!);

    return () => {
      unSubGameGhost(gameCode!);
    };
  }, [amIDead]);

  useEffect(() => {
    if (deathByVoteOrderNo === myOrderNo) {
      setAmIDead(true);
    }

    const newGhostList = () =>
      ghostList.map((user, index) => {
        if (deathByVoteOrderNo === index) {
          user = 1;
        }
        return user;
      });
    setGhostList(newGhostList);
  }, [deathByVoteOrderNo]);

  useEffect(() => {
    if (deathByZaraOrderNo === myOrderNo) {
      setAmIDead(true);
    }

    const newGhostList = () =>
      ghostList.map((user, index) => {
        if (deathByZaraOrderNo === index) {
          user = 1;
        }
        return user;
      });
    setGhostList(newGhostList);
  }, [deathByZaraOrderNo]);

  useEffect(() => {
    if (deathByZaraOrderNo === null) {
      setAlertType(NIGHT_RESULT_MAP.SAFE);
    } else if (deathByZaraOrderNo === myOrderNo) {
      setAlertType(NIGHT_RESULT_MAP.TARGET);
    } else {
      setAlertType(NIGHT_RESULT_MAP.DEATH);
    }
  }, [deathByZaraOrderNo]);

  return (
    <>
      {!loading && (
        <>
          <GameCamList
            mainStreamManager={mainStreamManager}
            subscribers={subscribers}
            myOrderNo={myOrderNo}
            userInfo={userInfo}
            ghostList={ghostList}
          />
          <GameJobInfo infoOn={infoOn} onSetInfoOn={onSetInfoOn} />
          <GameMyJob myJobSeq={myJobSeq} />
          {nowTime === "VOTE" && !amIDead && (
            <GameVote voteList={voteList} ghostList={ghostList} userSeqOrderMap={userSeqOrderMap} />
          )}
          {nowTime === "NIGHT" && !amIDead && (
            <GameNight
              ghostList={ghostList}
              userInfo={userInfo}
              myOrderNo={myOrderNo}
              zaraTarget={zaraTarget}
              userSeqOrderMap={userSeqOrderMap}
            />
          )}
          {nowTime === "NIGHT_RESULT" && !amIDead && abilityList[myOrderNo].result && (
            <GameAbilityResult userInfo={userInfo} myOrderNo={myOrderNo} />
          )}
          <GameMenu
            onSetInfoOn={onSetInfoOn}
            setMyCamera={setMyCamera}
            setMyMic={setMyMic}
            setUserVideo={setUserVideo}
            setUserAudio={setUserAudio}
            setAmIVoted={setAmIVoted}
            nowTime={nowTime}
            amIDead={amIDead}
            amIZara={amIZara}
            amIVoted={amIVoted}
          />
          <GameChat
            allChatList={allChatList}
            zaraChatList={zaraChatList}
            ghostChatList={ghostChatList}
            myJobSeq={myJobSeq}
            amIDead={amIDead}
            amIZara={amIZara}
          />
          <GameRabbit
            userInfo={userInfo}
            myOrderNo={myOrderNo}
            setDeathByVoteOrderNo={setDeathByVoteOrderNo}
            deathByVoteOrderNo={deathByVoteOrderNo}
            setDeathByZaraOrderNo={setDeathByZaraOrderNo}
            deathByZaraOrderNo={deathByZaraOrderNo}
          />
          {viewTimerAlert && (
            <GameTimerAlert
              nowTime={nowTime}
              myJobSeq={myJobSeq}
              deathByVoteOrderNo={deathByVoteOrderNo}
              deathByZaraOrderNo={deathByZaraOrderNo}
            />
          )}
        </>
      )}
      <GameTimer timer={timer} setTimer={setTimer} nowTime={nowTime} />
      {nowTime === "DAY" && (
        <GameDayAlert alertType={alertType} userInfo={userInfo} deathByZaraOrderNo={deathByZaraOrderNo} />
      )}
    </>
  );
};
