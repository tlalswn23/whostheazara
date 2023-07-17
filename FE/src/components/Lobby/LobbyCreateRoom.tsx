import { useState } from "react";
import { LobbyJobBtn } from "../modal/LobbyJobBtn";
import { LobbyNumBtn } from "../modal/LobbyNumBtn";

export const LobbyCreateRoom = () => {
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

  return (
    <>
      {/* <div className="absolute left-[40%] top-[15%] w-[55%] h-[70%] border-solid border-white border-[20px] p-[100px] text-[48px] font-bold"> */}
      <div className="absolute left-[36%] top-[15%] w-[1050px] h-[760px] border-solid border-white border-[20px] p-[100px] text-[48px] font-bold">
        <div className="flex">
          <p className="text-white mr-[110px]">인원</p>
          <div className="w-[600px] flex justify-around text-white">
            <LobbyNumBtn text="5명" index={0} selectedNum={selectedNum} onSetSelectedNum={onSetSelectedNum} />
            <LobbyNumBtn text="6명" index={1} selectedNum={selectedNum} onSetSelectedNum={onSetSelectedNum} />
            <LobbyNumBtn text="7명" index={2} selectedNum={selectedNum} onSetSelectedNum={onSetSelectedNum} />
            <LobbyNumBtn text="8명" index={3} selectedNum={selectedNum} onSetSelectedNum={onSetSelectedNum} />
          </div>
        </div>
        <div className="mt-[60px] flex flex-wrap justify-between">
          <LobbyJobBtn index={0} selectedJob={selectedJob} onSetSelectedJob={onSetSelectedJob} />
          <LobbyJobBtn index={1} selectedJob={selectedJob} onSetSelectedJob={onSetSelectedJob} />
          <LobbyJobBtn index={2} selectedJob={selectedJob} onSetSelectedJob={onSetSelectedJob} />
          <LobbyJobBtn index={3} selectedJob={selectedJob} onSetSelectedJob={onSetSelectedJob} />
          <LobbyJobBtn index={4} selectedJob={selectedJob} onSetSelectedJob={onSetSelectedJob} />
          <LobbyJobBtn index={5} selectedJob={selectedJob} onSetSelectedJob={onSetSelectedJob} />
          <LobbyJobBtn index={6} selectedJob={selectedJob} onSetSelectedJob={onSetSelectedJob} />
          <LobbyJobBtn index={7} selectedJob={selectedJob} onSetSelectedJob={onSetSelectedJob} />
        </div>
        <div className="absolute w-[360px] h-[120px] bg-yellow-500 flex justify-center items-center bottom-[-50px] right-[-60px]">
          <p>게임 시작</p>
        </div>
      </div>
    </>
  );
};
