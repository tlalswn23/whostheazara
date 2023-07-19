import { useState } from "react";
import yellowBtnImg from "../../assets/img/yellowBtnImg.png";
import { ProfileInputForm } from "./ProfileInputForm";

export const ProfileUpdate = () => {
  return (
    <>
      <div className="absolute left-[690px] top-[160px] w-[1140px] h-[700px] border-solid border-white border-[20px] p-[80px] text-[48px] font-bold bg-black flex flex-col justify-around">
        <ProfileInputForm text="닉네임" />
        <ProfileInputForm text="새 비밀번호" />
        <ProfileInputForm text="비밀번호 확인" />
        <div className="absolute w-[360px] h-[120px] flex justify-center items-center bottom-[-50px] right-[-60px] text-[56px]">
          <img src={yellowBtnImg} className="absolute" />
          <p className="absolute">수정</p>
        </div>
      </div>
    </>
  );
};
