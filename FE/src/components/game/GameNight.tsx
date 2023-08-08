import { useState } from "react";
import { GameNightTarget } from "./GameNightTarget";

export const GameNight = () => {
  let myJob = 1;
  const alive = [0, 1, 1, 1, 1, 1, 1, 0, 0];
  const [selectUser, setSelectUser] = useState(0);
  const hasAbility = () => {
    return myJob !== 0 && myJob !== 5 && myJob !== 6;
  };
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
