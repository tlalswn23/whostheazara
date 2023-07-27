import simpleBlack from "../../assets/img/simpleBlack.png";

interface GameVoteItemProps {
  num: number;
  index: number;
  onSetSelectVote: (index: number) => void;
}

export const GameVoteUser = ({ num, index, onSetSelectVote }: GameVoteItemProps) => {
  return (
    <>
      <div
        className="w-[300px] h-[200px] flex justify-center items-center cursor-pointer hover:brightness-75"
        onClick={() => onSetSelectVote(index)}
      >
        <p className="text-red-600 text-[72px] font-bold drop-shadow-stroke-white">{num}</p>
      </div>
    </>
  );
};

export const GameVoteSkip = ({ num, index, onSetSelectVote }: GameVoteItemProps) => {
  return (
    <>
      <div
        className="w-[260px] h-[140px] bg-transparent flex items-center bg-cover cursor-pointer hover:brightness-75"
        style={{ backgroundImage: `url(${simpleBlack})` }}
        onClick={() => onSetSelectVote(index)}
      >
        <p className="text-white w-[180px] text-[28px] text-center">
          투표
          <br />
          건너뛰기
        </p>
        <p className="text-red-600 w-[80px] text-[72px] font-bold drop-shadow-stroke-white">{num}</p>
      </div>
    </>
  );
};
