import { JOB_MAP } from "../../constants/common/JobMap";
import { SFX, playSFX } from "../../utils/audioManager";

interface GameNightTargetProps {
  myJob: number;
  orderNo: number;
  selectUser: number;
  setSelectUser: (num: number) => void;
  isDie: number;
}

export const GameNightTarget = ({ myJob, orderNo, selectUser, setSelectUser, isDie }: GameNightTargetProps) => {
  const selected = () => {
    if (orderNo === selectUser) {
      return "brightness-100";
    } else {
      return "brightness-50";
    }
  };

  return (
    <>
      <div className={`relative 3xl:w-[375px] w-[300px] 3xl:h-[250px] h-[200px]`}>
        {isDie === 0 && (
          <div
            className={`w-full h-full flex justify-center items-center cursor-green  hover:brightness-75 ${selected()}`}
            onClick={() => {setSelectUser(orderNo); playSFX(SFX.CLICK);}}
          >
            <img className="absolute w-[40%]" src={JOB_MAP[myJob].targetImg} />
          </div>
        )}
      </div>
    </>
  );
};
