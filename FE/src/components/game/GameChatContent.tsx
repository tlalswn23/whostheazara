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
      <div className="absolute 3xl:left-[12.5px] left-[10px] 3xl:top-[12.5px] top-[10px] 3xl:w-[325px] w-[260px] 3xl:h-[270px] h-[216px] 3xl:py-[5px] py-[4px] 3xl:px-[10px] px-[8px] overflow-x-hidden overflow-y-scroll">
        {chat.map((item) => (
          <GameChatContentItem item={item} key={item.index} />
        ))}
      </div>
    </>
  );
};
