import { JOB_MAP } from "../../constants/common/JobMap";

interface GameNightTargetProps {
  myJob: number;
  orderNo: number;
  selectUser: number;
  setSelectUser: (num: number) => void;
  isDie: number;
}

export const GameNightTarget = ({ myJob, orderNo, selectUser, setSelectUser, isDie }: GameNightTargetProps) => {
  const isAlive = () => {
    return isDie === 0;
  };
  const selected = () => {
    if (orderNo === selectUser) {
      return "brightness-100";
    } else {
      return "brightness-50";
    }
  };
  return (
    <>
      {isAlive() && (
        <div
          className={`relative 3xl:w-[375px] w-[300px] 3xl:h-[250px] h-[200px] flex justify-center items-center cursor-pointer  hover:brightness-75 ${selected()}`}
          onClick={() => setSelectUser(orderNo)}
        >
          <img className="absolute w-[40%]" src={JOB_MAP[myJob].targetImg} />
        </div>
      )}
    </>
  );
};
