import LobbyJobBtn from "./LobbyJobBtn";
import yellowBtnImg from "../../assets/img/common/yellowBtnImg.png";
import { JOB_MAP } from "../../constants/common/JobMap";
import { useRoomSetting } from "../../context/roomSettingContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRoomsApiCall } from "../../api/axios/useRoomsApiCall";

export const LobbyCreateRoom = () => {
  const { createRoom } = useRoomsApiCall();
  const navigate = useNavigate();
  const { roomSetting, setRoomSetting } = useRoomSetting();

  const onCreateRoom = async () => {
    if (roomSetting.title === "") {
      toast.warn("방 제목을 입력해주세요.");
      return;
    }
    const roomCode = await createRoom(roomSetting.title, roomSetting.jobSetting);
    navigate(`/room/${roomCode}`);
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomSetting((prev) => {
      return {
        ...prev,
        title: e.target.value,
      };
    });
  };

  const [maxUserCnt, setMaxUserCnt] = useState(6);

  const decreaseMaxUserCnt = () => {
    setMaxUserCnt((prevValue) => {
      const newValue = Math.max(prevValue - 1, 6);
      setRoomSetting((prev) => {
        return {
          ...prev,
          maxUsers: newValue,
        };
      });
      return newValue;
    });
  };

  const increaseMaxUserCnt = () => {
    setMaxUserCnt((prevValue) => {
      const newValue = Math.min(prevValue + 1, 8);
      setRoomSetting((prev) => {
        return {
          ...prev,
          maxUsers: newValue,
        };
      });
      return newValue;
    });
  };

  return (
    <div className="flex flex-col items-center w-full h-full mt-10">
      <div className="flex justify-around">
        <p className="text-white 3xl:px-[36px] px-[28px] 3xl:mr-[48px] mr-[38px]">방 제목</p>
        <div className="3xl:w-[580px] w-[464px] text-center">
          <input
            className=" w-3/4 3xl:px-[20px] px-[15px] text-[42px]"
            onChange={onChangeTitle}
            maxLength={16}
            minLength={2}
            value={roomSetting.title}
          />
        </div>
      </div>

      <div className="flex mt-12">
        <p className="text-white 3xl:px-[36px] px-[28px] 3xl:mr-[48px] mr-[38px]">최대 참가 인원</p>
        <div className="3xl:w-[580px] w-[464px] ">
          <div className="flex items-center w-full">
            <button
              onClick={decreaseMaxUserCnt}
              disabled={maxUserCnt === 6}
              className="px-4 py-2 text-lg font-bold bg-red-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              -
            </button>
            <input
              type="number"
              value={maxUserCnt}
              min="6"
              max="8"
              readOnly
              className="w-1/4 mx-4 text-[42px] text-center"
            />
            <button
              onClick={increaseMaxUserCnt}
              disabled={maxUserCnt === 8}
              className="px-4 py-2 text-lg font-bold bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="3xl:mt-[20px] mt-[10px] flex flex-col justify-between">
        <p className="text-white 3xl:px-[36px] px-[28px] 3xl:mr-[48px] mr-[38px] 3xl:mt-[40px] mt-[30px] mb-6">역할</p>
        <div className="flex">
          {JOB_MAP.map((job) => job.id > 2 && <LobbyJobBtn key={job.id} img={job.imgColor} id={job.id} />)}
        </div>
      </div>
      <div className="absolute 3xl:w-[360px] w-[288px] 3xl:h-[120px] h-[96px] flex justify-center items-center bottom-[-40px] right-[40px]">
        <img src={yellowBtnImg} className="absolute" />
        <button className="absolute w-full text-center py-[20px]" onClick={onCreateRoom}>
          방 생성
        </button>
      </div>
    </div>
  );
};
