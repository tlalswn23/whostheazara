import { GameChatContentItem } from "./GameChatContentItem";

export const GameChatContent = () => {
  return (
    <>
      <div className="absolute left-[10px] top-[10px] w-[260px] h-[216px] py-[4px] px-[8px]">
        <GameChatContentItem />
        <GameChatContentItem />
        <GameChatContentItem />
        <GameChatContentItem />
      </div>
    </>
  );
};
