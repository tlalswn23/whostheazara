import { GameVoteSkip, GameVoteUser } from "./GameVoteItem";
import { useWebSocket } from "../../context/socketContext";
import { useAccessTokenState } from "../../context/accessTokenContext";
import stompUrl from "../../api/url/stompUrl";
import { useParams } from "react-router-dom";

interface GameVoteProps {
  voteList: { userSeq: number; cnt: number }[];
  ghostList: number[];
  userSeqOrderMap: { [userSeq: number]: number };
}

export const GameVote = ({ voteList, ghostList, userSeqOrderMap }: GameVoteProps) => {
  const { client } = useWebSocket();
  const { userSeq } = useAccessTokenState();
  const { roomCode } = useParams();

  const mappingSeqOrd = (userOrder: number) => {
    let targetSeq = 0;
    for (const key in userSeqOrderMap) {
      if (userSeqOrderMap[key] === userOrder) {
        targetSeq = parseInt(key);
        break;
      }
    }

    return targetSeq;
  };

  const onSetSelectVote = (userOrder: number) => {
    const targetSeq = mappingSeqOrd(userOrder);
    client?.publish({
      destination: stompUrl.pubGameVote(roomCode!),
      body: JSON.stringify({
        userSeq,
        targetUserSeq: targetSeq,
      }),
    });
  };

  console.log(GameVoteSkip);

  return (
    <>
      <div className="absolute w-full h-full flex flex-col justify-between">
        <div className="flex justify-between">
          <div className="flex">
            <GameVoteUser
              voteNum={voteList[0].cnt}
              userOrder={0}
              onSetSelectVote={onSetSelectVote}
              isDie={ghostList[0]}
            />
            <GameVoteUser
              voteNum={voteList[1].cnt}
              userOrder={1}
              onSetSelectVote={onSetSelectVote}
              isDie={ghostList[1]}
            />
          </div>
          <div className="flex">
            <GameVoteUser
              voteNum={voteList[2].cnt}
              userOrder={2}
              onSetSelectVote={onSetSelectVote}
              isDie={ghostList[2]}
            />
            <GameVoteUser
              voteNum={voteList[3].cnt}
              userOrder={3}
              onSetSelectVote={onSetSelectVote}
              isDie={ghostList[3]}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex">
            <GameVoteUser
              voteNum={voteList[4].cnt}
              userOrder={4}
              onSetSelectVote={onSetSelectVote}
              isDie={ghostList[4]}
            />
            <GameVoteUser
              voteNum={voteList[5].cnt}
              userOrder={5}
              onSetSelectVote={onSetSelectVote}
              isDie={ghostList[5]}
            />
          </div>
          <div className="flex items-center">
            {/* <GameVoteSkip voteNum={voteList[8]} onSetSelectVote={onSetSelectVote} /> */}
          </div>
          <div className="flex">
            <GameVoteUser
              voteNum={voteList[6].cnt}
              userOrder={6}
              onSetSelectVote={onSetSelectVote}
              isDie={ghostList[6]}
            />
            <GameVoteUser
              voteNum={voteList[7].cnt}
              userOrder={7}
              onSetSelectVote={onSetSelectVote}
              isDie={ghostList[7]}
            />
          </div>
        </div>
      </div>
    </>
  );
};
