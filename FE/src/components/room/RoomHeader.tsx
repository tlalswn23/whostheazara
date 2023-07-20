import roomTitle from "../../assets/img/roomTitle.png";
import jobArmy from "../../assets/img/jobArmy.png";
import jobDoctor from "../../assets/img/jobDoctor.png";
import jobPolice from "../../assets/img/jobPolice.png";
import jobPolitician from "../../assets/img/jobPolitician.png";
import jobRabbit from "../../assets/img/jobRabbit.png";
import jobThug from "../../assets/img/jobThug.png";
import jobZara from "../../assets/img/jobZara.png";

export const RoomHeader = () => {
  const jobImg = [jobArmy, jobDoctor, jobPolice, jobPolitician, jobThug];

  return (
    <>
      <div className="absolute left-[70px] top-[20px] w-[1460px] h-[120px]">
        <img src={roomTitle} className="w-[1460px] h-[120px]" />
        <div className="absolute top-[28px] left-[40px] text-[42px] text-white flex items-center w-full">
          <p className="w-[1000px] whitespace-nowrap text-ellipsis overflow-hidden">
            221. 자라 잡으러 가실분 구해요 자라 잡으러 가실분 구해요
          </p>
          <div className="text-[24px] w-[380px] flex justify-end">
            {jobImg.map((item) => (
              <img src={item} className="mx-[8px] w-[48px] h-[48px]" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
