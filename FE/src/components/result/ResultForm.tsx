import { useNavigate } from "react-router-dom";
import { BGM, playBGM } from "../../utils/audioManager";
import { ResultLose } from "./ResultLose";
import { ResultWin } from "./ResultWin";
// import { useLocation } from "react-router-dom";

export const ResultForm = () => {
  // const location = useLocation();
  // const userResultInfoList = location.state.userInfo;
  // const rabbitWin = location.state.rabbitWin;
  // const { roomCode } = location.state;
  const roomCode = "1234";
  const navigate = useNavigate();

  // FIXME: 데이터 형식
  const rabbitWin = true;
  const userResultInfoList = [
    { userSeq: 1, jobSeq: 1, win: true, nickname: "토끼1", order: 3 },
    { userSeq: 22, jobSeq: 1, win: true, nickname: "토끼2", order: 0 },
    { userSeq: 34, jobSeq: 2, win: false, nickname: "자라1", order: 1 },
    { userSeq: 45, jobSeq: 2, win: false, nickname: "자라2", order: 7 },
    { userSeq: 56, jobSeq: 5, win: true, nickname: "정치인1", order: 2 },
    { userSeq: 67, jobSeq: 4, win: true, nickname: "경찰1", order: 6 },
  ];

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
        </div>
      ) : (
        <div className="flex flex-col justify-around w-full h-full bg-gradient-to-b from-black from-20% font-bold to-green-200">
          <div className="flex justify-center text-white">
            {userResultInfoList.map((item, index) => {
              return (
                item.win && <ResultLose jobSeq={item.jobSeq} order={item.order} nickname={item.nickname} key={index} />
              );
            })}
          </div>
          <p className="text-[72px] text-center font-bold text-green-200">자라 승리</p>
          <div className="flex justify-center  text-red-500">
            {userResultInfoList.map((item, index) => {
              return (
                !item.win && <ResultWin jobSeq={item.jobSeq} order={item.order} nickname={item.nickname} key={index} />
              );
            })}
          </div>
        </div>
      )}

      <button onClick={() => goToRoom(roomCode)}>방으로 복귀</button>
    </>
  );
};
