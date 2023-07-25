import { GameChatContentItem } from "./GameChatContentItem";
import { test } from "./GameChat";
interface GameChatContentProps {
  chat: test[];
}

export const GameChatContent = ({ chat }: GameChatContentProps) => {
  return (
    <>
      <div className="absolute left-[10px] top-[10px] w-[260px] h-[216px] py-[4px] px-[8px] overflow-scroll">
        {chat.map((item) => (
          <GameChatContentItem item={item} key={item.index} />
        ))}
      </div>
    </>
  );
};
