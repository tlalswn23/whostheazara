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
      <div className="relative w-[120px] h-[120px] mx-[36px] my-[40px] cursor-pointer" onClick={() => onSetToggleJob()}>
        <img src={job[index]} className="w-full h-full" />
        {(selectedJob & (1 << index)) != 0 ? (
          <p className="absolute top-[-42px] left-[21px] text-[128px] text-red-600">X</p>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
