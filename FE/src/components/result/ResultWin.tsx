import { RABBIT_MAP } from "../../constants/common/RabbitMap";
import { RABBIT_STATE_MAP } from "../../constants/game/RabbitStateMap";
import { JOB_MAP } from "../../constants/common/JobMap";

interface ResultLoseProps {
  order: number;
  nickname: string;
  jobSeq: number;
}

export const ResultWin = ({ order, nickname, jobSeq }: ResultLoseProps) => {
  return (
    <>
      <div className="flex flex-col justify-center w-[220px] h-250px]">
        <div className="w-[220px] flex flex-col items-center text-[22.5px]">
          <p className="w-auto">{nickname}</p>
          <p className="w-auto">{JOB_MAP[jobSeq].name}</p>
        </div>
        <div className="flex justify-center items-center w-[260px] h-[220px]">
          <img className="w-[260px] h-[260x] mr-[40px]" src={RABBIT_MAP[order].IMG[RABBIT_STATE_MAP.STAND]} />
        </div>
      </div>
    </>
  );
};
