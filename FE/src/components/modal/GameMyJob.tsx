import { useState } from "react";
import Rodal from "rodal";
import { JOB_MAP } from "../../constants/common/JobMap";

export const GameMyJob = () => {
  const [viewMyJob, setViewMyJob] = useState(true);

  return (
    <Rodal
      visible={viewMyJob}
      onClose={() => setViewMyJob(false)}
      enterAnimation="zoom"
      leaveAnimation="door"
      duration={500}
      width={480}
      height={480}
      closeOnEsc={true}
      showCloseButton={false}
      customStyles={{
        backgroundColor: "rgba(0, 0, 0, 0)",
      }}
    >
      <div className="w-full h-full bg-black border-solid border-[10px] border-white flex flex-col justify-center items-center">
        <img src={JOB_MAP[3].img} className="w-[128px] h-[128px] m-[16px]" />
        <p className="text-white text-[32px] px-[20px]">당신은</p>
        <p className="text-[32px] px-[20px] font-bold text-blue-300">{JOB_MAP[3].name} </p>
        <p className="text-white text-[32px] px-[20px]">입니다.</p>
      </div>
    </Rodal>
  );
};
