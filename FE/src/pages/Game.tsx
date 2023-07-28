import { useState } from "react";
import { GameCamList } from "../components/game/GameCamList";
import { GameChat } from "../components/game/GameChat";
import { GameMenu } from "../components/game/GameMenu";
import { GameTimer } from "../components/game/GameTimer";
import { GameJobInfo } from "../components/modal/GameJobInfo";
import { GameLayout } from "../layouts/GameLayout";
import { GameVote } from "../components/game/GameVote";
import { GameRabbit } from "../components/game/GameRabbit";

export const Game = () => {
  const [infoOn, setInfoOn] = useState(false);
  const [viewVote, setViewVote] = useState(false);
  const onSetViewVote = () => {
    setViewVote(!viewVote);
  };
  const onSetInfoOn = () => {
    setInfoOn(!infoOn);
  };

  return (
    <GameLayout>
      <GameCamList />
      <GameJobInfo infoOn={infoOn} onSetInfoOn={onSetInfoOn} />
      {viewVote && <GameVote />}
      <GameMenu onSetInfoOn={onSetInfoOn} />
      <GameChat />
      <GameRabbit />
      <GameTimer onSetViewVote={onSetViewVote} />
    </GameLayout>
  );
};
