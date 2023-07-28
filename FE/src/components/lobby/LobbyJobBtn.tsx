import { useEffect, useState } from "react";
import { RoomSettingContextType, useRoomSetting } from "../../context/roomSettingContext";

interface LobbyJobBtnProps {
  id: number;
  img: string;
}

const LobbyJobBtn = ({ img, id }: LobbyJobBtnProps) => {
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
      className="3xl:w-[50px] w-[80px] 3xl:h-[50px] h-[40px] relative 3xl:mr-[24px] mx-[30px]"
      onClick={onToggleSelected}
    >
      <img className="w-full" src={img} />
      {selected && (
        <span className="absolute 3xl:top-[34.4px] top-[36px] 3xl:left-[27.5px] left-[43px] transform -translate-x-1/2 -translate-y-1/2 text-red-600 3xl:text-[50px] text-[70px] font-bold">
          X
        </span>
      )}
    </div>
  );
};

export default LobbyJobBtn;
