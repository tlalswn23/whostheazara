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
      <img className="w-full" src={img} />
      {selected && (
        <span className="absolute 3xl:top-[24px] top-[19.2px] 3xl:left-[26px] left-[20.8px] transform -translate-x-1/2 -translate-y-1/2 text-red-600 3xl:text-[48px] text-[38.4px] font-bold">
          X
        </span>
      )}
    </div>
  );
};

export default RoomJobBtn;
