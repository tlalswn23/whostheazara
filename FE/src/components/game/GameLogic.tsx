import { GameCamList } from "./GameCamList";
import { GameChat } from "./GameChat";
import { GameMenu } from "./GameMenu";
import { GameTimer } from "./GameTimer";
import { GameJobInfo } from "../modal/GameJobInfo";
import { GameMyJob } from "../modal/GameMyJob";
import { GameVote } from "./GameVote";
import { GameRabbit } from "./GameRabbit";
// import { useWebSocket } from "../../context/socketContext";
// import { useEffect } from "react";

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
  // const { client } = useWebSocket();
  // const test = {
  //   data: 0,
  // };
  // useEffect(() => {
  //   client?.subscribe("/sub/randomJob/{roomSeq}", (response) => {
  //     console.log("=================");
  //     console.log("=================");
  //     console.log("SUBSCRIBE");
  //     console.log(response);
  //     console.log("=================");
  //     console.log("=================");
  //   });
  // }, []);
  // const onTest = () => {
  //   if (client?.connected) {
  //     // const url = chatUrl.publish();
  //     // const body = JSON.stringify({ code: roomCode, userSeq, message });
  //     console.log("=================");
  //     console.log("=================");
  //     console.log("PUBLISH");
  //     console.log("=================");
  //     console.log("=================");
  //     client?.publish({ destination: "/pub/randomJob/{roomSeq}", body: JSON.stringify(test) });
  //   } else {
  //     console.log("WebSocket is not connected yet");
  //   }
  // };
  return (
    <>
      {/* <button className="absolute w-[800px] h-[800px] text-[200px] bg-red-200 cursor-pointer z-50" onClick={onTest}>
        TEST
      </button> */}
      <GameCamList mainStreamManager={mainStreamManager} subscribers={subscribers} />
      <GameJobInfo infoOn={infoOn} onSetInfoOn={onSetInfoOn} />
      <GameMyJob />
      {viewVote && <GameVote />}
      <GameMenu onSetInfoOn={onSetInfoOn} toggleVideo={toggleVideo} toggleAudio={toggleAudio} />
      <GameChat />
      <GameRabbit />
      <GameTimer onSetViewVote={onSetViewVote} />
    </>
  );
};
