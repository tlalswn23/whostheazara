import simpleBlack from "../../assets/img/common/simpleBlack.png";

interface GameVoteItemProps {
  num: number;
  index: number;
  onSetSelectVote: (index: number) => void;
}

export const GameVoteUser = ({ num, index, onSetSelectVote }: GameVoteItemProps) => {
  return (
    <>
      <div
        className="3xl:w-[375px] w-[300px] 3xl:h-[250px] h-[200px] flex justify-end items-end 3xl:pr-[30px] pr-[24px] 3xl:pb-[20px] pb-[16px] cursor-pointer hover:brightness-75"
        onClick={() => onSetSelectVote(index)}
      >
        <p className="text-red-600 3xl:text-[60px] text-[48px] font-bold drop-shadow-stroke-white">{num}</p>
      </div>
    </>
  );
};

export const GameVoteSkip = ({ num, index, onSetSelectVote }: GameVoteItemProps) => {
  return (
    <>
      <div
        className="3xl:w-[325px] w-[260px] 3xl:h-[175px] h-[140px] bg-transparent flex items-center bg-cover cursor-pointer hover:brightness-75"
        style={{ backgroundImage: `url("${simpleBlack}")` }}
        onClick={() => onSetSelectVote(index)}
      >
        <p className="text-white 3xl:w-[225px] w-[180px] 3xl:text-[35px] text-[28px] text-center">
          투표
          <br />
          건너뛰기
        </p>
        <p className="text-red-600 3xl:w-[100px] w-[80px] 3xl:text-[60px] text-[48px] font-bold drop-shadow-stroke-white">
          {num}
        </p>
      </div>
    </>
  );
};
