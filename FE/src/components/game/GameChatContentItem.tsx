import { TEXT_COLOR_MAP } from "../../constants/TextColorMap";

export const GameChatContentItem = () => {
  const test = {
    index: 1,
    nickname: "test",
    content: "Hiiiiiiii",
  };
  return (
    <p className={`${TEXT_COLOR_MAP[1]}`}>
      {test.nickname} : {test.content}
    </p>
  );
};
