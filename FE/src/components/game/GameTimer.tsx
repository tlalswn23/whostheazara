import { useEffect, useState } from "react";
import { useWebSocket } from "../../context/socketContext";
import { useAccessTokenState } from "../../context/accessTokenContext";
import { useParams } from "react-router-dom";

interface GameTimerProps {
  timer: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
  nowTime: string;
}

export const GameTimer = ({ timer, setTimer, nowTime }: GameTimerProps) => {
  const { gameCode } = useParams();
  const { client } = useWebSocket();
  const { userSeq } = useAccessTokenState();
  const [useSkip, setUseSkip] = useState(false);

  const skipTime = () => {
    if (useSkip) {
      return;
    }

    setUseSkip(true);
    client?.publish({
      destination: `/pub/game/${gameCode}/timer/decrease`,
      body: JSON.stringify({ userSeq }),
    });
  };

  useEffect(() => {
    setUseSkip(false);
  }, [nowTime]);

  const decreaseTime = () => {
    setTimer((prevTime) => {
      if (prevTime - 1 < 0) return 0;
      return prevTime - 1;
    });
  };

  useEffect(() => {
    const secDown = setInterval(() => {
      decreaseTime();
      if (timer <= 0) {
        if (!gameCode) return;
        client?.publish({
          destination: `/pub/game/${gameCode}/timer`,
          body: JSON.stringify({ userSeq }),
        });
      }
    }, 1000);
    return () => clearInterval(secDown);
  }, [timer, gameCode]);

  return (
    <div className="absolute 3xl:top-[20px] top-[16px] drop-shadow-2xl w-[20%] flex items-center justify-center">
      <div className="3xl:w-[80px] w-[64px] 3xl:ml-[40px] ml-[32px]" />
      <p className="text-white 3xl:text-[120px] text-[96px] drop-shadow-stroke-black text-center 3xl:w-[150px] w-[120px]">
        {timer}
      </p>
      <div
        className={`text-black text-center font-bold 3xl:w-[80px] w-[64px] 3xl:h-[80px] h-[64px] flex justify-center items-center 3xl:ml-[20px] ml-[16px] 3xl:mt-[10px] mt-[8px] rounded-full 3xl:text-[32px] text-[25.6px] flex-wrap hover:brightness-110 bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-gray-200 via-gray-400 to-gray-600 ${
          useSkip && "opacity-0"
        }`}
        onClick={() => skipTime()}
      >
        <p className="3xl:text-[18px] text-[14.4px] 3xl:w-[80px] w-[64px] 3xl:h-[80px] h-[64px] 3xl:mt-[10px] mt-[8px] 3xl:mb-[-70px] mb-[-56px]">
          {"-10"}
        </p>
        <p className="3xl:text-[40px] text-[32px] w-full h-full 3xl:pl-[10px] pl-[8px]">{">>"}</p>
      </div>
    </div>
  );
};
