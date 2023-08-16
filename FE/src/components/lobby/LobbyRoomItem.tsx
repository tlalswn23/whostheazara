import { useNavigate } from "react-router-dom";
import { SFX, playSFX } from "../../utils/audioManager";
import { toast } from "react-toastify";

interface LobbyRoomItemProps {
  title: string;
  index: number;
  roomCode: string;
  curUsers: number;
  maxUsers: number;
}

export const LobbyRoomItem = ({ title, index, roomCode, curUsers, maxUsers }: LobbyRoomItemProps) => {
  const navigate = useNavigate();

  const onEnterRoom = () => {
    if (curUsers === maxUsers) {
      toast.error("방이 꽉 찼습니다.");
      return;
    }
    playSFX(SFX.CLICK);
    navigate(`/room/${roomCode}`);
  };

  return (
    <div
      className={`w-[50%] 3xl:h-[130px] h-[104px] 3xl:border-[10px] border-[8px] border-solid border-black flex items-center 3xl:text-[24px] text-[19.2px] text-white hover:text-yellow-200 shadow-inner shadow-white bg-gray-900`}
      onClick={onEnterRoom}
    >
      <div className="flex">
        <p className="3xl:w-[64px] w-[51.2px] 3xl:ml-[40px] ml-[32px]">{index + 1}.</p>
        <p className="3xl:w-[300px] w-[240px] overflow-hidden whitespace-nowrap text-ellipsis">{title}</p>
      </div>
      <p className="3xl:ml-[20px] ml-[16px]">
        {curUsers} / {maxUsers}
      </p>
    </div>
  );
};
