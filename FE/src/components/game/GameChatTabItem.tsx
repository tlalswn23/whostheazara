import gameTabImg from "../../assets/img/game/gameTabImg.png";

interface GameChatTabItemProps {
  tabType: number;
  selectTab: number;
  onSetSelectTab: (num: number) => void;
}

export const GameChatTabItem = ({ tabType, selectTab, onSetSelectTab }: GameChatTabItemProps) => {
  const text = ["전체", "자라", "유령"];
  const color = ["text-yellow-300", "text-green-400", "text-pink-400"];
  return (
    <div
      className={`3xl:w-[80px] w-[64px] 3xl:h-[40px] h-[32px] bg-cover ${
        selectTab === tabType ? "bg-gray-900" : "bg-gray-800"
      } 3xl:text-[22.5px] text-[18px] flex justify-center items-end opacity-75 border-solid border-t-[6px] border-x-[6px] border-gray-400 ${
        color[tabType]
      }`}
      onClick={() => onSetSelectTab(tabType)}
    >
      <p>{text[tabType]}</p>
    </div>
  );
};
