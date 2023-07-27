import { useEffect, useState } from "react";
import { JobSettingContextType, RoomSettingContextType, useRoomSetting } from "../../context/roomSettingContext";

interface LobbyJobBtnProps {
  id: number;
  img: string;
}

const LobbyJobBtn = ({ img, id }: LobbyJobBtnProps) => {
  const [selected, setSelected] = useState(false);
  const { roomSetting, setRoomSetting } = useRoomSetting();

  const onToggleSelected = () => {
    setSelected((prev) => !prev);
  };

  useEffect(() => {
    console.log(roomSetting);
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
    <div className=" relative mx-6" onClick={onToggleSelected}>
      <img src={img} />
      {selected && (
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-600 3xl:text-8xl text-7xl">
          X
        </span>
      )}
    </div>
  );
};

export default LobbyJobBtn;
