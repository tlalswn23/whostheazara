import { useEffect, useState } from "react";
import { JobSetting } from "../../types/RoomSettingType";
import { useWebSocket } from "../../context/socketContext";
import { useParams } from "react-router-dom";
import { PubJobSetting } from "../../types/StompRoomPubType";

interface RoomJobBtnProps {
  id: string;
  img: string;
  isUsedInitial: boolean;
  setJobSetting: React.Dispatch<React.SetStateAction<JobSetting>>;
  jobSetting: JobSetting;
  isOwner: boolean;
}

const RoomJobBtn = ({ isOwner, img, id, isUsedInitial, setJobSetting, jobSetting }: RoomJobBtnProps) => {
  const { roomCode } = useParams();
  const { client } = useWebSocket();
  const [isUsed, setIsUsed] = useState(isUsedInitial);

  const onToggleSelected = () => {
    setIsUsed((prev) => !prev);
  };

  useEffect(() => {
    setIsUsed(isUsedInitial);
  }, [isUsedInitial]);

  useEffect(() => {
    if (!roomCode || !client) return;

    const newJobSetting = { ...jobSetting, [id]: isUsed };
    const body: PubJobSetting = {
      data: newJobSetting,
    };

    client.publish({
      destination: `/pub/room/${roomCode}/jobSetting`,
      body: JSON.stringify(body),
    });

    setJobSetting(newJobSetting);
  }, [isUsed]);

  return (
    <>
      {isOwner ? (
        <div
          className="3xl:w-[48px] w-[38.4px] 3xl:h-[48px] h-[38.4px] relative 3xl:mx-[8px] mx-[6.4px]"
          onClick={onToggleSelected}
        >
          {isUsed ? (
            <img className="w-full cursor-pointer" src={img} />
          ) : (
            <img className={`w-full opacity-40 cursor-pointer`} src={img} />
          )}
        </div>
      ) : (
        <div className="3xl:w-[48px] w-[38.4px] 3xl:h-[48px] h-[38.4px] relative 3xl:mx-[8px] mx-[6.4px]">
          {isUsed ? <img className="w-full " src={img} /> : <img className={`w-full opacity-40 `} src={img} />}
        </div>
      )}
    </>
  );
};

export default RoomJobBtn;
