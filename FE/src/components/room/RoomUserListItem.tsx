import { RABBIT_MAP } from "../../constants/common/RabbitMap";
import { RABBIT_STATE_MAP } from "../../constants/game/RabbitStateMap";

interface RoomUserListItemProps {
  nickName: string;
  key: number;
}

export const RoomUserListItem = ({ nickName, key }: RoomUserListItemProps) => {
  return (
    <>
      <div className="3xl:text-[30px] text-[24px] w-full 3xl:h-[50px] h-[40px] flex justify-center items-center flex-wrap">
        <p className="text-center">{nickName}</p>
      </div>
      <div className="relative">
        <img
          className="absolute 3xl:top-[-10px] top-[-8px] 3xl:left-[5px] left-[4px] 3xl:w-[250px] w-[200px] 3xl:h-[250px] h-[200px]"
          src={RABBIT_MAP[key - 1].IMG[RABBIT_STATE_MAP.STAND]}
        />
      </div>
    </>
  );
};
