import { ResultLose } from "./ResultLose";
import { ResultWin } from "./ResultWin";

export const ResultForm = () => {
  const user = [1, 1, 1, 1, 2, 1, 2, 1];
  const rabbitWin = 2;
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
