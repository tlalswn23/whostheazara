import { useState } from "react";
import LobbyJobBtn from "./LobbyJobBtn";
import yellowBtnImg from "../../assets/img/yellowBtnImg.png";
import { Link } from "react-router-dom";
import { LobbyJobList } from "../../constants/LobbyJobList";

export const LobbyCreateRoom = () => {
  const [title, setTitle] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="flex">
        <p className="text-white 3xl:px-[36px] px-[28px] 3xl:mr-[48px] mr-[38px]">방 제목</p>
        <div className="3xl:w-[580px] w-[464px] flex justify-between">
          <input
            className="w-full 3xl:px-[20px] px-[15px] text-[42px]"
            onChange={onChange}
            maxLength={16}
            minLength={2}
            value={title}
          />
        </div>
      </div>
      <div className="3xl:mt-[40px] mt-[30px] flex flex-col justify-between">
        <p className="text-white 3xl:px-[36px] px-[28px] 3xl:mr-[48px] mr-[38px] 3xl:mt-[40px] mt-[30px]">역할</p>
        <div className="flex">
          {LobbyJobList.map((job) => (
            <LobbyJobBtn key={job.id} img={job.img} id={job.id} />
          ))}
        </div>
      </div>
      <div className="absolute 3xl:w-[360px] w-[288px] 3xl:h-[120px] h-[96px] flex justify-center items-center bottom-[-40px] right-[40px]">
        <img src={yellowBtnImg} className="absolute" />
        <Link to="/room" className="absolute w-full text-center py-[20px]">
          방 생성
        </Link>
      </div>
    </div>
  );
};
