import { GameCamList } from "./GameCamList";
import { GameChat } from "./GameChat";
import { GameMenu } from "./GameMenu";
import { GameTimer } from "./GameTimer";
import { GameJobInfo } from "../modal/GameJobInfo";
import { GameMyJob } from "../modal/GameMyJob";
import { GameVote } from "./GameVote";
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
import { GameNight } from "./GameNight";
import { useLocation } from "react-router-dom";

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
  viewTime,
  mainStreamManager,
  subscribers,
  onSetInfoOn,
  toggleVideo,
  toggleMic,
  setAllAudio,
}: GameLogicProps) => {
  const { client } = useWebSocket();
  const { userSeq, accessToken } = useAccessTokenState();
  const { gameCode } = useParams();
  const [ghostChatList, setGhostChatList] = useState([
    {
      userOrder: 0,
      nickname: "",
      message: "",
    },
  ]);
  const [zaraChatList, setZaraChatList] = useState([
    {
      userOrder: 0,
      nickname: "",
      message: "",
    },
  ]);
  const [allChatList, setAllChatList] = useState([
    {
      userOrder: 0,
      nickname: "",
      message: "",
    },
  ]);
  const [timer, setTimer] = useState<number>(0);
  const [voteList, setVoteList] = useState<number[]>([]);
  const [deathByVoteOrderNo, setDeathByVoteOrderNo] = useState<number>(0);
  const [deathByZaraOrderNo, setDeathByZaraOrderNo] = useState<number | null>();
  const [myJobSeq, setMyJobSeq] = useState(0);
  const [gameResult, setGameResult] = useState({});
  const location = useLocation();
  const [zaraUser, setZaraUser] = useState({});
  const [amIDead, setAmIDead] = useState(false);
  const userSeqOrderMap: { [key: number]: number } = location.state.userSeqOrderMap;

  const subGame = (gameCode: string) => {
    console.log(userSeq);
    console.log(myJobSeq);
    const url = stompUrl.subGame(gameCode);
    client?.subscribe(
      url,
      (subData) => {
        const subDataBody = JSON.parse(subData.body);
        console.log("SUBSCRIBE GAME");
        console.log(subDataBody);
        switch (subDataBody.type) {
          case "START":
            const startData: SubStart = subDataBody;
            console.log("==");
            console.log(startData);
            const initMyJobSeq = startData.data.find((user) => {
              return user.userSeq === userSeq;
            })?.jobSeq;
            setMyJobSeq(initMyJobSeq!);

            if (myJobSeq === 2) {
              const initIsZara = startData.data.filter((user) => {
                return user.jobSeq === 2;
              });
              setZaraUser(initIsZara);
            }
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
            setTimer(timerData.data);
            break;

          case "VOTE":
            const voteData: SubVote = subDataBody;
            const newUserVotes: number[] = [];
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
      },
      {
        Authorization: `Bearer ${accessToken}`,
      }
    );
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
    if (!myJobSeq) return;
    if (myJobSeq !== 2) return;
    if (!gameCode) return;
    subGameZara(gameCode);

    return () => {
      unSubGameZara(gameCode);
    };
  }, [myJobSeq]);

  useEffect(() => {
    if (!gameCode) return;
    subGame(gameCode);

    return () => {
      unSubGame;
    };
  }, [gameCode]);

  useEffect(() => {
    if (!amIDead) return;
    if (!gameCode) return;
    subGameZara(gameCode);

    return () => {
      unSubGameZara(gameCode);
    };
  }, [amIDead]);

  return (
    <>
      <GameCamList mainStreamManager={mainStreamManager} subscribers={subscribers} myJobSeq={myJobSeq} />
      <GameJobInfo infoOn={infoOn} onSetInfoOn={onSetInfoOn} />
      <GameMyJob myJobSeq={myJobSeq} />
      {viewTime === 1 && <GameVote voteList={voteList} setVoteList={setVoteList} />}
      {viewTime === 2 && <GameNight />}
      <GameMenu onSetInfoOn={onSetInfoOn} toggleVideo={toggleVideo} toggleMic={toggleMic} setAllAudio={setAllAudio} />
      <GameChat allChatList={allChatList} zaraChatList={zaraChatList} ghostChatList={ghostChatList} />
      <GameRabbit />
      <GameTimer timer={timer} setTimer={setTimer} />
    </>
  );
};
