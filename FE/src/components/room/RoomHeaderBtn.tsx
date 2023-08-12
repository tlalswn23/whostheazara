import { Link } from "react-router-dom";
import { useWebSocket } from "../../context/socketContext";
import { useParams } from "react-router-dom";
import { CurSeats } from "../../types/RoomSettingType";
// import { toast } from "react-toastify";
import { SFX, playSFX } from "../../utils/audioManager";

interface RoomHeaderBtnProps {
  amIOwner: boolean;
  curSeats: CurSeats;
}

export const RoomHeaderBtn = ({ amIOwner, curSeats }: RoomHeaderBtnProps) => {
  const { client } = useWebSocket();
  const { roomCode } = useParams();

  const onClickStart = () => {
    // FIXME: 배포시 주석 해제
    // const occupiedSeatsCnt = curSeats.filter((seat) => seat.state === 1).length;
    // if (occupiedSeatsCnt < 5) {
    //   toast.error("5명 이상의 플레이어가 필요합니다.");
    //   playSFX(SFX.ERROR);
    //   return;
    // }
    console.log(curSeats);
    playSFX(SFX.CLICK);

    client?.publish({
      destination: `/pub/room/${roomCode}/start`,
    });
  };

  return (
    <div className={`3xl:w-[360px] w-[288px] 3xl:h-[100px] h-[80px] bg-cover flex items-center font-bold`}>
      {amIOwner ? (
        <div
          onClick={onClickStart}
          className=" cursor-pointer 3xl:text-[30px] text-[24px] 3xl:w-[150px] w-[120px] 3xl:py-[20px] py-[16px] text-center border-white 3xl:border-[10px] border-[8px] bg-black 3xl:ml-[20px] ml-[16px] text-yellow-400"
        >
          Start
        </div>
      ) : (
        <div className=" opacity-70 3xl:text-[30px] text-[24px] 3xl:w-[150px] w-[120px] 3xl:py-[20px] py-[16px] text-center border-white 3xl:border-[10px] border-[8px] bg-black 3xl:ml-[20px] ml-[16px] text-yellow-400">
          Start
        </div>
      )}
      <Link
        to="/lobby"
        className="3xl:text-[30px] text-[24px] 3xl:w-[150px] w-[120px] 3xl:py-[20px] py-[16px] text-center border-white 3xl:border-[10px] border-[8px] bg-black 3xl:ml-[20px] ml-[16px] text-red-400"
        onClick={() => playSFX(SFX.CLICK)}
      >
        Exit
      </Link>
    </div>
  );
};
