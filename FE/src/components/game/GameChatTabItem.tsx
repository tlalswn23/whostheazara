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
      className={`3xl:w-[80px] w-[64px] 3xl:h-[37.5px] h-[30px] bg-cover ${
        selectTab === tabType ? color[tabType] : "text-white"
      } 3xl:text-[22.5px] text-[18px] flex justify-center items-end`}
      style={{ backgroundImage: `url("${gameTabImg}")` }}
      onClick={() => onSetSelectTab(tabType)}
    >
      <p>{text[tabType]}</p>
    </div>
  );
};
