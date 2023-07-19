import { Link } from "react-router-dom";
import simpleSquareImg from "../../assets/img/simpleSquareImg.png";

interface LobbyHeaderBtnProps {
  index: number;
  text: string;
  loc: string;
}

export const LobbyHeaderBtn = ({ index, text, loc }: LobbyHeaderBtnProps) => {
  return (
    <div className={`absolute w-[260px] h-[100px] top-[30px] ${index === 0 ? "right-[388px]" : "right-[88px]"}`}>
      <img src={simpleSquareImg} className="absolute w-full h-full bg-black" />
      <div>
        <Link
          to={`/${loc}`}
          className="absolute top-[0px] left-[0px] w-full text-white text-[42px] w-[260px] py-[18px] text-center"
        >
          {text}
        </Link>
      </div>
    </div>
  );
};
