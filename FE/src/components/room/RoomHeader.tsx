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
      <div
        className="3xl:w-[1420px] w-[1136px] 3xl:h-[126px] h-[100.8px] 3xl:text-[38px] text-[30.4px] text-white flex items-center bg-cover"
        style={{ backgroundImage: `url(${roomTitle})` }}
      >
        <p className="3xl:w-[1000px] w-[800px] whitespace-nowrap text-ellipsis overflow-hidden 3xl:pl-[40px] pl-[32px]">
          221. 자라 잡으러 가실분 구해요 자라 잡으러 가실분 구해요
        </p>
        <div className="3xl:text-[24px] text-[19.2px] 3xl:w-[390px] w-[312px] flex justify-end">
          {jobImg.map((item, index) => (
            <div className="relative" key={index}>
              <img
                src={item}
                className="3xl:mx-[8px] mx-[6px] 3xl:py-[8px] py-[6px] 3xl:w-[48px] w-[38.4px] 3xl:h-[64px] h-[51.2px] cursor-pointer"
                onClick={() => onSetUseJob({ index })}
              />
              {!useJob[index] ? (
                <p
                  className="absolute top-[-4px] left-[2px] text-red-400 3xl:text-[48px] text-[38.4px] font-bold w-full h-full cursor-pointer text-center"
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
    </>
  );
};
