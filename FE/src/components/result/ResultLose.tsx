import { RABBIT_MAP } from "../../constants/game/RabbitMap";
import { RABBIT_STATE_MAP } from "../../constants/game/RabbitStateMap";

interface ResultLoseProps {
  index: number;
}

export const ResultLose = ({ index }: ResultLoseProps) => {
  const nickname = "닉네임 테스트";
  const job = "직업테";
  return (
    <>
      <div className="flex flex-col justify-center w-[160px] h-200px]">
        <div className="flex justify-center items-center w-[160px] h-[120px]">
          <img className="w-[160px] h-[160px]" src={RABBIT_MAP[index].IMG[RABBIT_STATE_MAP.STAND]} />
        </div>
        <div className="w-[160px] flex flex-col items-center text-[18px]">
          <p className="w-auto">{nickname}</p>
          <p className="w-auto">{job}</p>
        </div>
      </div>
    </>
  );
};
