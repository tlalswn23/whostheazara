import rabbitImg from "../../assets/img/lobby/rabbitImg.png";
import blackBtnImg from "../../assets/img/common/blackBtnImg.png";
import { useState } from "react";
import { LOOBY_COMPONENT_MAP } from "../../constants/lobby/LoobyComponentMap";
import { useNavigate } from "react-router-dom";

interface lobbySideMenuProps {
  onSetViewMain: (num: number) => void;
  viewMain: number;
}

const LobbySideMenu = ({ viewMain, onSetViewMain }: lobbySideMenuProps) => {
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomCode(e.target.value);
  };

  return (
    <aside className="3xl:ml-[40px] ml-[36px] flex flex-col text-center">
      <div
        className={`3xl:w-[400px] w-[320px] 3xl:h-[200px] h-[160px] bg-contain bg-no-repeat bg-center flex items-center justify-center cursor-pointer`}
        style={{ backgroundImage: `url("${blackBtnImg}")` }}
        onClick={() => onSetViewMain(LOOBY_COMPONENT_MAP.CREATE_ROOM)}
      >
        <p
          className={`text-white 3xl:text-[45px] text-[36px] w-full hover:text-amber-300 duration-500 ${
            viewMain === 1 ? "text-yellow-200" : ""
          }`}
        >
          방 만들기
        </p>
      </div>
      <div
        className={`3xl:w-[400px] w-[320px] 3xl:h-[200px] h-[160px] bg-contain bg-no-repeat bg-center flex items-center justify-center cursor-pointer`}
        style={{ backgroundImage: `url("${blackBtnImg}")` }}
        onClick={() => onSetViewMain(LOOBY_COMPONENT_MAP.ROOM_LIST)}
      >
        <p
          className={`text-white 3xl:text-[45px] text-[36px] w-full hover:text-amber-300 duration-500 ${
            viewMain === 2 ? "text-yellow-200" : ""
          }`}
        >
          방 리스트
        </p>
      </div>
      <div
        className={`3xl:w-[400px] w-[320px] 3xl:h-[200px] h-[160px] bg-contain bg-no-repeat bg-center flex items-center justify-center`}
        style={{ backgroundImage: `url("${blackBtnImg}")` }}
      >
        <input
          type="text"
          className="3xl:w-[340px] w-[272px] 3xl:h-[90px] h-[72px] 3xl:text-[45px] text-[36px] text-center bg-black text-white underline"
          placeholder="방 번호 입력"
          maxLength={6}
          onChange={onChange}
          value={roomCode}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              navigate(`/room/${roomCode}`);
            }
          }}
        />
      </div>
      <img
        src={rabbitImg}
        className="absolute z-index-5 3xl:left-[120px] left-[96px] 3xl:top-[-130px] top-[-104px] 3xl:w-[260px] w-[208px]"
      />
    </aside>
  );
};

export default LobbySideMenu;
