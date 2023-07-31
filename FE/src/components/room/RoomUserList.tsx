import yellowBtnImg from "../../assets/img/common/yellowBtnImg.png";
import { Link } from "react-router-dom";
import { RoomUserListItem } from "./RoomUserListItem";

export const RoomUserList = () => {
  const num = [...Array(8).keys()];
  return (
    <>
      <div className="3xl:w-[1225px] w-[980px] 3xl:h-[700px] h-[560px] 3xl:text-[56px] text-[44.8px] font-bold bg-transparent">
        <div className="flex flex-wrap justify-end">
          {num.map((item, index) => (
            <RoomUserListItem item={item + 1} key={index} />
          ))}
        </div>
        <div className="absolute 3xl:w-[360px] w-[288px] 3xl:h-[120px] h-[96px] flex justify-center items-center bottom-[-100px] right-[30px]">
          <img src={yellowBtnImg} className="absolute" />
          {/* TODO: ingame으로 진입 및 ingame에서 방 세팅 보내면서 openvidu 시작*/}
          <Link to="/game" className="absolute w-full text-center py-[20px]">
            게임시작
          </Link>
        </div>
      </div>
    </>
  );
};
