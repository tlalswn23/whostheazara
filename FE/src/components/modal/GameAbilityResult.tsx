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
  console.log(abilityList, myOrderNo);
  return <div>GameAbilityResult</div>;
};

export default GameAbilityResult;
