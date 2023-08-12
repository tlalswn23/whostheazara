import { useEffect, useState } from "react";
import { RABBIT_DIR_MAP } from "../../constants/game/RabbitDirMap";
import { RABBIT_MAP } from "../../constants/common/RabbitMap";
import { RABBIT_STATE_MAP } from "../../constants/game/RabbitStateMap";
import GameVoteKill from "./GameVoteKill";
interface GameRabbitProps {
  userInfo: {
    userSeq: number;
    jobSeq: number;
    nickname: string;
  }[];
  myOrderNo: number;
  setDeathByVoteOrderNo: (num: number | null) => void;
  deathByVoteOrderNo: number | null;
  setDeathByZaraOrderNo: (num: number | null) => void;
  deathByZaraOrderNo: number | null;
}

export const GameRabbit = ({
  userInfo,
  myOrderNo,
  setDeathByVoteOrderNo,
  deathByVoteOrderNo,
  setDeathByZaraOrderNo,
  deathByZaraOrderNo,
}: GameRabbitProps) => {
  const [render, setRender] = useState(false);
  const [rabbit, setRabbit] = useState([
    {
      y: RABBIT_MAP[0].DEFAULT_Y,
      x: RABBIT_MAP[0].DEFAULT_X,
      state: RABBIT_STATE_MAP.STAND,
      isDie: false,
      isKilled: false,
      dir: RABBIT_DIR_MAP.RIGHT,
      userNo: 0,
      nickname: "",
      job: 0,
    },
    {
      y: RABBIT_MAP[1].DEFAULT_Y,
      x: RABBIT_MAP[1].DEFAULT_X,
      state: RABBIT_STATE_MAP.STAND,
      isDie: false,
      isKilled: false,
      dir: RABBIT_DIR_MAP.RIGHT,
      userNo: 0,
      nickname: "",
      job: 0,
    },
    {
      y: RABBIT_MAP[2].DEFAULT_Y,
      x: RABBIT_MAP[2].DEFAULT_X,
      state: RABBIT_STATE_MAP.STAND,
      isDie: false,
      isKilled: false,
      dir: RABBIT_DIR_MAP.LEFT,
      userNo: 0,
      nickname: "",
      job: 0,
    },
    {
      y: RABBIT_MAP[3].DEFAULT_Y,
      x: RABBIT_MAP[3].DEFAULT_X,
      state: RABBIT_STATE_MAP.STAND,
      isDie: false,
      isKilled: false,
      dir: RABBIT_DIR_MAP.LEFT,
      userNo: 0,
      nickname: "",
      job: 0,
    },
    {
      y: RABBIT_MAP[4].DEFAULT_Y,
      x: RABBIT_MAP[4].DEFAULT_X,
      state: RABBIT_STATE_MAP.STAND,
      isDie: false,
      isKilled: false,
      dir: RABBIT_DIR_MAP.RIGHT,
      userNo: 0,
      nickname: "",
      job: 0,
    },
    {
      y: RABBIT_MAP[5].DEFAULT_Y,
      x: RABBIT_MAP[5].DEFAULT_X,
      state: RABBIT_STATE_MAP.STAND,
      isDie: false,
      isKilled: false,
      dir: RABBIT_DIR_MAP.RIGHT,
      userNo: 0,
      nickname: "",
      job: 0,
    },
    {
      y: RABBIT_MAP[6].DEFAULT_Y,
      x: RABBIT_MAP[6].DEFAULT_X,
      state: RABBIT_STATE_MAP.STAND,
      isDie: false,
      isKilled: false,
      dir: RABBIT_DIR_MAP.LEFT,
      userNo: 0,
      nickname: "",
      job: 0,
    },
    {
      y: RABBIT_MAP[7].DEFAULT_Y,
      x: RABBIT_MAP[7].DEFAULT_X,
      state: RABBIT_STATE_MAP.STAND,
      isDie: false,
      isKilled: false,
      dir: RABBIT_DIR_MAP.LEFT,
      userNo: 0,
      nickname: "",
      job: 0,
    },
  ]);
  const [showTentacle, setShowTentacle] = useState(false);

  const center = {
    y: "3xl:top-[275px] top-[220px]",
    x: "3xl:left-[532px] left-[430px]",
  };

  const onMoveCenter = (no: number) => {
    const newRabbit = rabbit.map((item, index) => {
      if (index === no) {
        item.y = center.y;
        item.x = center.x;
        rabbit[index].state = RABBIT_STATE_MAP.WALK;

        setTimeout(() => {
          setShowTentacle(true);
        }, 2000);

        setTimeout(() => {
          const newRabbit = rabbit.map((user, index) => {
            if (index === no) {
              user.state = RABBIT_STATE_MAP.DIE;
            }
            return user;
          });
          setRabbit(newRabbit);
        }, 2500);

        setTimeout(() => {
          const newRabbit = rabbit.map((user, index) => {
            if (index === no) {
              user.isDie = true;
            }
            return user;
          });
          setRabbit(newRabbit);
          setShowTentacle(false);
        }, 4000);
      }
      return item;
    });
    setRabbit(newRabbit);
  };

  const onMoveReset = (no: number) => {
    const newRabbit = rabbit.map((item, index) => {
      if (index === no) {
        item.y = RABBIT_MAP[no].DEFAULT_Y;
        item.x = RABBIT_MAP[no].DEFAULT_X;
        rabbit[index].state = RABBIT_STATE_MAP.WALK;
        setTimeout(() => {
          rabbit[index].state = RABBIT_STATE_MAP.STAND;
          setRender(!render);
        }, 2000);
      }
      return item;
    });

    setRabbit(newRabbit);
  };

  const isZara = (orderNo: number) => {
    return rabbit[myOrderNo].job === 2 && rabbit[orderNo].job === 2;
  };

  useEffect(() => {
    const newRabbit = rabbit.map((user, index) => {
      user.userNo = userInfo[index].userSeq;
      user.nickname = userInfo[index].nickname;
      user.job = userInfo[index].jobSeq;
      return user;
    });
    setRabbit(newRabbit);
  }, [userInfo]);

  useEffect(() => {
    if (deathByVoteOrderNo === null) {
      return;
    }
    onMoveCenter(deathByVoteOrderNo);
    setDeathByVoteOrderNo(null);
  }, [deathByVoteOrderNo]);

  useEffect(() => {
    if (deathByZaraOrderNo === null) {
      return;
    }

    const newRabbit = rabbit.map((user, index) => {
      if (index === deathByZaraOrderNo) {
        user.isKilled = true;
      }
      return user;
    });
    setRabbit(newRabbit);

    setDeathByZaraOrderNo(null);
  }, [deathByZaraOrderNo]);

  return (
    <div className="absolute 3xl:top-[250px] top-[200px] 3xl:w-[1200px] w-[960px] 3xl:h-[442.5px] h-[354px]">
      <div className="relative w-full h-full">
        <GameVoteKill showTentacle={showTentacle} />
        {rabbit.map((user, index) => (
          <div
            className={`${user.isKilled && "animate-fade-out opacity-0"} ${
              user.isDie && "animate-rabbit-fade-out opacity-0"
            } relative ${user.y} ${user.x} transition-top duration-[2000ms]`}
            key={index}
          >
            <img
              className={`absolute 3xl:w-[150px] w-[120px] 3xl:h-[150px] h-[120px] ${user.dir === 0 && "scale-x-[-1]"}`}
              src={RABBIT_MAP[index].IMG[user.state]}
              onClick={() => onMoveCenter(index)}
            />
            <p
              className={`absolute ${
                isZara(index) ? "text-green-200" : "text-white"
              } font-bold top-[0px] text-center 3xl:w-[150px] w-[120px] drop-shadow-stroke-black-sm`}
              onClick={() => onMoveReset(index)}
            >
              {rabbit[index].nickname}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
