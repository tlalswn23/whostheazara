import { useState, useEffect } from "react";
import { useRecordApiCall } from "../../api/axios/useRecordApiCall";
import { JOB_MAP } from "../../constants/common/JobMap";

type winRate = number;
interface UserGameStat {
  totalWinRate: winRate;
  [jobId: string]: winRate;
}

export const ProfileData = () => {
  const { getTotalWinRate, getJobWinRate } = useRecordApiCall();
  const [userGameStat, setUserGameStat] = useState<UserGameStat>({
    totalWinRate: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });
  useEffect(() => {
    (async () => {
      const totalWinRate = await getTotalWinRate();
      const jobWinRate = await getJobWinRate();
      setUserGameStat({ totalWinRate, ...jobWinRate });
    })();
  }, []);

  return (
    <div className="3xl:p-[20px] p-[16px] font-bold text-white">
      <div className="flex flex-col 3xl:text-[40px] text-[32px] 3xl:px-[56px] px-[44.8px] 3xl:py-[24px] py-[19.2px]">
        <p className="3xl:mb-[80px] mb-[64px]">총 승률 : {userGameStat.totalWinRate}%</p>
        <p className="3xl:mb-[10px] mb-[8px]">역할 별 승률</p>
        <div className="flex flex-wrap justify-between">
          {Object.entries(userGameStat).map(([jobId, winRate]) => {
            if (jobId === "totalWinRate") return;
            const jobName = JOB_MAP.find((job) => job.id === parseInt(jobId))?.name || "Job not found";
            return (
              <div key={jobId} className="3xl:mb-[10px] mb-[8px]">
                <p>
                  {jobName} : {winRate}%
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
