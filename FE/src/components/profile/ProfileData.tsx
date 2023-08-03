export const ProfileData = () => {
  const userData = {
    total: 100,
    percentage: 65,
    job: [60, 35, 50, 35, 45, 55, 65, 40],
  };

  const job: Array<string> = ["토끼", "자라", "경찰", "의사", "군인", "건달", "정치인"];
  return (
    <>
      <div className="3xl:p-[20px] p-[16px] font-bold text-white">
        <div className="flex flex-col 3xl:text-[40px] text-[32px] 3xl:px-[56px] px-[44.8px] 3xl:py-[24px] py-[19.2px]">
          <p className="3xl:mb-[80px] mb-[64px]">총 플레이 횟수 : {userData.total}판</p>
          <p className="3xl:mb-[80px] mb-[64px]">총 승률 : {userData.percentage}%</p>
          <p className="3xl:mb-[10px] mb-[8px]">역할 별 승률</p>
          <div className="flex flex-wrap justify-between">
            {job.map((item, index) => (
              <p className="3xl:mx-[8px] mx-[6.4px]" key={index}>
                {item} : {userData.job[index]}%
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
