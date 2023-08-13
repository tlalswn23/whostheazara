import { useEffect, useState } from "react";
import { GameNightTarget } from "./GameNightTarget";
import { useWebSocket } from "../../context/socketContext";
import { useParams } from "react-router-dom";
import { useAccessTokenState } from "../../context/accessTokenContext";

interface GameNightProps {
  ghostList: number[];
  userInfo: {
    userSeq: number;
    jobSeq: number;
    nickname: string;
  }[];
  myOrderNo: number;
  zaraTarget: number;
  userSeqOrderMap: { [userSeq: number]: number };
}

export const GameNight = ({ ghostList, userInfo, myOrderNo, zaraTarget, userSeqOrderMap }: GameNightProps) => {
  const { gameCode } = useParams();
  let myJob = userInfo[myOrderNo].jobSeq;
  const [selectUser, setSelectUser] = useState(-1);
  const hasAbility = () => {
    console.log("내직업 넘버 " + myJob);
    return myJob !== 1 && myJob !== 5 && myJob !== 6;
  };
  const { client } = useWebSocket();
  const { userSeq } = useAccessTokenState();

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

  useEffect(() => {
    client?.publish({
      destination: `/pub/game/${gameCode}/ability`,
      body: JSON.stringify({ userSeq: userSeq, targetUserSeq: mappingSeqOrd(selectUser) }),
    });
  }, [selectUser]);

  useEffect(() => {
    setSelectUser(userSeqOrderMap[zaraTarget]);
  }, [zaraTarget]);

  return (
    <>
      {hasAbility() && (
        <div className="absolute w-full h-full flex flex-col justify-between">
          <div className="flex justify-between">
            <div className="flex">
              <GameNightTarget
                myJob={myJob}
                orderNo={0}
                selectUser={selectUser}
                setSelectUser={setSelectUser}
                isDie={ghostList[0]}
              />
              <GameNightTarget
                myJob={myJob}
                orderNo={1}
                selectUser={selectUser}
                setSelectUser={setSelectUser}
                isDie={ghostList[1]}
              />
            </div>
            <div className="flex">
              <GameNightTarget
                myJob={myJob}
                orderNo={2}
                selectUser={selectUser}
                setSelectUser={setSelectUser}
                isDie={ghostList[2]}
              />
              <GameNightTarget
                myJob={myJob}
                orderNo={3}
                selectUser={selectUser}
                setSelectUser={setSelectUser}
                isDie={ghostList[3]}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex">
              <GameNightTarget
                myJob={myJob}
                orderNo={4}
                selectUser={selectUser}
                setSelectUser={setSelectUser}
                isDie={ghostList[4]}
              />
              <GameNightTarget
                myJob={myJob}
                orderNo={5}
                selectUser={selectUser}
                setSelectUser={setSelectUser}
                isDie={ghostList[5]}
              />
            </div>
            <div className="flex">
              <GameNightTarget
                myJob={myJob}
                orderNo={6}
                selectUser={selectUser}
                setSelectUser={setSelectUser}
                isDie={ghostList[6]}
              />
              <GameNightTarget
                myJob={myJob}
                orderNo={7}
                selectUser={selectUser}
                setSelectUser={setSelectUser}
                isDie={ghostList[7]}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
