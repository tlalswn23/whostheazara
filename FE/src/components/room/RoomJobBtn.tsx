import { useEffect, useState } from "react";
import { RoomSettingContextType, useRoomSetting } from "../../context/roomSettingContext";

interface RoomJobBtnProps {
  id: number;
  img: string;
}

const RoomJobBtn = ({ img, id }: RoomJobBtnProps) => {
  const [isUsed, setIsUsed] = useState(false);
  const { setRoomSetting } = useRoomSetting();
  const onToggleSelected = () => {
    setIsUsed((prev) => !prev);
  };

  useEffect(() => {
    setRoomSetting((prev: RoomSettingContextType): RoomSettingContextType => {
      const updatedJobSettings = { ...prev.jobSetting };
      updatedJobSettings[id] = isUsed;

      return {
        ...prev,
        jobSetting: updatedJobSettings,
      };
    });
  }, [isUsed]);

  return (
    <div
      className="3xl:w-[48px] w-[38.4px] 3xl:h-[48px] h-[38.4px] relative 3xl:mx-[8px] mx-[6.4px]"
      onClick={onToggleSelected}
    >
      <img className={`w-full ${isUsed && "opacity-40"} cursor-pointer`} src={img} />
    </div>
  );
};

export default RoomJobBtn;
