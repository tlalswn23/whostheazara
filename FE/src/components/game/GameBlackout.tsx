import { useEffect, useState } from "react";
import black from "../../assets/img/game/black.png";

interface GameBlackoutProps {
  timer: number;
  blackoutUser: {
    orderNo: number;
    second: number;
  };
  nowTime: string;
}

const loc = [
  ["top-[0%] left-[0%]", "top-[0%] left-[4%]", "top-[3%] left-[12%]"],
  ["top-[0%] left-[19%]", "top-[0%] left-[24%]", "top-[3%] left-[32%]"],
  ["top-[0%] left-[61%]", "top-[0%] left-[65%]", "top-[3%] left-[73%]"],
  ["top-[0%] left-[81%]", "top-[0%] left-[85%]", "top-[3%] left-[93%]"],
  ["top-[74%] left-[0%]", "top-[74%] left-[4%]", "top-[74%] left-[12%]"],
  ["top-[74%] left-[19%]", "top-[74%] left-[24%]", "top-[74%] left-[32%]"],
  ["top-[74%] left-[61%]", "top-[74%] left-[65%]", "top-[74%] left-[73%]"],
  ["top-[74%] left-[81%]", "top-[74%] left-[85%]", "top-[74%] left-[93%]"],
];
const loc = [
  ["top-[0%] left-[0%]", "top-[0%] left-[4%]", "top-[3%] left-[12%]"],
  ["top-[0%] left-[19%]", "top-[0%] left-[24%]", "top-[3%] left-[32%]"],
  ["top-[0%] left-[61%]", "top-[0%] left-[65%]", "top-[3%] left-[73%]"],
  ["top-[0%] left-[81%]", "top-[0%] left-[85%]", "top-[3%] left-[93%]"],
  ["top-[74%] left-[0%]", "top-[74%] left-[4%]", "top-[74%] left-[12%]"],
  ["top-[74%] left-[19%]", "top-[74%] left-[24%]", "top-[74%] left-[32%]"],
  ["top-[74%] left-[61%]", "top-[74%] left-[65%]", "top-[74%] left-[73%]"],
  ["top-[74%] left-[81%]", "top-[74%] left-[85%]", "top-[74%] left-[93%]"],
];

console.log(loc);

const GameBlackout = ({ timer, blackoutUser, nowTime }: GameBlackoutProps) => {
  const [showBlack, setShowBlack] = useState(false);

  useEffect(() => {
    if (nowTime === "DAY" && blackoutUser.second >= timer) {
      setShowBlack(true);
      console.log(blackoutUser.orderNo + "에게 블랙아웃");
    }
  }, [timer]);

  useEffect(() => {
    setShowBlack(false);
  }, [nowTime]);

  return (
    <>
      {showBlack && (
        <>
          <div
            className={`absolute w-[220px] h-[220px] rotate-90 animate-black-l-fade-out opacity-0 ${
              loc[blackoutUser.orderNo][1]
            }`}
          >
            {<img src={black} />}
          </div>
          <div
            className={`absolute w-[180px] h-[180px] animate-black-m-fade-out opacity-0 ${
              loc[blackoutUser.orderNo][0]
            }`}
          >
            {<img src={black} />}
          </div>
          <div
            className={`absolute w-[100px] h-[100px] rotate-180 animate-black-s-fade-out opacity-0 ${
              loc[blackoutUser.orderNo][2]
            }`}
          >
            {<img src={black} />}
          </div>
        </>
      )}
    </>
  );
};

export default GameBlackout;
