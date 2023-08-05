import { useEffect, useState } from "react";
import { JobSettingType } from "../../types/RoomSettingType";

interface RoomJobBtnProps {
  id: number;
  img: string;
  isUsedInitial: boolean;
  setJobSetting: React.Dispatch<React.SetStateAction<JobSettingType>>;
}

const RoomJobBtn = ({ img, id, isUsedInitial, setJobSetting }: RoomJobBtnProps) => {
  const [isUsed, setIsUsed] = useState(isUsedInitial);
  const onToggleSelected = () => {
    setIsUsed((prev) => !prev);
  };

  useEffect(() => {
    setJobSetting((prev) => ({ ...prev, [id.toString()]: isUsed }));
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
