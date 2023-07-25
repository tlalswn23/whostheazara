import gameTabImg from "../../assets/img/gameTabImg.png";

interface GameChatTabItemProps {
  index: number;
  selectTab: number;
  setSelectTab: (num: number) => void;
}

export const GameChatTabItem = ({ index, selectTab, setSelectTab }: GameChatTabItemProps) => {
  const text = ["전체", "자라", "유령"];
  const color = ["text-yellow-300", "text-green-400", "text-pink-400"];
  return (
    <div
      className={`w-[64px] h-[30px] bg-cover ${
        selectTab === index ? color[index] : "text-white"
      } text-[18px] flex justify-center items-end cursor-pointer`}
      style={{ backgroundImage: `url(${gameTabImg})` }}
      onClick={() => setSelectTab(index)}
    >
      <p>{text[index]}</p>
    </div>
  );
};
