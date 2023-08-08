import { useEffect, useState } from "react";
import { JobSetting } from "../../types/RoomSettingType";

interface LobbyJobBtnProps {
  id: string;
  img: string;
  setJobSetting: React.Dispatch<React.SetStateAction<JobSetting>>;
}

const LobbyJobBtn = ({ img, id, setJobSetting }: LobbyJobBtnProps) => {
  const [isUsed, setIsUsed] = useState(true);
  const onToggleSelected = () => {
    setIsUsed((prev) => !prev);
  };

  useEffect(() => {
    setJobSetting((prev) => ({ ...prev, [id]: isUsed }));
  }, [isUsed]);

  return (
    <div
      className="3xl:w-[100px] w-[80px] 3xl:h-[50px] h-[40px] relative 3xl:mx-[37.5px] mx-[30px]"
      onClick={onToggleSelected}
    >
      <img className={`w-full ${!isUsed && "opacity-40"} cursor-pointer`} src={img} />
    </div>
  );
};

export default LobbyJobBtn;
