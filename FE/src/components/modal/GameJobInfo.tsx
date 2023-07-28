import Rodal from "rodal";
import { JOB_MAP } from "../../constants/JobMap";

interface GameJobInfoProps {
  infoOn: boolean;
  onSetInfoOn: () => void;
}

export const GameJobInfo = ({ infoOn, onSetInfoOn }: GameJobInfoProps) => {
  return (
    <Rodal
      visible={infoOn}
      onClose={() => onSetInfoOn()}
      enterAnimation="zoom"
      leaveAnimation="door"
      duration={500}
      width={1100}
      height={480}
      closeOnEsc={true}
      showCloseButton={false}
      customStyles={{
        backgroundColor: "rgba(0, 0, 0, 0)",
      }}
    >
      <div className="w-full h-full bg-black border-solid border-[10px] border-white flex flex-wrap">
        {JOB_MAP.map((item) => (
          <div className="flex w-[50%] items-center" key={item.id}>
            <img src={item.img} className="w-[72px] h-[72px] mx-[20px]" />
            <p className="text-white text-[22px] px-[20px]">
              {item.name} - {item.info}
            </p>
          </div>
        ))}
      </div>
    </Rodal>
  );
};
