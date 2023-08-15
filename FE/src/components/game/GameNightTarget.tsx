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
  return (
    <>
      <div className={`relative 3xl:w-[375px] w-[300px] 3xl:h-[250px] h-[200px]`}>
        {isDie === 0 && (
          <div
            className={`w-full h-full flex justify-center items-center hover:brightness-[0.3] ${
              orderNo === selectUser ? "brightness-100" : "brightness-[0.15]"
            }`}
            onClick={() => {
              setSelectUser(orderNo);
              playSFX(SFX.CLICK);
            }}
          >
            <img className="absolute w-[36%]" src={JOB_MAP[myJob].imgColor} />
          </div>
        )}
      </div>
    </>
  );
};
