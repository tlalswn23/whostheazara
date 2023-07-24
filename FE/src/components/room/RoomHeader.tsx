import roomTitle from "../../assets/img/roomTitle.png";
import jobArmy from "../../assets/img/jobArmy.png";
import jobDoctor from "../../assets/img/jobDoctor.png";
import jobPolice from "../../assets/img/jobPolice.png";
import jobPolitician from "../../assets/img/jobPolitician.png";
import jobThug from "../../assets/img/jobThug.png";
import { useState } from "react";

interface onSetUseJobProps {
  index: number;
}

export const RoomHeader = () => {
  const jobImg = [jobPolice, jobDoctor, jobArmy, jobPolitician, jobThug];
  const [useJob, setUseJob] = useState([true, true, true, true, true]);

  const onSetUseJob = ({ index }: onSetUseJobProps) => {
    let temp = [];

    for (let i = 0; i < 5; ++i) {
      temp[i] = useJob[i];
    }
    temp[index] = !temp[index];

    setUseJob(temp);
  };

  return (
    <>
      <div className="absolute left-[70px] top-[20px] w-[1460px] h-[120px]">
        <img src={roomTitle} className="w-[1460px] h-[120px]" />
        <div className="absolute top-[28px] left-[40px] text-[42px] text-white flex items-center w-full">
          <p className="w-[1000px] whitespace-nowrap text-ellipsis overflow-hidden">
            221. 자라 잡으러 가실분 구해요 자라 잡으러 가실분 구해요
          </p>
          <div className="text-[24px] w-[380px] flex justify-end">
            {jobImg.map((item, index) => (
              <div className="relative" key={index}>
                <img
                  src={item}
                  className="mx-[8px] py-[8px] w-[48px] h-[64px] cursor-pointer"
                  onClick={() => onSetUseJob({ index })}
                />
                {!useJob[index] ? (
                  <p
                    className="absolute top-[-4px] left-[2px] text-red-400 text-[48px] font-bold w-full h-full cursor-pointer text-center"
                    onClick={() => onSetUseJob({ index })}
                  >
                    X
                  </p>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
