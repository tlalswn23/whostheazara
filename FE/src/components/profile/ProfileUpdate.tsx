import { useState } from "react";
import lobbyYellowBtnImg from "../../assets/img/lobbyYellowBtnImg.png";

export const ProfileUpdate = () => {
  const [selectedNum, setSelectedNum] = useState(1);
  const [selectedJob, setSelectedJob] = useState(0);

  const onSetSelectedNum = (num: number) => {
    setSelectedNum(num);
  };

  const onSetSelectedJob = (num: number) => {
    if ((selectedJob & (1 << num)) != 0) {
      setSelectedJob(selectedJob & ~(1 << num));
    } else {
      setSelectedJob(selectedJob | (1 << num));
    }
  };

  const num = [...Array(4).keys()];
  const job = [...Array(8).keys()];

  return (
    <>
      <div className="absolute left-[36%] top-[17%] w-[1140px] h-[700px] border-solid border-white border-[20px] p-[80px] text-[56px] font-bold bg-black">
        <div className="absolute w-[360px] h-[120px] flex justify-center items-center bottom-[-50px] right-[-60px]">
          <img src={lobbyYellowBtnImg} className="absolute" />
          <p className="absolute">수정</p>
        </div>
      </div>
    </>
  );
};
