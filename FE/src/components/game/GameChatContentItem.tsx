import { TEXT_COLOR_MAP } from "../../constants/common/TextColorMap";

interface GameChatContentItemProps {
  chat: {
    userOrder: number;
    nickname: string;
    message: string;
  };
}

export const GameChatContentItem = ({ chat }: GameChatContentItemProps) => {
  return (
    <p className={`${TEXT_COLOR_MAP[chat.userOrder]} 3xl:text-[20px] [text-[16px]`}>
      {chat.nickname} : {chat.message}
    </p>
  );
};
