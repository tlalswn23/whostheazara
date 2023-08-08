import { useEffect, useState } from "react";
import { BORDER_COLOR_MAP } from "../../constants/common/ColorMap";
import { JOB_MAP } from "../../constants/common/JobMap";
import GameCamListItemComponent from "./GameCamListItemComponent";

interface GameCamListItemProps {
  item: {
    roomCode: number;
    userNo: number;
    nickname: string;
    locNo: number;
    jobNo: number;
    jobName: string;
    isDie: boolean;
  };
  streamManager: any;
}

export const GameCamListItem = ({ item, streamManager }: GameCamListItemProps) => {
  const [userName, setUserName] = useState("");
  
  useEffect(() => {
    if (streamManager) {
      let obj = JSON.parse(streamManager["stream"]["connection"]["data"]);
      setUserName(() => {
        return obj.clientData;
      });
    }
  }, [streamManager])

  return (
    <div
      className={`relative 3xl:w-[375px] w-[300px] 3xl:h-[250px] h-[200px] bg-black border-solid 3xl:border-[15px] border-[12px] ${
        BORDER_COLOR_MAP[item.locNo]
      }`}
    >
      <GameCamListItemComponent streamManager={streamManager} />
      <p>
      {streamManager != undefined ? (
        <p className={`absolute bottom-[70px] left-[110px] ${JOB_MAP[3].color} drop-shadow-stroke-black-sm font-bold text-[30px]`}>
          {userName}
        </p>
      ) : null }
      </p>
      <p
        className={`absolute bottom-[5px] left-[10px] ${JOB_MAP[3].color} drop-shadow-stroke-black-sm font-bold text-[30px]`}
      >
        경찰
      </p>
      
    </div>
  );
};
