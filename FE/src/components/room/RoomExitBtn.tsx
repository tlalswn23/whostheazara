import { Link } from "react-router-dom";
import simpleSquareImg from "../../assets/img/simpleSquareImg.png";

export const RoomExitBtn = () => {
  //TODO: clinet disconnect
  return (
    <div className={`absolute w-[260px] h-[100px] top-[30px] left-[1570px]`}>
      <img src={simpleSquareImg} className="absolute w-full h-full bg-black" />
      <div>
        <Link
          to={"lobby"}
          className="absolute top-[0px] left-[0px] text-white text-[42px] w-[260px] py-[18px] text-center"
        >
          "나가기"
        </Link>
      </div>
    </div>
  );
};
