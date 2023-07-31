import { Link } from "react-router-dom";
import simpleSquareImg from "../../assets/img/common/simpleSquareImg.png";
import { useWebSocket } from "../../context/socketContext";

export const RoomExitBtn = () => {
  const { client } = useWebSocket();
  return (
    <div
      className={`3xl:w-[300px] w-[240px] 3xl:h-[100px] h-[80px] bg-cover flex justify-center bg-black`}
      style={{ backgroundImage: `url("${simpleSquareImg}")` }}
    >
      <Link
        to={"/lobby"}
        className="text-white 3xl:text-[42px] text-[36px] 3xl:w-[260px] w-[240px] 3xl:py-[18px] py-[16px] text-center"
        onClick={() => {
          client?.deactivate();
        }}
      >
        나가기
      </Link>
    </div>
  );
};
