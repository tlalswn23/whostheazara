import { useState } from "react";
import { LobbyJobBtn } from "./LobbyJobBtn";
import yellowBtnImg from "../../assets/img/yellowBtnImg.png";
import { Link } from "react-router-dom";

export const LobbyCreateRoom = () => {
  const [selectedJob, setSelectedJob] = useState(0);
  const [title, setTitle] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onSetSelectedJob = (num: number) => {
    if ((selectedJob & (1 << num)) != 0) {
      setSelectedJob(selectedJob & ~(1 << num));
    } else {
      setSelectedJob(selectedJob | (1 << num));
    }
  };
  const job = [...Array(5).keys()];

  return (
    <>
      <div className="absolute left-[690px] top-[160px] w-[1140px] h-[700px] border-solid border-white border-[20px] p-[80px] text-[56px] font-bold bg-black">
        <div className="flex">
          <p className="text-white px-[36px] mr-[48px]">방 제목</p>
          <div className="w-[580px] flex justify-between">
            <input
              className="w-full px-[20px] text-[42px]"
              onChange={onChange}
              maxLength={16}
              minLength={2}
              value={title}
            />
          </div>
        </div>
        <div className="mt-[40px] flex flex-col justify-between">
          <p className="text-white px-[36px] mr-[48px] mt-[40px]">역할</p>
          <div className="flex">
            {job.map((item, index) => {
              return (
                <LobbyJobBtn index={item} key={index} selectedJob={selectedJob} onSetSelectedJob={onSetSelectedJob} />
              );
            })}
          </div>
        </div>
        <div className="absolute w-[360px] h-[120px] flex justify-center items-center bottom-[-50px] right-[-60px]">
          <img src={yellowBtnImg} className="absolute" />
          <Link to="/room" className="absolute w-full text-center py-[20px]">
            방 생성
          </Link>
        </div>
      </div>
    </>
  );
};
