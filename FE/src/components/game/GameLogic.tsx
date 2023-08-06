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

interface GameLogicProps {
  mainStreamManager?: any;
  subscribers: any[];
  infoOn: boolean;
  onSetInfoOn: () => void;
  viewVote: boolean;
  onSetViewVote: () => void;
  toggleVideo: () => void;
  toggleAudio: () => void;
}

export const GameLogic = ({
  infoOn,
  viewVote,
  mainStreamManager,
  subscribers,
  onSetInfoOn,
  onSetViewVote,
  toggleVideo,
  toggleAudio,
}: GameLogicProps) => {
  const { client } = useWebSocket();
  const test = {
    data: 0,
  };
  const roomSeq = 1;
  useEffect(() => {
    console.log("!!!!!!!!!!!!!!!!!!!!!!");
    console.log(client);
    client?.subscribe(`/sub/${roomSeq}/all`, (response) => {
      console.log("=================");
      console.log("=================");
      console.log("SUBSCRIBE");
      console.log(response);
      console.log("=================");
      console.log("=================");
    });
  }, []);
  const onTest = () => {
    if (client?.connected) {
      // const url = chatUrl.publish();
      // const body = JSON.stringify({ code: roomCode, userSeq, message });
      console.log("=================");
      console.log("=================");
      console.log("PUBLISH");
      console.log("=================");
      console.log("=================");
      client?.publish({ destination: "/pub/${roomSeq}/vote", body: JSON.stringify(test) });
    } else {
      console.log("WebSocket is not connected yet");
    }
  };

  const testData = {
    type: "START",
    job: { 11: 0, 12: 1, 13: 2, 14: 3, 15: 4, 16: 5, 17: 0, 18: 1 },
  };
  const [receive, setReceive] = useState(false);
  const onReceive = () => {
    setReceive(!receive);
  };

  const user = [
    {
      userSeq: 11,
      nickName: "seulho",
    },
    {
      userSeq: 12,
      nickName: "go",
    },
    {
      userSeq: 13,
      nickName: "jesung",
    },
    {
      userSeq: 14,
      nickName: "chan",
    },
    {
      userSeq: 15,
      nickName: "seo",
    },
    {
      userSeq: 16,
      nickName: "gugu",
    },
    {
      userSeq: 17,
      nickName: "simin",
    },
    {
      userSeq: 18,
      nickName: "olimpic",
    },
  ];

  useEffect(() => {
    if (testData.type === "START") {
      initJob();
    }
    console.log(user);
  }, [receive]);

  const initJob = () => {
    setJobNo(testData.job[mySeqNo]);
  };

  const mySeqNo = 11;
  const [jobNo, setJobNo] = useState(0);
  return (
    <>
      <button className="absolute w-[100px] h-[100px] text-[20px] bg-red-200 cursor-pointer z-50" onClick={onTest}>
        TEST
      </button>
      <button
        className="absolute top-[300px] w-[100px] h-[100px] text-[20px] bg-green-200 cursor-pointer z-50"
        onClick={onReceive}
      >
        TEST
      </button>
      <GameCamList mainStreamManager={mainStreamManager} subscribers={subscribers} />
      <GameJobInfo infoOn={infoOn} onSetInfoOn={onSetInfoOn} />
      <GameMyJob jobNo={jobNo} />
      {viewVote && <GameVote />}
      <GameMenu onSetInfoOn={onSetInfoOn} toggleVideo={toggleVideo} toggleAudio={toggleAudio} />
      <GameChat />
      <GameRabbit />
      <GameTimer onSetViewVote={onSetViewVote} />
    </>
  );
};
