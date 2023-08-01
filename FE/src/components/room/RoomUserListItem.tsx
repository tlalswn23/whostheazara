import { TEXT_COLOR_MAP } from "../../constants/common/TextColorMap";
import { BORDER_COLOR_MAP } from "../../constants/game/ColorMap";
import { RABBIT_MAP } from "../../constants/game/RabbitMap";
import { RABBIT_STATE_MAP } from "../../constants/game/RabbitStateMap";

interface RoomUserListItemProps {
  item: number;
}

export const RoomUserListItem = ({ item }: RoomUserListItemProps) => {
  return (
    <>
      <div
        className={`3xl:w-[275px] w-[220px] 3xl:h-[337.5px] h-[270px] 3xl:border-[10px] border-[8px] ${BORDER_COLOR_MAP[item]} ${TEXT_COLOR_MAP[item]} bg-gray-900 3xl:mb-[25px] mb-[20px] 3xl:mx-[12.5px] mx-[10px]`}
      >
        <div className="3xl:text-[30px] text-[24px] w-full 3xl:h-[50px] h-[40px] flex justify-center items-center flex-wrap">
          <p className="text-center">치즈볼맛있어</p>
        </div>
        <div className="relative">
          <img
            className="absolute 3xl:top-[-10px] top-[-8px] 3xl:left-[5px] left-[4px] 3xl:w-[250px] w-[200px] 3xl:h-[250px] h-[200px]"
            src={RABBIT_MAP[item - 1].IMG[RABBIT_STATE_MAP.STAND]}
          />
        </div>
        <div className="flex items-end justify-around 3xl:h-[270px] h-[216px] 3xl:p-[10px] p-[8px]">
          <p className="text-center 3xl:text-[20px] text-[16px]">Lv 24</p>
          <p className="text-center 3xl:text-[20px] text-[16px]">60승 40패 (60%)</p>
        </div>
      </div>
    </>
  );
};
