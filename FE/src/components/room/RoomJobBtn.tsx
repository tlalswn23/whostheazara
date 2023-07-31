import { useEffect, useState } from "react";
import { RoomSettingContextType, useRoomSetting } from "../../context/roomSettingContext";

interface RoomJobBtnProps {
  id: number;
  img: string;
}

const RoomJobBtn = ({ img, id }: RoomJobBtnProps) => {
  const [selected, setSelected] = useState(false);
  const { setRoomSetting } = useRoomSetting();
  const onToggleSelected = () => {
    setSelected((prev) => !prev);
  };

  useEffect(() => {
    setRoomSetting((prev: RoomSettingContextType): RoomSettingContextType => {
      const updatedJobSettings = [...prev.jobSetting];

      const jobToChange = updatedJobSettings.find((job) => job.id === id);
      if (jobToChange) {
        jobToChange.isSelect = selected;
      }

      return {
        ...prev,
        jobSetting: updatedJobSettings,
      };
    });
  }, [selected]);

  return (
    <div
      className="3xl:w-[48px] w-[38.4px] 3xl:h-[48px] h-[38.4px] relative 3xl:mx-[8px] mx-[6.4px]"
      onClick={onToggleSelected}
    >
      <img className={`w-full ${selected && "opacity-40"} cursor-pointer`} src={img} />
    </div>
  );
};

export default RoomJobBtn;
