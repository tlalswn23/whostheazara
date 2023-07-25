import { useState } from "react";
import { GameChatTabItem } from "./GameChatTabItem";

interface GameChatTabProps {
  selectTab: number;
  onSetSelectTab: (num: number) => void;
}

export const GameChatTab = ({ selectTab, onSetSelectTab }: GameChatTabProps) => {
  const [viewTab, setViewTab] = useState([true, true, true]);
  return (
    <div className="absolute left-[10px] top-[-28px]">
      <div className="flex justify-start">
        {viewTab[0] ? <GameChatTabItem index={0} selectTab={selectTab} onSetSelectTab={onSetSelectTab} /> : ""}
        {viewTab[1] ? <GameChatTabItem index={1} selectTab={selectTab} onSetSelectTab={onSetSelectTab} /> : ""}
        {viewTab[2] ? <GameChatTabItem index={2} selectTab={selectTab} onSetSelectTab={onSetSelectTab} /> : ""}
      </div>
    </div>
  );
};
