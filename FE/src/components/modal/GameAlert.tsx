import { useState } from "react";
import Rodal from "rodal";
import { JOB_MAP } from "../../constants/common/JobMap";

interface GameAlertProps {
  type: number;
}
export const GameAlert = ({ type }: GameAlertProps) => {
  const [viewMyJob, setViewMyJob] = useState(true);
  return (
    <Rodal
      visible={viewMyJob}
      onClose={() => setViewMyJob(false)}
      enterAnimation="slideUp"
      leaveAnimation="slideDown"
      duration={500}
      width={480}
      height={480}
      closeOnEsc={true}
      showCloseButton={false}
      customStyles={{
        backgroundColor: "rgba(0, 0, 0, 0)",
      }}
    >
      <div className="w-full h-full bg-gray-900 border-solid border-[10px] border-white flex flex-col justify-center items-center">
        <p className="text-white text-[32px] px-[20px]"></p>
        <p className="text-white text-[32px] px-[20px]">입니다.</p>
      </div>
    </Rodal>
  );
};
