import { useEffect, useState } from "react";

export const GameTimer = () => {
  const maxTime = 60;
  const skipTime = 5;
  const [time, setTime] = useState(maxTime);
  const initTime = () => {
    setTime(maxTime);
  };
  const decreaseTime = (num: number) => {
    setTime((time) => time - num);
  };

  useEffect(() => {
    const secDown = setInterval(() => {
      decreaseTime(1);
    }, 1000);
    return () => clearInterval(secDown);
  }, []);

  useEffect(() => {
    if (time <= 0) {
      initTime();
    }
  }, [time]);
  return (
    <div className="absolute 3xl:top-[20px] top-[16px] drop-shadow-2xl w-full">
      <p
        className="text-white 3xl:text-[120px] text-[96px] drop-shadow-stroke cursor-pointer text-center w-[20%] m-auto"
        onClick={() => decreaseTime(skipTime)}
      >
        {time}
      </p>
    </div>
  );
};
