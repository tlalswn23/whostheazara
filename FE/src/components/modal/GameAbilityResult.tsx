import { useState, useEffect } from "react";
import Rodal from "rodal";

interface GameAbilityResultProps {
  abilityList: {
    userSeq: number;
    jobSeq: number;
    nickname: string;
    ability: boolean;
  }[];
  myOrderNo: number;
}

const GameAbilityResult = ({ abilityList, myOrderNo }: GameAbilityResultProps) => {
  useEffect(() => {
    console.log(abilityList, myOrderNo);
  }, []);
  const [viewMyJob, setViewMyJob] = useState(true);
  return (
    <>
      <Rodal
        visible={viewMyJob}
        onClose={() => setViewMyJob(false)}
        enterAnimation="slideUp"
        leaveAnimation="slideDown"
        duration={500}
        width={1}
        height={1}
        closeOnEsc={true}
        showCloseButton={false}
        customStyles={{
          backgroundColor: "rgba(0, 0, 0, 0)",
        }}
      >
        <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 3xl:w-[480px] w-[384px] 3xl:h-[480px] h-[384px] bg-gray-900 border-solid 3xl:border-[10px] border-[8px] border-white flex flex-col justify-center items-center 3xl:text-[32px] text-white text-[25.6px]">
          <p className=""></p>
        </div>
      </Rodal>
      ;
    </>
  );
};

export default GameAbilityResult;
