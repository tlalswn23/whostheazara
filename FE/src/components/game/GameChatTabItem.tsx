import gameTabImg from "../../assets/img/game/gameTabImg.png";

interface GameChatTabItemProps {
  tabType: number;
  selectTab: number;
  onSetSelectTab: (num: number) => void;
  alert: boolean;
  nowTime: string;
}

export const GameChatTabItem = ({ tabType, selectTab, onSetSelectTab, alert, nowTime }: GameChatTabItemProps) => {
  const text = ["전체", "자라", "유령"];
  const color = ["text-yellow-300", "text-green-400", "text-pink-400"];
  return (
    <>
      <div
        className={`relative 3xl:w-[80px] w-[64px] 3xl:h-[37.5px] h-[30px] bg-cover ${
          selectTab === tabType ? color[tabType] : "text-white"
        } 3xl:text-[22.5px] text-[18px] flex justify-center items-end 3xl:mr-[2px] mr-[1.6px]`}
        style={{ backgroundImage: `url("${gameTabImg}")` }}
        onClick={() => onSetSelectTab(tabType)}
      >
        <p>{text[tabType]}</p>
        {alert && (
          <div className="absolute">
            <div className="relative flex 3xl:h-[20px] h-[16px] 3xl:w-[20px] w-[16px] 3xl:top-[-25px] top-[-20px] 3xl:left-[-35px] left-[28px] ">
              <span className="animate-ping absolute h-full w-full rounded-full bg-red-400 opacity-75 3xl:text-[2px] text-[1.6px] justify-center items-center flex">
                <p className="text-center">N</p>
              </span>
              <span className="relative rounded-full 3xl:h-[20px] h-[16px] 3xl:w-[20px] w-[16px] bg-red-500 3xl:text-[2px] text-[1.6px] justify-center items-center flex">
                <p className="text-center">N</p>
              </span>
            </div>
          </div>
        )}
        {tabType === 0 && (nowTime === "NIGHT" || nowTime === "NIGHT_RESULT") && (
          <div className="absolute z-10 3xl:w-[320px] w-[256px] 3xl:h-[45px] h-[36px] left-0 3xl:top-[330px] top-[264px] text-black flex justify-center items-center 3xl:text-[18px] text-[14.4px] bg-gray-200">
            밤에는 전체 채팅을 할 수 없습니다.
          </div>
        )}
        {tabType === 1 && !(nowTime === "NIGHT" || nowTime === "NIGHT_RESULT") && (
          <div className="absolute z-10 3xl:w-[320px] w-[256px] 3xl:h-[45px] h-[36px] 3xl:left-[-80px] left-[-64px] 3xl:top-[330px] top-[264px] text-red-600 flex justify-center items-center 3xl:text-[15px] text-[12px] bg-white">
            낮, 투표에는 자라 채팅을 할 수 없습니다.
          </div>
        )}
      </div>
    </>
  );
};
