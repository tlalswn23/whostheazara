import { GameCamList } from "./GameCamList";
import { GameChat } from "./GameChat";
import { GameMenu } from "./GameMenu";
import { GameTimer } from "./GameTimer";
import { GameJobInfo } from "../modal/GameJobInfo";
import { GameMyJob } from "../modal/GameMyJob";
import { GameVote } from "./GameVote";
import { GameRabbit } from "./GameRabbit";

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
  return (
    <>
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
