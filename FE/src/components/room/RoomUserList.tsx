import yellowBtnImg from "../../assets/img/yellowBtnImg.png";
import { Link } from "react-router-dom";
import { RoomUserListItem } from "./RoomUserListItem";

export const RoomUserList = () => {
  const num = [...Array(8).keys()];
  return (
    <>
      <div className="relative w-[1140px] h-[700px] border-solid border-white border-[20px] p-[24px] text-[56px] font-bold bg-black">
        <div className="flex flex-wrap">
          {num.map((item, index) => (
            <RoomUserListItem item={item} key={index} />
          ))}
        </div>
        <div className="absolute w-[360px] h-[120px] flex justify-center items-center bottom-[-50px] right-[-60px]">
          <img src={yellowBtnImg} className="absolute" />
          {/* TODO: ingame으로 진입 및 ingame에서 방 세팅 보내면서 openvidu 시작*/}
          <Link to="/room" className="absolute w-full text-center py-[20px]">
            게임시작
          </Link>
        </div>
      </div>
    </>
  );
};
