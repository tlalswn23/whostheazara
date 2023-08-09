import { useEffect } from "react";
import { useWebSocket } from "../../context/socketContext";
import { useAccessTokenState } from "../../context/accessTokenContext";
import stompUrl from "../../api/url/stompUrl";
import { useParams } from "react-router-dom";

interface GameTimerProps {
  timer: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
}

export const GameTimer = ({ timer, setTimer }: GameTimerProps) => {
  const { gameCode } = useParams();
  const { client } = useWebSocket();
  const { userSeq } = useAccessTokenState();
  const skipTime = 5;
  const decreaseTime = (skipTime: number) => {
    setTimer((prevTime) => {
      if (prevTime - skipTime < 0) return 0;
      return prevTime - skipTime;
    });
  };

  useEffect(() => {
    const secDown = setInterval(() => {
      decreaseTime(1);
      if (timer <= 0) {
        clearInterval(secDown);
        if (!gameCode) return;
        const url = stompUrl.pubGameTimer(gameCode);
        client?.publish({
          destination: url,
          body: JSON.stringify({ userSeq }),
        });
      }
    }, 1000);
    return () => clearInterval(secDown);
  }, []);

  return (
    <div className="absolute 3xl:top-[20px] top-[16px] drop-shadow-2xl w-[20%]">
      <p
        className="text-white 3xl:text-[120px] text-[96px] drop-shadow-stroke-black cursor-pointer text-center m-auto"
        onClick={() => decreaseTime(skipTime)}
      >
        {timer}
      </p>
    </div>
  );
};
