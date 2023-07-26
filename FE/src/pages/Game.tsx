import { GameCamList } from "../components/game/GameCamList";
import { GameChat } from "../components/game/GameChat";
import { GameMenu } from "../components/game/GameMenu";
import { GameTimer } from "../components/game/GameTimer";
import { GameLayout } from "../layouts/GameLayout";

export const Game = () => {
  return (
    <GameLayout>
      <GameCamList />
      <GameTimer />
      <GameChat />
      <GameMenu />
    </GameLayout>
  );
};
