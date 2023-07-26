import { GameChatContentItem } from "./GameChatContentItem";

interface GameChatContentProps {
  chat: {
    index: number;
    nickname: string;
    content: string;
  }[];
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
