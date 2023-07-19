import test from "../../assets/img/rabbitImg.png";

interface LobbyJobBtn {
  index: number;
  selectedJob: number;
  onSetSelectedJob: (num: number) => void;
}

export const LobbyJobBtn = ({ index, selectedJob, onSetSelectedJob }: LobbyJobBtn) => {
  const onSetToggleJob = () => {
    onSetSelectedJob(index);
  };

  return (
    <>
      <div className="relative w-[120px] h-[120px] mx-[36px] my-[40px] cursor-pointer" onClick={() => onSetToggleJob()}>
        <img src={test} className="w-full h-full" />
        {(selectedJob & (1 << index)) != 0 ? (
          <p className="absolute top-[-30px] left-[24px] text-[100px] text-red-600">X</p>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
