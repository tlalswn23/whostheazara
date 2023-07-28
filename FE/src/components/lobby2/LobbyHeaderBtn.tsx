import { Link } from "react-router-dom";
import simpleSquareImg from "../../assets/img/simpleSquareImg.png";

interface LobbyHeaderBtnProps {
  text: string;
  loc: string;
}

export const LobbyHeaderBtn = ({ text, loc }: LobbyHeaderBtnProps) => {
  return (
    <div
      className={`3xl:w-[300px] w-[240px] 3xl:h-[100px] h-[80px] mx-[20px] bg-cover flex justify-center items-center bg-black`}
      style={{ backgroundImage: `url(${simpleSquareImg})` }}
    >
      <Link
        to={`/${loc}`}
        className="text-white 3xl:text-[42px] text-[36px] 3xl:w-[260px] w-[240px] 3xl:py-[18px] py-[16px] text-center"
      >
        {text}
      </Link>
    </div>
  );
};
