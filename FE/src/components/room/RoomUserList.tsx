import { BORDER_COLOR_MAP, CLOSE_COLOR_MAP } from "../../constants/common/ColorMap";
import { TEXT_COLOR_MAP } from "../../constants/common/TextColorMap";
import { RoomUserListItem } from "./RoomUserListItem";
import { useState } from "react";

export const RoomUserList = () => {
  const [seat, setSeat] = useState([1, 1, 1, 1, 2, 2, 2, 3]); // 1 사람있음, 2 빈자리, 3 자리막음
  const onToggleClose = (loc: number) => {
    if (seat[loc] != 1) {
      const changeSeat = seat.map((item, index) => {
        if (loc === index) {
          return item === 2 ? 3 : 2;
        }
        return item;
      });
      setSeat(changeSeat);
    }
  };
  return (
    <>
      <div className="3xl:w-[1225px] w-[980px] 3xl:h-[700px] h-[560px] 3xl:text-[56px] text-[44.8px] font-bold bg-transparent">
        <div className="flex flex-wrap justify-end">
          {seat.map((item, index) => (
            <div
              className={`3xl:w-[275px] w-[220px] 3xl:h-[337.5px] h-[270px] 3xl:border-[10px] border-[8px] ${
                BORDER_COLOR_MAP[index + 1]
              } ${TEXT_COLOR_MAP[index + 1]} ${
                item != 1 && "cursor-pointer"
              } bg-gray-900 3xl:mb-[25px] mb-[20px] 3xl:mx-[12.5px] mx-[10px]`}
              key={index}
              onClick={() => onToggleClose(index)}
            >
              {item === 1 && <RoomUserListItem item={index + 1} key={index} />}
              {item === 3 && <img src={CLOSE_COLOR_MAP[index + 1]} alt="close seat" className="mt-[40px] ml-[36px]" />}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
