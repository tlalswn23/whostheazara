import { RABBIT_MAP } from "../../constants/common/RabbitMap";
import { RABBIT_STATE_MAP } from "../../constants/game/RabbitStateMap";
import { JOB_MAP } from "../../constants/common/JobMap";

interface ResultLoseProps {
  order: number;
  nickname: string;
  jobSeq: number;
}

export const ResultLose = ({ order, nickname, jobSeq }: ResultLoseProps) => {
  return (
    <>
      <div className="flex flex-col justify-center w-[160px] h-200px]">
        <div className="flex justify-center items-center w-[160px] h-[120px]">
          <img className="w-[160px] h-[160px]" src={RABBIT_MAP[order].IMG[RABBIT_STATE_MAP.STAND]} />
        </div>
        <div className="w-[160px] flex flex-col items-center text-[18px]">
          <p className="w-auto">{nickname}</p>
          <p className="w-auto">{JOB_MAP[jobSeq].name}</p>
        </div>
      </div>
    </>
  );
};
