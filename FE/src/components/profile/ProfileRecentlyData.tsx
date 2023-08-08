import { ProfileRecentlyDataItem } from "./ProfileRecentlyDataItem";
import { useState, useEffect } from "react";
import { useRecordApiCall } from "../../api/axios/useRecordApiCall";
import { motion } from "framer-motion";

interface RecentlyGameData {
  jobSeq: number;
  roomSeq: number;
  startAt: string;
  endAt: string;
  win: boolean;
}

export const ProfileRecentlyData = () => {
  const [recentlyGameDataList, setRecentlyGameDataList] = useState<RecentlyGameData[]>([]);
  const { getRecentlyGameDataList } = useRecordApiCall();

  // TODO: 최근 게임 기록이 없으면 없는 이미지를 보여줘야함
  useEffect(() => {
    (async () => {
      const recentlyGameDataList = await getRecentlyGameDataList();
      setRecentlyGameDataList(recentlyGameDataList);
    })();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <div className="3xl:p-[20px] p-[16px] 3xl:text-[36px] text-[28.8px] font-bold text-white  ">
        <ul className="flex text-center ">
          <li className="3xl:w-[200px] w-[160px]">결과</li>
          <li className="3xl:w-[240px] w-[192px]">내 역할</li>
          <li className="3xl:w-[240px] w-[192px]">진행 시간</li>
          <li className="3xl:w-[340px] w-[272px]">게임 일자</li>
        </ul>
        <hr className="3xl:my-[20px] my-[16px] w-full 3xl:border-[2px] border-[1.6px]" />
        {recentlyGameDataList.map((data) => (
          <ProfileRecentlyDataItem
            key={data.roomSeq}
            jobSeq={data.jobSeq}
            startAt={data.startAt}
            endAt={data.endAt}
            win={data.win}
          />
        ))}
      </div>
    </motion.div>
  );
};
