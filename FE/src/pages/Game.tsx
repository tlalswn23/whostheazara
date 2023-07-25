import { GameCamList } from "../components/game/GameCamList";
import { GameChat } from "../components/game/GameChat";
import { GameLayout } from "../layouts/GameLayout";

export const Game = () => {
  return (
    <GameLayout>
      <GameCamList />
      <GameChat />
    </GameLayout>
  );
};
