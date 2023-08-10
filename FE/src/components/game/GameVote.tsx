import { GameVoteSkip, GameVoteUser } from "./GameVoteItem";
import { useWebSocket } from "../../context/socketContext";
import { useAccessTokenState } from "../../context/accessTokenContext";
import stompUrl from "../../api/url/stompUrl";
import { useParams } from "react-router-dom";

interface GameVoteProps {
  voteList: number[];
  setVoteList: React.Dispatch<React.SetStateAction<number[]>>;
  ghostList: number[];
}

export const GameVote = ({ voteList, setVoteList, ghostList }: GameVoteProps) => {
  const { client } = useWebSocket();
  const { userSeq } = useAccessTokenState();
  const { roomCode } = useParams();
  const onSetSelectVote = (userOrder: number) => {
    client?.publish({
      destination: stompUrl.pubGameVote(roomCode!),
      body: JSON.stringify({
        userSeq,
        targetUserSeq: userOrder,
      }),
    });

    setVoteList((prev) => {
      const newVoteList = prev.map((vote, index) => {
        if (index === userOrder) {
          return vote === 0 ? 1 : 0;
        }
        return vote;
      });
      return newVoteList;
    });
  };

  return (
    <>
      <div className="absolute w-full h-full flex flex-col justify-between">
        <div className="flex justify-between">
          <div className="flex">
            <GameVoteUser voteNum={voteList[0]} userOrder={0} onSetSelectVote={onSetSelectVote} isDie={ghostList[0]} />
            <GameVoteUser voteNum={voteList[1]} userOrder={1} onSetSelectVote={onSetSelectVote} isDie={ghostList[1]} />
          </div>
          <div className="flex">
            <GameVoteUser voteNum={voteList[2]} userOrder={2} onSetSelectVote={onSetSelectVote} isDie={ghostList[2]} />
            <GameVoteUser voteNum={voteList[3]} userOrder={3} onSetSelectVote={onSetSelectVote} isDie={ghostList[3]} />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex">
            <GameVoteUser voteNum={voteList[4]} userOrder={4} onSetSelectVote={onSetSelectVote} isDie={ghostList[4]} />
            <GameVoteUser voteNum={voteList[5]} userOrder={5} onSetSelectVote={onSetSelectVote} isDie={ghostList[5]} />
          </div>
          <div className="flex items-center">
            <GameVoteSkip voteNum={voteList[8]} onSetSelectVote={onSetSelectVote} />
          </div>
          <div className="flex">
            <GameVoteUser voteNum={voteList[6]} userOrder={6} onSetSelectVote={onSetSelectVote} isDie={ghostList[6]} />
            <GameVoteUser voteNum={voteList[7]} userOrder={7} onSetSelectVote={onSetSelectVote} isDie={ghostList[7]} />
          </div>
        </div>
      </div>
    </>
  );
};
