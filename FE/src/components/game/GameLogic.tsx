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
  onSetViewTime: () => void;
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
  onSetViewTime,
  toggleVideo,
  toggleMic,
  setAllAudio,
}: GameLogicProps) => {
  const { client } = useWebSocket();
  const { userSeq, accessToken } = useAccessTokenState();
  const { gameCode } = useParams();
  const [allChatList, setAllChatList] = useState([
    {
      userOrder: 0,
      nickname: "",
      message: "",
    },
  ]);
  const [timer, setTimer] = useState<number>(0);
  const [voteList, setVoteList] = useState([{}]);
  const [deathByVote, setDeathByVote] = useState<number>(0);
  const [deathByZara, setDeathByZara] = useState<number | null>();
  const [myJobSeq, setMyJobSeq] = useState(0);
  const [gameResult, setGameResult] = useState({});
  const location = useLocation();
  const [zaraUser, setZaraUser] = useState({});
  // const userSeqOrderMap: { [key: number]: number } = location.state.userSeqOrderMap;
  console.log(allChatList, timer, voteList, deathByVote, deathByZara, myJobSeq, gameResult);

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
              // userOrder: userSeqOrderMap[chatData.sender],
              nickname: chatData.nickname,
              message: chatData.message,
            };
            // setAllChatList((prev) => [...prev, myChatData]);
            break;

          case "TIMER":
            const timerData: SubStartTimer = subDataBody;
            setTimer(timerData.data);
            break;

          case "VOTE":
            const voteData: SubVote = subDataBody;
            setVoteList(voteData.data);
            break;

          case "VOTE_RESULT":
            const voteResultData: SubVoteResult = subDataBody;
            setDeathByVote(voteResultData.data);
            break;

          case "DEAD":
            const aliveData: SubNightResult = subDataBody;
            setDeathByZara(aliveData.userSeq);
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

  useEffect(() => {
    if (!gameCode) return;
    subGame(gameCode);

    return () => {
      unSubGame;
    };
  }, [gameCode]);

  return (
    <>
      <GameCamList mainStreamManager={mainStreamManager} subscribers={subscribers} myJobSeq={myJobSeq} />
      <GameJobInfo infoOn={infoOn} onSetInfoOn={onSetInfoOn} />
      <GameMyJob myJobSeq={myJobSeq} />
      {viewTime === 1 && <GameVote />}
      {viewTime === 2 && <GameNight />}
      <GameMenu onSetInfoOn={onSetInfoOn} toggleVideo={toggleVideo} toggleMic={toggleMic} setAllAudio={setAllAudio} />
      <GameChat allChatList={allChatList} />
      <GameRabbit />
      <GameTimer onSetViewTime={onSetViewTime} />
    </>
  );
};
