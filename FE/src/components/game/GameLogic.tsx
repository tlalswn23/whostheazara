import { GameCamList } from "./GameCamList";
// import { GameChat } from "./GameChat";
import { GameMenu } from "./GameMenu";
import { GameTimer } from "./GameTimer";
import { GameJobInfo } from "../modal/GameJobInfo";
import { GameMyJob } from "../modal/GameMyJob";
// import { GameVote } from "./GameVote";
import { GameRabbit } from "./GameRabbit";
import { useWebSocket } from "../../context/socketContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import stompUrl from "../../api/url/stompUrl";
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
} from "../../types/StompGameSubType";
import { useAccessTokenState } from "../../context/accessTokenContext";
// import { GameNight } from "./GameNight";
import { useLocation } from "react-router-dom";
import { ChatList } from "../../types/GameLogicType";

interface GameLogicProps {
  mainStreamManager?: any;
  subscribers: any[];
  infoOn: boolean;
  onSetInfoOn: () => void;
  viewTime: number;
  toggleVideo: () => void;
  toggleMic: () => void;
  setAllAudio: (soundOn: boolean) => void;
}

export const GameLogic = ({
  infoOn,
  // viewTime,
  mainStreamManager,
  subscribers,
  onSetInfoOn,
  toggleVideo,
  toggleMic,
  setAllAudio,
}: GameLogicProps) => {
  const { client } = useWebSocket();
  const { userSeq } = useAccessTokenState();
  const { gameCode } = useParams();
  const [ghostChatList, setGhostChatList] = useState<ChatList>([]);
  const [zaraChatList, setZaraChatList] = useState<ChatList>([]);
  const [allChatList, setAllChatList] = useState<ChatList>([]);
  const [timer, setTimer] = useState<number>(0);
  const [voteList, setVoteList] = useState<number[]>([]);
  const [deathByVoteOrderNo, setDeathByVoteOrderNo] = useState<number | null>(null);
  const [deathByZaraOrderNo, setDeathByZaraOrderNo] = useState<number | null>(null);
  const [myJobSeq, setMyJobSeq] = useState(0);
  const [gameResult, setGameResult] = useState({});
  const location = useLocation();
  const [userInfo, setUserInfo] = useState([{ userSeq: 0, jobSeq: 0, nickname: "" }]);
  const [zaraList, setZaraList] = useState([{ userSeq: 0, jobSeq: 0, nickname: "" }]);
  const [loading, setLoading] = useState(true);
  const [amIDead, setAmIDead] = useState(false);
  const [amIZara, setAmIZara] = useState(false);

  console.log(
    ghostChatList,
    zaraChatList,
    allChatList,
    voteList,
    deathByZaraOrderNo,
    gameResult,
    location,
    zaraList,
    setAmIDead
  );

  // const userSeqOrderMap: { [userSeq: number]: number } = location.state.userSeqOrderMap;
  const userSeqOrderMap: { [userSeq: number]: number } = {
    4: 0,
    7: 1,
    8: 2,
    5: 3,
    2: 4,
    1: 5,
    6: 6,
    3: 7,
    // userSeq를 userOrder로 매핑
  };
  const myOrderNo = userSeqOrderMap[userSeq];

  useEffect(() => {
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

  const subGame = (gameCode: string) => {
    const url = stompUrl.subGame(gameCode);
    client?.subscribe(url, (subData) => {
      const subDataBody = JSON.parse(subData.body);
      console.log("SUBSCRIBE GAME");
      console.log(subDataBody);
      switch (subDataBody.type) {
        case "START":
          const startData: SubStart = subDataBody;
          const initMyJobSeq = startData.data.find((user) => {
            return user.userSeq === userSeq;
          })?.jobSeq;
          const sortData = startData.data.sort((a, b) => {
            const orderA = userSeqOrderMap[a.userSeq];
            const orderB = userSeqOrderMap[b.userSeq];
            return orderA - orderB; // userOrder 기준으로 정렬
          });
          setAmIZara(sortData[myOrderNo].jobSeq === 2 ? true : false);
          setMyJobSeq(initMyJobSeq!);
          setUserInfo(sortData);
          break;

        case "CHAT":
          const chatData: SubChat = subDataBody;
          const myChatData = {
            userOrder: userSeqOrderMap[chatData.data.sender],
            nickname: chatData.data.nickname,
            message: chatData.data.message,
          };
          setAllChatList((prev) => [...prev, myChatData]);
          break;

        case "TIMER":
          const timerData: SubStartTimer = subDataBody;
          setTimer(timerData.data.time);
          break;

        case "VOTE":
          const voteData: SubVote = subDataBody;
          const newUserVotes: number[] = [0];
          voteData.data.forEach((item) => {
            const order = userSeqOrderMap[item.userSeq];
            newUserVotes[order] = item.cnt;
          });
          setVoteList(newUserVotes);
          break;

        case "VOTE_RESULT":
          const voteResultData: SubVoteResult = subDataBody;
          setDeathByVoteOrderNo(voteResultData.data);
          break;

        case "DEAD":
          const aliveData: SubNightResult = subDataBody;
          setDeathByZaraOrderNo(aliveData.userSeq);
          break;

        case "GAME_RESULT":
          const gameResultData: SubGameResult = subDataBody;
          setGameResult(gameResultData.data);
          break;

        default:
          console.log("잘못된 타입의 데이터가 왔습니다.");
          break;
      }
    });
  };

  const unSubGame = (gameCode: string) => {
    const url = stompUrl.subRoom(gameCode);
    client?.unsubscribe(url);
  };

  const subGameZara = (gameCode: string) => {
    const url = stompUrl.subGameZara(gameCode);
    client?.subscribe(url, (subData) => {
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

        default:
          console.log("잘못된 타입의 데이터가 왔습니다.");
          break;
      }
    });
  };

  const unSubGameZara = (gameCode: string) => {
    const url = stompUrl.subGameZara(gameCode);
    client?.unsubscribe(url);
  };

  const subGameGhost = (gameCode: string) => {
    const url = stompUrl.subGameGhost(gameCode);
    client?.subscribe(url, (subData) => {
      const subDataBody = JSON.parse(subData.body);
      console.log("SUBSCRIBE GAME GHOST");
      console.log(subDataBody);
      switch (subDataBody.type) {
        case "GHOST_CHAT":
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
    const url = stompUrl.subGameGhost(gameCode);
    client?.unsubscribe(url);
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

  return (
    <>
      {!loading && (
        <>
          <GameCamList
            mainStreamManager={mainStreamManager}
            subscribers={subscribers}
            myOrderNo={myOrderNo}
            userInfo={userInfo}
          />
          <GameJobInfo infoOn={infoOn} onSetInfoOn={onSetInfoOn} />
          <GameMyJob myJobSeq={myJobSeq} />
          {/* {viewTime === 1 && <GameVote voteList={voteList} setVoteList={setVoteList} />}
          {viewTime === 2 && <GameNight />} */}
          <GameMenu
            onSetInfoOn={onSetInfoOn}
            toggleVideo={toggleVideo}
            toggleMic={toggleMic}
            setAllAudio={setAllAudio}
          />
          {/* <GameChat
            allChatList={allChatList}
            zaraChatList={zaraChatList}
            ghostChatList={ghostChatList}
            myJobSeq={myJobSeq}
            amIDead={amIDead}
            amIZara={amIZara}
          /> */}
          <GameRabbit
            userInfo={userInfo}
            myOrderNo={myOrderNo}
            setDeathByVoteOrderNo={setDeathByVoteOrderNo}
            deathByVoteOrderNo={deathByVoteOrderNo}
          />
          <GameTimer timer={timer} setTimer={setTimer} />
        </>
      )}
    </>
  );
};
