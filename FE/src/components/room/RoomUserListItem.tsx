import userListBox from "../../assets/img/room/userListBox.png";
import { TEXT_COLOR_MAP } from "../../constants/common/TextColorMap";
import { BACK_COLOR_MAP, BORDER_COLOR_MAP, SHADOW_COLOR_MAP } from "../../constants/game/ColorMap";
import { RABBIT_MAP } from "../../constants/game/RabbitMap";
import { RABBIT_STATE_MAP } from "../../constants/game/RabbitStateMap";

interface RoomUserListItemProps {
  item: number;
}

export const RoomUserListItem = ({ item }: RoomUserListItemProps) => {
  return (
    <>
      <div
        className={`3xl:w-[220px] w-[240px] 3xl:h-[240px] h-[192px] 3xl:mx-[21px] mx-[16.8px] 3xl:my-[22px] my-[17.6px] border-[4px] ${BORDER_COLOR_MAP[item]} ${TEXT_COLOR_MAP[item]} rounded-lg flex flex-wrap items-center`}
      >
        <div className="flex text-[20px] w-full h-[30px] justify-between p-[10px]">
          <p className="text-center">Lv 24</p>
          <p className="text-center">강북고릴라들</p>
        </div>
        <img src={RABBIT_MAP[item - 1].IMG[RABBIT_STATE_MAP.STAND]} />
      </div>
    </>
  );
};
