import gameChatImg from "../../assets/img/gameChatImg.png";
import { GameChatContent } from "./GameChatContent";
import { GameChatInput } from "./GameChatInput";
import { GameChatTab } from "./GameChatTab";

export const GameChat = () => {
  return (
    <div
      className="absolute top-[250px] left-0 w-[280px] h-[280px] bg-cover opacity-80"
      style={{ backgroundImage: `url(${gameChatImg})` }}
    >
      <GameChatTab />
      <GameChatContent />
      <GameChatInput />
    </div>
  );
};
