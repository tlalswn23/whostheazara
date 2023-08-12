import { JOB_MAP } from "../../constants/common/JobMap";
import roomTitle from "../../assets/img/room/roomTitle.png";
import RoomJobBtn from "./RoomJobBtn";
import { JOB_ID, JobSetting } from "../../types/RoomSettingType";
import { useState } from "react";
import { useWebSocket } from "../../context/socketContext";
import { useParams } from "react-router-dom";
import { PubTitle } from "../../types/StompRoomPubType";
import { useEffect } from "react";
import { toast } from "react-toastify";
interface RoomHeaderProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  jobSetting: JobSetting;
  setJobSetting: React.Dispatch<React.SetStateAction<JobSetting>>;
  amIOwner: boolean;
}

export const RoomHeader = ({ amIOwner, title, setTitle, jobSetting, setJobSetting }: RoomHeaderProps) => {
  const { roomCode } = useParams<{ roomCode: string }>();
  const { client } = useWebSocket();
  const [isEditing, setIsEditing] = useState(false);
  const [inputTitle, setInputTitle] = useState(title);

  const onEditTitle = () => {
    setIsEditing(true);
  };

  const onCopyRoomCode = async () => {
    if (!roomCode) return;

    try {
      await navigator.clipboard.writeText(roomCode);
      toast.success("룸 코드가 복사되었습니다.");
    } catch (error) {
      toast.error("룸 코드 복사에 실패했습니다.");
    }
  };

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(event.target.value);
  };

  useEffect(() => {
    setInputTitle(title);
  }, [title]);

  const onCompleteEditTitle = () => {
    setTitle(inputTitle);

    if (!roomCode) return;
    const body: PubTitle = {
      title: inputTitle,
    };
    client?.publish({
      destination: `/pub/room/${roomCode}/title`,
      body: JSON.stringify(body),
    });

    setIsEditing(false);
  };

  return (
    <div
      className="3xl:w-[1420px] w-[1136px] 3xl:h-[126px] h-[100.8px] 3xl:text-[38px] text-[30.4px] text-white flex items-center bg-cover 3xl:ml-[25px] ml-[20px]"
      style={{ backgroundImage: `url("${roomTitle}")` }}
    >
      {amIOwner ? (
        isEditing ? (
          <div className="flex items-center 3xl:w-[1000px] w-[800px]">
            <input
              className="3xl:text-[30px] text-[24px] 3xl:ml-[50px] ml-[40px] mr-10 text-black "
              value={inputTitle}
              onChange={onTitleChange}
            />
            <button className="3xl:text-[30px] text-[24px]" onClick={onCompleteEditTitle}>
              완료
            </button>
          </div>
        ) : (
          <div className="flex items-center 3xl:w-[1000px] w-[800px]">
            <p className="3xl:text-[30px] text-[24px] 3xl:ml-[50px] ml-[40px] mr-10">{title}</p>
            <button
              className="3xl:text-[30px] text-[24px] border-4 rounded-md px-4 hover:text-amber-200 hover:border-amber-200 duration-500"
              onClick={onEditTitle}
            >
              제목 수정
            </button>
          </div>
        )
      ) : (
        <div className="flex items-center 3xl:w-[900px] w-[700px]">
          <p className="3xl:text-[30px] text-[24px] 3xl:ml-[50px] ml-[40px] mr-10">{title}</p>
        </div>
      )}
      <div className=" flex items-center">
        <div className="flex flex-col 3xl:text-[18px] text-[14px]">
          <p>룸 코드</p>
          <p>{roomCode}</p>
        </div>

        <button
          className=" mx-4 3xl:text-[24px] text-[14px] border-4 rounded-md px-4 hover:text-amber-200 hover:border-amber-200 duration-500"
          onClick={onCopyRoomCode}
        >
          코드 복사
        </button>
      </div>

      <div className="flex justify-end w-[272px] 3xl:w-[340px] mr-10">
        {JOB_MAP.map(
          (job, index) =>
            index > 2 && (
              <RoomJobBtn
                amIOwner={amIOwner}
                key={job.id}
                img={job.imgColor}
                id={job.id as JOB_ID}
                setJobSetting={setJobSetting}
                jobSetting={jobSetting}
              />
            )
        )}
      </div>
    </div>
  );
};
