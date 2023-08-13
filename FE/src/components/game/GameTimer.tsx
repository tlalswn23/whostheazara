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
    setTimer(0);
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
    <div className="absolute 3xl:top-[20px] top-[16px] drop-shadow-2xl w-[20%]">
      <p
        className="text-white 3xl:text-[120px] text-[96px] drop-shadow-stroke-black cursor-green text-center m-auto"
        onClick={() => skipTime()}
      >
        {timer}
      </p>
    </div>
  );
};
