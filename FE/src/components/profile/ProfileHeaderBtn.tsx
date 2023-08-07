import { Link } from "react-router-dom";
import simpleSquareImg from "../../assets/img/common/simpleSquareImg.png";

interface profileHeaderBtnProps {
  text: string;
  loc: string;
}

export const ProfileHeaderBtn = ({ text, loc }: profileHeaderBtnProps) => {
  return (
    <div
      className={`3xl:w-[300px] w-[240px] 3xl:h-[100px] h-[80px] 3xl:mx-[20px] mx-[16px] bg-cover flex justify-center items-center bg-black z-10`}
      style={{ backgroundImage: `url("${simpleSquareImg}")` }}
    >
      <Link
        to={`/${loc}`}
        className="text-white 3xl:text-[40px] text-[32px] 3xl:w-[260px] w-[208px] 3xl:py-[18px] py-[14.4px] text-center"
      >
        {text}
      </Link>
    </div>
  );
};
