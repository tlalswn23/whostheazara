import jobPolice from "../../assets/img/jobPolice.png";
import jobDoctor from "../../assets/img/jobDoctor.png";
import jobArmy from "../../assets/img/jobArmy.png";
import jobPolitician from "../../assets/img/jobPolitician.png";
import jobThug from "../../assets/img/jobThug.png";

interface LobbyJobBtnProps {
  index: number;
  selectedJob: number;
  onSetSelectedJob: (num: number) => void;
}

export const LobbyJobBtn = ({ index, selectedJob, onSetSelectedJob }: LobbyJobBtnProps) => {
  const onSetToggleJob = () => {
    onSetSelectedJob(index);
  };

  const job = [jobPolice, jobDoctor, jobArmy, jobPolitician, jobThug];

  return (
    <>
      <div
        className="relative 3xl:w-[120px] w-[90px] 3xl:h-[120px] h-[90px] 3xl:mx-[36px] mx-[28px] 3xl:my-[40px] my-[30px] cursor-pointer"
        onClick={() => onSetToggleJob()}
      >
        <img src={job[index]} className="w-full h-full" />
        {(selectedJob & (1 << index)) != 0 ? (
          <p className="absolute 3xl:top-[-42px] top-[-32px] 3xl:left-[21px] left-[15px] 3xl:text-[128px] text-[102px] text-red-600">
            X
          </p>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
