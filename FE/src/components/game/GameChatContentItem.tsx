import { TEXT_COLOR_MAP } from "../../constants/TextColorMap";

interface GameChatContentItemProps {
  item: {
    index: number;
    nickname: string;
    content: string;
  };
}

export const GameChatContentItem = ({ item }: GameChatContentItemProps) => {
  return (
    <p className={`${TEXT_COLOR_MAP[item.index]}`}>
      {item.nickname} : {item.content}
    </p>
  );
};
