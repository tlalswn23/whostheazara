import { JOB_MAP } from "../../constants/common/JobMap";
import roomTitle from "../../assets/img/room/roomTitle.png";
import RoomJobBtn from "./RoomJobBtn";
import { JOB_ID, JobSettingType } from "../../types/RoomSettingType";

interface RoomHeaderProps {
  title: string;
  jobSetting: JobSettingType;
  setJobSetting: React.Dispatch<React.SetStateAction<JobSettingType>>;
}

export const RoomHeader = ({ title, jobSetting, setJobSetting }: RoomHeaderProps) => {
  return (
    <div
      className="3xl:w-[1420px] w-[1136px] 3xl:h-[126px] h-[100.8px] 3xl:text-[38px] text-[30.4px] text-white flex items-center bg-cover 3xl:ml-[25px] ml-[20px]"
      style={{ backgroundImage: `url("${roomTitle}")` }}
    >
      <p className="3xl:text-[30px] text-[24px] 3xl:w-[1000px] w-[800px] 3xl:ml-[50px] ml-[40px] overflow-hidden text-ellipsis whitespace-nowrap">
        {title}
      </p>
      <div className="flex justify-end w-[272px] 3xl:w-[340px]">
        {JOB_MAP.map(
          (job) =>
            job.id > 2 && (
              <RoomJobBtn
                key={job.id}
                img={job.imgColor}
                id={job.id}
                isUsedInitial={jobSetting[job.id.toString() as JOB_ID]}
                setJobSetting={setJobSetting}
              />
            )
        )}
      </div>
    </div>
  );
};
