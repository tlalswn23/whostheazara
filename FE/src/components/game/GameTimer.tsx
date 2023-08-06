import { useEffect, useState } from "react";
import { TIME_TYPE_MAP, TIME_TYPE_VALUE } from "../../constants/game/TimeTypeMap";

interface GameTimerProps {
  onSetViewVote: () => void;
}

export const GameTimer = ({ onSetViewVote }: GameTimerProps) => {
  const skipTime = 5;
  const [time, setTime] = useState(TIME_TYPE_VALUE.DAY);
  const [timeType, setTimeType] = useState(TIME_TYPE_MAP.DAY);
  const decreaseTime = (num: number) => {
    setTime((time) => time - num);
  };
  const onSetTime = () => {
    if (timeType === TIME_TYPE_MAP.DAY) {
      setTime(TIME_TYPE_VALUE.DAY);
    } else if (timeType === TIME_TYPE_MAP.VOTE) {
      setTime(TIME_TYPE_VALUE.VOTE);
    } else if (timeType === TIME_TYPE_MAP.NIGHT) {
      setTime(TIME_TYPE_VALUE.NIGHT);
    }
  };

  useEffect(() => {
    const secDown = setInterval(() => {
      decreaseTime(1);
    }, 1000);
    return () => clearInterval(secDown);
  }, []);

  useEffect(() => {
    if (time <= 0) {
      setTimeType(() => (timeType + 1) % 3);
    }
    console.log(time, timeType);
  }, [time]);

  useEffect(() => {
    if (timeType === 1) {
      onSetViewVote();
    } else if (timeType === 2) {
      onSetViewVote();
    }
    onSetTime();
  }, [timeType]);

  return (
    <div className="absolute 3xl:top-[20px] top-[16px] drop-shadow-2xl w-[20%]">
      <p
        className="text-white 3xl:text-[120px] text-[96px] drop-shadow-stroke-black cursor-pointer text-center m-auto"
        onClick={() => decreaseTime(skipTime)}
      >
        {time}
      </p>
    </div>
  );
};
