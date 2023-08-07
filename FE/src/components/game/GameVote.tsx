import { useEffect, useState } from "react";
import { GameVoteSkip, GameVoteUser } from "./GameVoteItem";
import { VOTE_MAP } from "../../constants/game/VoteMap";

export const GameVote = () => {
  const [selectVote, setSelectVote] = useState(0);
  const [vote, setVote] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  useEffect(() => {
    // 서버로 부터 실시간 데이터 받아서 투표 결과 변경
    //dummy;
    init();
  }, []);

  useEffect(() => {
    // 내가 투표 선택을 변경한 경우
    // 서버에게 바뀐 데이터 전달
  }, [selectVote]);

  const init = () => {
    setSelectVote(0);
    setVote([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  };

  const onSetSelectVote = (loc: number) => {
    if (loc === selectVote) {
      return;
    }

    const newVote = vote.map((item, index) => {
      if (index === selectVote) {
        return item - 1;
      } else if (index === loc) {
        return item + 1;
      }
      return item;
    });
    setSelectVote(loc);
    setVote(newVote);
  };

  return (
    <>
      <div className="absolute w-full h-full flex flex-col justify-between">
        <div className="flex justify-between">
          <div className="flex">
            <GameVoteUser num={vote[VOTE_MAP.USER1]} index={VOTE_MAP.USER1} onSetSelectVote={onSetSelectVote} />
            <GameVoteUser num={vote[VOTE_MAP.USER2]} index={VOTE_MAP.USER2} onSetSelectVote={onSetSelectVote} />
          </div>
          <div className="flex">
            <GameVoteUser num={vote[VOTE_MAP.USER3]} index={VOTE_MAP.USER3} onSetSelectVote={onSetSelectVote} />
            <GameVoteUser num={vote[VOTE_MAP.USER4]} index={VOTE_MAP.USER4} onSetSelectVote={onSetSelectVote} />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex">
            <GameVoteUser num={vote[VOTE_MAP.USER5]} index={VOTE_MAP.USER5} onSetSelectVote={onSetSelectVote} />
            <GameVoteUser num={vote[VOTE_MAP.USER6]} index={VOTE_MAP.USER6} onSetSelectVote={onSetSelectVote} />
          </div>
          <div className="flex items-center">
            <GameVoteSkip num={vote[VOTE_MAP.SKIP]} index={VOTE_MAP.SKIP} onSetSelectVote={onSetSelectVote} />
          </div>
          <div className="flex">
            <GameVoteUser num={vote[VOTE_MAP.USER7]} index={VOTE_MAP.USER7} onSetSelectVote={onSetSelectVote} />
            <GameVoteUser num={vote[VOTE_MAP.USER8]} index={VOTE_MAP.USER8} onSetSelectVote={onSetSelectVote} />
          </div>
        </div>
      </div>
    </>
  );
};
