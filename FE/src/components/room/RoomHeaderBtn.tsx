import { Link } from "react-router-dom";
import simpleSquareImg from "../../assets/img/simpleSquareImg.png";

interface profileHeaderBtnProps {
  text: string;
  loc: string;
}

export const RoomHeaderBtn = ({ text, loc }: profileHeaderBtnProps) => {
  return (
    <div
      className={`w-[300px] h-[100px] bg-cover flex justify-center bg-black`}
      style={{ backgroundImage: `url(${simpleSquareImg})` }}
    >
      <Link to={`/${loc}`} className="text-white text-[42px] w-[260px] py-[18px] text-center">
        {text}
      </Link>
    </div>
  );
};
