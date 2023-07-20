import { Link } from "react-router-dom";
import simpleSquareImg from "../../assets/img/simpleSquareImg.png";

interface profileHeaderBtnProps {
  text: string;
  loc: string;
}

export const RoomHeaderBtn = ({ text, loc }: profileHeaderBtnProps) => {
  return (
    <div className={`absolute w-[260px] h-[100px] top-[30px] left-[1570px]`}>
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
