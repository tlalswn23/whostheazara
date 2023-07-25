import { useState } from "react";
import { GameChatTabItem } from "./GameChatTabItem";

export const GameChatTab = () => {
  const [selectTab, setSelectTab] = useState(0);
  const [viewTab, setViewTab] = useState([true, true, true]);
  return (
    <div className="absolute left-[10px] top-[-28px]">
      <div className="flex justify-start">
        {viewTab[0] ? <GameChatTabItem index={0} selectTab={selectTab} setSelectTab={setSelectTab} /> : ""}
        {viewTab[1] ? <GameChatTabItem index={1} selectTab={selectTab} setSelectTab={setSelectTab} /> : ""}
        {viewTab[2] ? <GameChatTabItem index={2} selectTab={selectTab} setSelectTab={setSelectTab} /> : ""}
      </div>
    </div>
  );
};
