import { BORDER_COLOR_MAP, CLOSE_COLOR_MAP } from "../../constants/common/ColorMap";
import { TEXT_COLOR_MAP } from "../../constants/common/TextColorMap";
import { RoomUserListItem } from "./RoomUserListItem";
import { ROOM_SEAT_STATE_MAP } from "../../constants/room/roomSeatStateMap";
import { CurSeats } from "../../types/RoomSettingType";

interface RoomUserListProps {
  curSeats: CurSeats;
  setCurSeats: React.Dispatch<React.SetStateAction<CurSeats>>;
}

export const RoomUserList = ({ curSeats, setCurSeats }: RoomUserListProps) => {
  const onToggleClose = (loc: number) => {
    if (curSeats[loc].state === ROOM_SEAT_STATE_MAP.OCCUPIED_SEAT) return;

    setCurSeats((prev) => {
      const newCurSeats = [...prev];
      if (newCurSeats[loc].state === ROOM_SEAT_STATE_MAP.CLOSE_SEAT) {
        newCurSeats[loc].state = ROOM_SEAT_STATE_MAP.EMPTY_SEAT;
      }
      if (newCurSeats[loc].state === ROOM_SEAT_STATE_MAP.EMPTY_SEAT) {
        newCurSeats[loc].state = ROOM_SEAT_STATE_MAP.CLOSE_SEAT;
      }
      return newCurSeats as CurSeats;
    });
  };

  return (
    <div className="3xl:w-[1225px] w-[980px] 3xl:h-[700px] h-[560px] 3xl:text-[56px] text-[44.8px] font-bold bg-transparent">
      <div className="flex flex-wrap justify-end">
        {curSeats.map((seats, index) => (
          <div
            className={`3xl:w-[275px] w-[220px] 3xl:h-[337.5px] h-[270px] 3xl:border-[10px] border-[8px] ${
              BORDER_COLOR_MAP[index + 1]
            } ${TEXT_COLOR_MAP[index + 1]} ${
              seats.state !== ROOM_SEAT_STATE_MAP.OCCUPIED_SEAT && "cursor-pointer"
            } bg-gray-900 3xl:mb-[25px] mb-[20px] 3xl:mx-[12.5px] mx-[10px]`}
            key={index}
            onClick={() => onToggleClose(index)}
          >
            {seats.state === ROOM_SEAT_STATE_MAP.OCCUPIED_SEAT && (
              <RoomUserListItem nickName={seats.nickName} key={index} />
            )}
            {seats.state === ROOM_SEAT_STATE_MAP.CLOSE_SEAT && (
              <img src={CLOSE_COLOR_MAP[index + 1]} alt="close seat" className="mt-[40px] ml-[36px]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
