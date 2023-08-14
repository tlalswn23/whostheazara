import { useNavigate } from "react-router-dom";
import { BGM, playBGM } from "../../utils/audioManager";
import { ResultLose } from "./ResultLose";
import { ResultWin } from "./ResultWin";
import { useLocation } from "react-router-dom";

export interface GameResultFromGamePage {
  userInfo: {
    userSeq: number;
    jobSeq: number;
    win: boolean;
    nickname: string;
    order: number;
  }[];
  rabbitWin: boolean;
  roomCode: string;
}

export const ResultForm = () => {
  const location = useLocation();
  const gameResultFromGamePage: GameResultFromGamePage = location.state;

  const userResultInfoList = gameResultFromGamePage.userInfo;
  const { rabbitWin } = gameResultFromGamePage;
  const { roomCode } = gameResultFromGamePage;
  const navigate = useNavigate();

  if (rabbitWin) {
    playBGM(BGM.WIN);
  } else {
    playBGM(BGM.LOSE);
  }

  const goToRoom = (roomCode: string) => {
    navigate(`/room/${roomCode}`, {
      state: {
        isComeFromGame: true,
      },
    });
  };

  return (
    <>
      {rabbitWin ? (
        <div className="flex flex-col justify-around w-full h-full bg-gradient-to-b from-black from-20% font-bold to-yellow-200">
          <div className="flex justify-center text-red-500">
            {userResultInfoList.map((item, index) => {
              return (
                !item.win && <ResultLose jobSeq={item.jobSeq} order={item.order} nickname={item.nickname} key={index} />
              );
            })}
          </div>
          <p className="text-[72px] text-center font-bold text-yellow-200">토끼 승리</p>
          <div className="flex justify-center text-white">
            {userResultInfoList.map((item, index) => {
              return (
                item.win && <ResultWin jobSeq={item.jobSeq} order={item.order} nickname={item.nickname} key={index} />
              );
            })}
          </div>
          <button onClick={() => goToRoom(roomCode)}>방으로 복귀</button>
        </div>
      ) : (
        <div className="flex flex-col justify-around w-full h-full bg-gradient-to-b from-black from-20% font-bold to-green-200">
          <div className="flex justify-center text-white">
            {userResultInfoList.map((item, index) => {
              return (
                !item.win && <ResultLose jobSeq={item.jobSeq} order={item.order} nickname={item.nickname} key={index} />
              );
            })}
          </div>
          <p className="text-[72px] text-center font-bold text-green-200">자라 승리</p>
          <div className="flex justify-center  text-red-500">
            {userResultInfoList.map((item, index) => {
              return (
                item.win && <ResultWin jobSeq={item.jobSeq} order={item.order} nickname={item.nickname} key={index} />
              );
            })}
          </div>
          <button onClick={() => goToRoom(roomCode)}>방으로 복귀</button>
        </div>
      )}
    </>
  );
};
