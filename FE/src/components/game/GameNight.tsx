import { useEffect, useState } from "react";
import { GameNightTarget } from "./GameNightTarget";
import { useWebSocket } from "../../context/socketContext";
import { useParams } from "react-router-dom";
import { useAccessTokenState } from "../../context/accessTokenContext";

export const GameNight = () => {
  const { gameCode } = useParams();
  let myJob = 1;
  const alive = [0, 1, 1, 1, 1, 1, 1, 0, 0];
  const [selectUser, setSelectUser] = useState(0);
  const hasAbility = () => {
    return myJob !== 0 && myJob !== 5 && myJob !== 6;
  };
  const { client } = useWebSocket();
  const { userSeq } = useAccessTokenState();

  // 위에서 상태 받아오기
  const [userInfo, setUserInfo] = useState([{ userSeq: 0, jobSeq: 0, nickname: "" }]);
  const targetUserSeq = userInfo[selectUser].userSeq;
  const [isTimerEnd, setIsTimerEnd] = useState(false);
  const [amIZara, setAmIZara] = useState(false);

  useEffect(() => {
    if (isTimerEnd) {
      client?.publish({
        destination: `/pub/game/${gameCode}/vote`,
        body: JSON.stringify({ userSeq, targetUserSeq }),
      });
      setIsTimerEnd(false);
    }
  }, [isTimerEnd]);

  useEffect(() => {
    if (amIZara) {
      client?.publish({
        destination: `/pub/game/${gameCode}/zara`,
        body: JSON.stringify({ userSeq, targetUserSeq }),
      });
    }
  }, [selectUser]);

  return (
    <>
      {hasAbility() && (
        <div className="absolute w-full h-full flex flex-col justify-between">
          <div className="flex justify-between">
            <div className="flex">
              <GameNightTarget
                myJob={myJob}
                orderNo={1}
                selectUser={selectUser}
                setSelectUser={setSelectUser}
                alive={alive[1]}
              />
              <GameNightTarget
                myJob={myJob}
                orderNo={2}
                selectUser={selectUser}
                setSelectUser={setSelectUser}
                alive={alive[2]}
              />
            </div>
            <div className="flex">
              <GameNightTarget
                myJob={myJob}
                orderNo={3}
                selectUser={selectUser}
                setSelectUser={setSelectUser}
                alive={alive[3]}
              />
              <GameNightTarget
                myJob={myJob}
                orderNo={4}
                selectUser={selectUser}
                setSelectUser={setSelectUser}
                alive={alive[4]}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex">
              <GameNightTarget
                myJob={myJob}
                orderNo={5}
                selectUser={selectUser}
                setSelectUser={setSelectUser}
                alive={alive[5]}
              />
              <GameNightTarget
                myJob={myJob}
                orderNo={6}
                selectUser={selectUser}
                setSelectUser={setSelectUser}
                alive={alive[6]}
              />
            </div>
            <div className="flex">
              <GameNightTarget
                myJob={myJob}
                orderNo={7}
                selectUser={selectUser}
                setSelectUser={setSelectUser}
                alive={alive[7]}
              />
              <GameNightTarget
                myJob={myJob}
                orderNo={8}
                selectUser={selectUser}
                setSelectUser={setSelectUser}
                alive={alive[8]}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
