import { BORDER_COLOR_MAP } from "../../constants/common/ColorMap";
import { JOB_MAP } from "../../constants/common/JobMap";
import GameCamListItemComponent from "./GameCamListItemComponent";

interface GameCamListItemProps {
  item: {
    roomCode: number;
    userNo: number;
    nickname: string;
    orderNo: number;
    jobNo: number;
    jobName: string;
    isDie: boolean;
  };
  streamManager: any;
}

export const GameCamListItem = ({ item, streamManager }: GameCamListItemProps) => {
  const myOrderNo = 1;
  const myJobNo = 0;
  return (
    <div
      className={`relative 3xl:w-[375px] w-[300px] 3xl:h-[250px] h-[200px] bg-black border-solid 3xl:border-[15px] border-[12px] ${
        BORDER_COLOR_MAP[item.orderNo]
      }`}
    >
      <GameCamListItemComponent streamManager={streamManager} />$
      {myOrderNo === item.orderNo && (
        <p
          className={`absolute bottom-[5px] left-[10px] ${JOB_MAP[myJobNo].color} drop-shadow-stroke-black-sm font-bold text-[30px]`}
        >
          {JOB_MAP[myJobNo].name}
        </p>
      )}
      {/* { streamManager != undefined ? (
        <p className="text-white">{streamManager["stream"]["connection"]["data"]}</p>
      ) : null }  // 사용자 이름 확인용 */}
    </div>
  );
};
