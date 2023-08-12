import { RABBIT_MAP } from "../../constants/common/RabbitMap";
import { RABBIT_STATE_MAP } from "../../constants/game/RabbitStateMap";
import { OWNER_IMG_MAP } from "../../constants/room/ownerImgMap";
import { useAccessTokenState } from "../../context/accessTokenContext";
interface RoomUserListItemProps {
  nickname: string;
  order: number;
  userSeq: number;
  ownerSeq: number;
  cap: string;
  face: string;
  clothing: string;
}

export const RoomUserListItem = ({
  userSeq,
  nickname,
  order,
  ownerSeq,
  cap,
  face,
  clothing,
}: RoomUserListItemProps) => {
  const context = useAccessTokenState();
  const myUserSeq = context.userSeq;
  return (
    <>
      <div className="3xl:text-[30px] text-[24px] w-full 3xl:h-[50px] h-[40px] flex justify-center items-center flex-wrap">
        <p className="text-center text-white">
          {nickname}
          {myUserSeq === userSeq && " (나)"}
        </p>
      </div>
      <div className="relative h-full">
        <img
          className="absolute 3xl:top-[-10px] top-[-8px] 3xl:left-[5px] left-[4px] 3xl:w-[250px] w-[200px] 3xl:h-[250px] h-[200px]"
          src={RABBIT_MAP[order].IMG[RABBIT_STATE_MAP.STAND]}
        />
        <img
          src={`data:image/png;base64,${clothing}`}
          className="absolute 3xl:top-[-10px] top-[-8px] 3xl:left-[5px] left-[4px] 3xl:w-[250px] w-[200px] 3xl:h-[250px] h-[200px]"
        />
        <img
          src={`data:image/png;base64,${face}`}
          className="absolute 3xl:top-[-10px] top-[-8px] 3xl:left-[5px] left-[4px] 3xl:w-[250px] w-[200px] 3xl:h-[250px] h-[200px]"
        />
        <img
          src={`data:image/png;base64,${cap}`}
          className="absolute 3xl:top-[-10px] top-[-8px] 3xl:left-[5px] left-[4px] 3xl:w-[250px] w-[200px] 3xl:h-[250px] h-[200px]"
        />
      </div>

      {ownerSeq === userSeq && (
        <img src={OWNER_IMG_MAP[order]} alt="방장 표시" className=" absolute bottom-0 w-full h-1/5" />
      )}
    </>
  );
};
