import { useEffect, useState } from "react";
import { JobSettingContextType, RoomSettingContextType, useRoomSetting } from "../../context/roomSettingContext";

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

  const jobSetting: JobSettingContextType = { id, isSelect: selected };

  useEffect(() => {
    setRoomSetting(
      (prev: RoomSettingContextType): RoomSettingContextType => ({
        ...prev,
        jobSetting: [...prev.jobSetting, jobSetting],
      })
    );
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
