import { useEffect, useState } from "react";
import { useRoomSetting } from "../../context/roomSettingContext";

interface LobbyJobBtnProps {
  id: number;
  img: string;
}

interface JobSettingContextType {
  id?: number;
  isSelect?: boolean;
}
type RoomSettingContextType = JobSettingContextType[];

const LobbyJobBtn = ({ img, id }: LobbyJobBtnProps) => {
  const [selected, setSelected] = useState(false);
  const { roomSetting, setRoomSetting } = useRoomSetting();

  const onToggleSelected = () => {
    setSelected((prev) => !prev);
  };

  const jobSetting: JobSettingContextType = { id, isSelect: selected };

  useEffect(() => {
    setRoomSetting((prev: RoomSettingContextType): RoomSettingContextType => [...prev, jobSetting]);
  }, [selected]);

  return (
    <div className=" relative mx-6 mt-12" onClick={onToggleSelected}>
      <img src={img} />
      {selected && (
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-600 text-8xl">
          X
        </span>
      )}
    </div>
  );
};

export default LobbyJobBtn;
