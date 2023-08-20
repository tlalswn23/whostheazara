import { Link } from "react-router-dom";
import { useWebSocket } from "../../context/socketContext";
import { useParams } from "react-router-dom";
import { CurSeats } from "../../types/RoomSettingType";
import { toast } from "react-toastify";
import { SFX, playSFX } from "../../utils/audioManager";
import { useAccessTokenState } from "../../context/accessTokenContext";
import { ROOM_SEAT_STATE_MAP } from "../../constants/room/roomSeatStateMap";
interface RoomHeaderBtnProps {
  amIOwner: boolean;
  curSeats: CurSeats;
  setAmIReady: React.Dispatch<React.SetStateAction<boolean>>;
  amIReady: boolean;
}

export const RoomHeaderBtn = ({ amIOwner, curSeats, amIReady, setAmIReady }: RoomHeaderBtnProps) => {
  const { client } = useWebSocket();
  const { roomCode } = useParams();
  const { userSeq, accessToken } = useAccessTokenState();

  const onClickStart = () => {
    const occupiedSeatsCnt = curSeats.filter((seat) => seat.state === 1).length;
    if (occupiedSeatsCnt < 5) {
      toast.error("5명 이상의 플레이어가 필요합니다.");
      playSFX(SFX.ERROR);
      return;
    }
    const occupiedSeats = curSeats.filter(
      (seat) => seat.state === ROOM_SEAT_STATE_MAP.OCCUPIED_SEAT && seat.userSeq !== userSeq
    );
    console.log("occupiedSeats", occupiedSeats);

    const isAllReady = occupiedSeats.every((seat) => seat.ready);
    console.log("isAllReady", isAllReady);

    if (!isAllReady) {
      toast.error("모든 플레이어가 준비되어야 합니다.");
      playSFX(SFX.ERROR);
      return;
    }

    playSFX(SFX.CLICK);
    console.log(curSeats);

    client?.publish({
      destination: `/pub/room/${roomCode}/start`,
    });
  };

  const onToggleReady = () => {
    setAmIReady((prev) => !prev);

    const newCurSeats = curSeats.map((seat) => {
      if (seat.userSeq === userSeq) {
        return {
          ...seat,
          ready: !seat.ready,
        };
      }

      // equippedItems 속성을 제외하고 나머지 속성을 복사합니다.
      const { equippedItems, ...restOfSeat } = seat;
      return restOfSeat;
    });

    client?.publish({
      destination: `/pub/room/${roomCode}/curSeats`,
      body: JSON.stringify({
        curSeats: newCurSeats,
      }),
    });
  };

  const pubExitRoom = (roomCode: string) => {
    client?.publish({
      destination: `/pub/room/${roomCode}/exit`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  const onClickExit = (roomCode: string | undefined) => {
    if (!roomCode) return;
    pubExitRoom(roomCode);
    playSFX(SFX.CLICK);
  };

  return (
    <div className={`3xl:w-[360px] w-[288px] 3xl:h-[100px] h-[80px] bg-cover flex items-center font-bold`}>
      {amIOwner ? (
        <div
          onClick={onClickStart}
          className="hover:border-amber-200  3xl:text-[30px] text-[24px] 3xl:w-[150px] w-[120px] 3xl:py-[20px] py-[16px] text-center border-white 3xl:border-[10px] border-[8px] bg-black 3xl:ml-[20px] ml-[16px] text-yellow-400 duration-500 transition-colors"
        >
          Start
        </div>
      ) : (
        <div
          onClick={onToggleReady}
          className="hover:border-amber-200  3xl:text-[30px] text-[24px] 3xl:w-[150px] w-[120px] 3xl:py-[20px] py-[16px] text-center border-white 3xl:border-[10px] border-[8px] bg-black 3xl:ml-[20px] ml-[16px] text-yellow-400 duration-500 transition-colors"
        >
          {amIReady ? "Cancel" : "Ready"}
        </div>
      )}
      <Link
        to="/lobby"
        className="  hover:border-amber-200 3xl:text-[30px] text-[24px] 3xl:w-[150px] w-[120px] 3xl:py-[20px] py-[16px] text-center border-white 3xl:border-[10px] border-[8px] bg-black 3xl:ml-[20px] ml-[16px] text-red-400 duration-500 transition-colors"
        onClick={() => onClickExit(roomCode)}
      >
        Exit
      </Link>
    </div>
  );
};
