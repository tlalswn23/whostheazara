import { useState } from "react";
import { GameCamList } from "../components/game/GameCamList";
import { GameChat } from "../components/game/GameChat";
import { GameMenu } from "../components/game/GameMenu";
import { GameTimer } from "../components/game/GameTimer";
import { GameJobInfo } from "../components/modal/GameJobInfo";
import { GameLayout } from "../layouts/GameLayout";

export const Game = () => {
  const [infoOn, setInfoOn] = useState(false);
  const onSetInfoOn = () => {
    setInfoOn(!infoOn);
  };
  return (
    <GameLayout>
      <GameCamList />
      <GameTimer />
      <GameChat />
      <GameMenu onSetInfoOn={onSetInfoOn} />
      <GameJobInfo infoOn={infoOn} onSetInfoOn={onSetInfoOn} />
    </GameLayout>
  );
};
