import { useState } from "react";
import gameChatImg from "../../assets/img/game/gameChatImg.png";
import { GameChatContent } from "./GameChatContent";
import { GameChatInput } from "./GameChatInput";
import { GameChatTab } from "./GameChatTab";

export const GameChat = () => {
  const [selectTab, setSelectTab] = useState(0);
  const onSetSelectTab = (index: number) => setSelectTab(index);
  const chat1 = [
    {
      index: 1,
      nickname: "test",
      content: "Hiiiiiiii",
    },
    {
      index: 2,
      nickname: "jetty",
      content: "안녕",
    },
    {
      index: 3,
      nickname: "bbb",
      content: "반가워요",
    },
    {
      index: 4,
      nickname: "cola",
      content: "나는 토끼",
    },
    {
      index: 5,
      nickname: "gae",
      content: "하이이이",
    },
    {
      index: 6,
      nickname: "gu",
      content: "개굴 개굴",
    },
    {
      index: 7,
      nickname: "rhi",
      content: "아아아아아아아메리카노아아아아메리카노",
    },
    {
      index: 8,
      nickname: "bamm",
      content: "나는 뱀",
    },
  ];
  const chat2 = [
    {
      index: 1,
      nickname: "test",
      content: "Hiiiiiiii",
    },
    {
      index: 2,
      nickname: "jetty",
      content: "안녕",
    },
  ];
  const chat3 = [
    {
      index: 6,
      nickname: "gu",
      content: "개굴 개굴",
    },
    {
      index: 7,
      nickname: "rhi",
      content: "아아아아아아아메리카노아아아아메리카노",
    },
    {
      index: 8,
      nickname: "bamm",
      content: "나는 뱀",
    },
  ];

  return (
    <div
      className="absolute 3xl:top-[312px] top-[250px] left-0 3xl:w-[350px] w-[280px] 3xl:h-[350px] h-[280px] bg-cover opacity-80"
      style={{ backgroundImage: `url(${gameChatImg})` }}
    >
      <GameChatTab selectTab={selectTab} onSetSelectTab={onSetSelectTab} />

      {selectTab === 0 && (
        <div>
          <GameChatContent chat={chat1} />
          <GameChatInput />
        </div>
      )}
      {selectTab === 1 && (
        <div>
          <GameChatContent chat={chat2} />
          <GameChatInput />
        </div>
      )}
      {selectTab === 2 && (
        <div>
          <GameChatContent chat={chat3} />
          <GameChatInput />
        </div>
      )}
    </div>
  );
};
