import { useState } from "react";
import { ProfileRecentlyDataItem } from "./ProfileRecentlyDataItem";

export const ProfileRecentlyData = () => {
  const [recentlyData, setRecentlyData] = useState([
    {
      gameNo: 0,
      result: "승",
      role: "경찰",
      date: "2023-07-20",
      playtime: "04:20",
    },
    {
      gameNo: 1,
      result: "패",
      role: "의사",
      date: "2023-07-19",
      playtime: "14:20",
    },
    {
      gameNo: 2,
      result: "승",
      role: "자라",
      date: "2023-07-17",
      playtime: "11:20",
    },
    {
      gameNo: 3,
      result: "패",
      role: "자라",
      date: "2023-06-17",
      playtime: "10:20",
    },
    {
      gameNo: 4,
      result: "승",
      role: "토끼",
      date: "2023-07-15",
      playtime: "11:20",
    },
  ]);
  return (
    <>
      <div className="absolute left-[690px] top-[160px] w-[1140px] h-[700px] border-solid border-white border-[20px] p-[40px] text-[36px] font-bold bg-black text-white">
        <ul className="flex text-center ">
          <li className="w-[200px]">결과</li>
          <li className="w-[240px]">내 역할</li>
          <li className="w-[240px]">진행 시간</li>
          <li className="w-[340px]">게임 일자</li>
        </ul>
        <hr className="my-[20px] w-full border-[2px]" />
        {recentlyData.map((item) => (
          <ProfileRecentlyDataItem item={item} key={item.gameNo} />
        ))}
      </div>
    </>
  );
};
