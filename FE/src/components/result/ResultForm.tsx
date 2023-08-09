import { ResultLose } from "./ResultLose";
import { ResultWin } from "./ResultWin";
// import { useLocation } from "react-router-dom";

export const ResultForm = () => {
  // const location = useLocation();
  // const {userInfo} = location.state;
  // const isRabbitWin = location.state.rabbitWin;
  // const rabbitWin = isRabbitWin ? 1 : 2;

  const userInfo = [
    {
      userSeq: 166,
      jobSeq: 1,
      win: true,
    },
    {
      userSeq: 22,
      jobSeq: 2,
      win: false,
    },
    {
      userSeq: 43,
      jobSeq: 3,
      win: true,
    },
    {
      userSeq: 54,
      jobSeq: 2,
      win: false,
    },
    {
      userSeq: 785,
      jobSeq: 4,
      win: true,
    },
    {
      userSeq: 785,
      jobSeq: 5,
      win: true,
    },
    {
      userSeq: 725,
      jobSeq: 6,
      win: true,
    },
    {
      userSeq: 705,
      jobSeq: 7,
      win: true,
    },
  ];

  const user = userInfo.map((item) => (item.jobSeq === 2 ? 2 : 1));

  const rabbitWin = 1;
  return (
    <>
      <div
        className={`flex flex-col justify-around w-full h-full bg-gradient-to-b from-black from-20% font-bold ${
          rabbitWin < 2 ? "to-yellow-200" : "to-green-200"
        }`}
      >
        <div className={`flex justify-center ${rabbitWin < 2 ? "text-red-500" : "text-white"}`}>
          {user.map((item, index) => {
            return item !== rabbitWin && <ResultLose index={index} key={index} />;
          })}
        </div>
        <p className={`text-[72px] text-center font-bold ${rabbitWin < 2 ? "text-yellow-200" : "text-green-200"}`}>
          {rabbitWin < 2 ? "토끼 승리" : "자라 승리"}
        </p>
        <div className={`flex justify-center ${rabbitWin > 1 ? "text-red-500" : "text-white"}`}>
          {user.map((item, index) => {
            return item === rabbitWin && <ResultWin index={index} key={index} />;
          })}
        </div>
      </div>
    </>
  );
};
