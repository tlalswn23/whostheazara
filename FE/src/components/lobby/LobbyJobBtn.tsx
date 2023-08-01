import { useEffect, useState } from "react";
import { RoomSettingContextType, useRoomSetting } from "../../context/roomSettingContext";

interface LobbyJobBtnProps {
  id: number;
  img: string;
}

const LobbyJobBtn = ({ img, id }: LobbyJobBtnProps) => {
  const [isSelected, setIsSelected] = useState(true);
  const { setRoomSetting } = useRoomSetting();
  const onToggleSelected = () => {
    setIsSelected((prev) => !prev);
  };

  useEffect(() => {
    setRoomSetting((prev: RoomSettingContextType): RoomSettingContextType => {
      const updatedJobSettings = { ...prev.jobSetting };

      updatedJobSettings[id] = isSelected;

      return {
        ...prev,
        jobSetting: updatedJobSettings,
      };
    });
  }, [isSelected]);

  return (
    <div
      className="3xl:w-[100px] w-[80px] 3xl:h-[50px] h-[40px] relative 3xl:mx-[37.5px] mx-[30px]"
      onClick={onToggleSelected}
    >
      <img className={`w-full ${!isSelected && "opacity-40"} cursor-pointer`} src={img} />
    </div>
  );
};

export default LobbyJobBtn;
