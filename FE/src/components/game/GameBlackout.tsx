import { useEffect } from "react";

interface GameBlackoutProps {
  timer: number;
  blackoutUser: {
    orderNo: number;
    second: number;
  };
}

const GameBlackout = ({ timer, blackoutUser }: GameBlackoutProps) => {
  useEffect(() => {
    if (blackoutUser.second === timer) {
      console.log(blackoutUser.orderNo + "에게 블랙아웃");
    }
  }, [timer]);
  return <div className="absolute"></div>;
};

export default GameBlackout;
