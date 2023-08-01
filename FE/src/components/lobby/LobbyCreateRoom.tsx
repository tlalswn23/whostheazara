import LobbyJobBtn from "./LobbyJobBtn";
import yellowBtnImg from "../../assets/img/common/yellowBtnImg.png";
import { JOB_MAP } from "../../constants/common/JobMap";
import { useRoomSetting } from "../../context/roomSettingContext";

export const LobbyCreateRoom = () => {
  const { roomSetting, setRoomSetting } = useRoomSetting();

  // const onCreateRoom = async () => {
  //   if (roomSetting.title === "") {
  //     toast.warn("방 제목을 입력해주세요.");
  //     return;
  //   }
  //   try {
  //     const roomCode = await createRoom(roomSetting.title);
  //     navigate(`/room/${roomCode}`);
  //   } catch (error) {
  //     const { status } = (error as AxiosError).response!;
  //     if (status === ERROR_CODE_MAP.IN_VALID_REFRESH_TOKEN) {
  //       toast.error("다시 로그인 해주세요.");
  //       navigate("/");
  //     }
  //   }
  // };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomSetting((prev) => {
      return {
        ...prev,
        title: e.target.value,
      };
    });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="flex">
        <p className="text-white 3xl:px-[36px] px-[28px] 3xl:mr-[48px] mr-[38px]">방 제목</p>
        <div className="3xl:w-[580px] w-[464px] flex justify-between">
          <input
            className="w-full 3xl:px-[20px] px-[15px] text-[42px]"
            onChange={onChange}
            maxLength={16}
            minLength={2}
            value={roomSetting.title}
          />
        </div>
      </div>
      <div className="3xl:mt-[40px] mt-[30px] flex flex-col justify-between">
        <p className="text-white 3xl:px-[36px] px-[28px] 3xl:mr-[48px] mr-[38px] 3xl:mt-[40px] mt-[30px] mb-6">역할</p>
        <div className="flex">
          {JOB_MAP.map((job) => job.id > 2 && <LobbyJobBtn key={job.id} img={job.imgColor} id={job.id} />)}
        </div>
      </div>
      <div className="absolute 3xl:w-[360px] w-[288px] 3xl:h-[120px] h-[96px] flex justify-center items-center bottom-[-40px] right-[40px]">
        <img src={yellowBtnImg} className="absolute" />
        <button className="absolute w-full text-center py-[20px]">방 생성</button>
      </div>
    </div>
  );
};
