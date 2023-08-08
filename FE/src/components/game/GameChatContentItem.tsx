import { TEXT_COLOR_MAP } from "../../constants/common/TextColorMap";

interface GameChatContentItemProps {
  chat: {
    userNo: number;
    nickname: string;
    message: string;
  };
}

export const GameChatContentItem = ({ chat }: GameChatContentItemProps) => {
  return (
    <p className={`${TEXT_COLOR_MAP[chat.userNo]} 3xl:text-[20px] [text-[16px]`}>
      {chat.nickname} : {chat.message}
    </p>
  );
};
