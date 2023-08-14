import { useEffect, useState } from "react";
import { RABBIT_DIR_MAP } from "../../constants/game/RabbitDirMap";
import { RABBIT_MAP } from "../../constants/common/RabbitMap";
import { RABBIT_STATE_MAP } from "../../constants/game/RabbitStateMap";
import GameVoteKill from "./GameVoteKill";
import { SFX, playSFX } from "../../utils/audioManager";
interface GameRabbitProps {
  userInfo: {
    userSeq: number;
    jobSeq: number;
    nickname: string;
  }[];
  myOrderNo: number;
  deathByVoteOrderNo: number | null;
  deathByZaraOrderNo: number | null;
  nowTime: string;
}

export const GameRabbit = ({
  userInfo,
  myOrderNo,
  deathByVoteOrderNo,
  deathByZaraOrderNo,
  nowTime,
}: GameRabbitProps) => {
  const [render, setRender] = useState(false);
  const [rabbit, setRabbit] = useState([
    {
      y1: RABBIT_MAP[0].DEFAULT_Y1,
      y2: RABBIT_MAP[0].DEFAULT_Y2,
      x1: RABBIT_MAP[0].DEFAULT_X1,
      x2: RABBIT_MAP[0].DEFAULT_X2,
      state: RABBIT_STATE_MAP.STAND,
      isDie: false,
      isKilled: false,
      dir: RABBIT_DIR_MAP.RIGHT,
      userNo: 0,
      nickname: "",
      job: 0,
    },
    {
      y1: RABBIT_MAP[1].DEFAULT_Y1,
      y2: RABBIT_MAP[1].DEFAULT_Y2,
      x1: RABBIT_MAP[1].DEFAULT_X1,
      x2: RABBIT_MAP[1].DEFAULT_X2,
      state: RABBIT_STATE_MAP.STAND,
      isDie: false,
      isKilled: false,
      dir: RABBIT_DIR_MAP.RIGHT,
      userNo: 0,
      nickname: "",
      job: 0,
    },
    {
      y1: RABBIT_MAP[2].DEFAULT_Y1,
      y2: RABBIT_MAP[2].DEFAULT_Y2,
      x1: RABBIT_MAP[2].DEFAULT_X1,
      x2: RABBIT_MAP[2].DEFAULT_X2,
      state: RABBIT_STATE_MAP.STAND,
      isDie: false,
      isKilled: false,
      dir: RABBIT_DIR_MAP.LEFT,
      userNo: 0,
      nickname: "",
      job: 0,
    },
    {
      y1: RABBIT_MAP[3].DEFAULT_Y1,
      y2: RABBIT_MAP[3].DEFAULT_Y2,
      x1: RABBIT_MAP[3].DEFAULT_X1,
      x2: RABBIT_MAP[3].DEFAULT_X2,
      state: RABBIT_STATE_MAP.STAND,
      isDie: false,
      isKilled: false,
      dir: RABBIT_DIR_MAP.LEFT,
      userNo: 0,
      nickname: "",
      job: 0,
    },
    {
      y1: RABBIT_MAP[4].DEFAULT_Y1,
      y2: RABBIT_MAP[4].DEFAULT_Y2,
      x1: RABBIT_MAP[4].DEFAULT_X1,
      x2: RABBIT_MAP[4].DEFAULT_X2,
      state: RABBIT_STATE_MAP.STAND,
      isDie: false,
      isKilled: false,
      dir: RABBIT_DIR_MAP.RIGHT,
      userNo: 0,
      nickname: "",
      job: 0,
    },
    {
      y1: RABBIT_MAP[5].DEFAULT_Y1,
      y2: RABBIT_MAP[5].DEFAULT_Y2,
      x1: RABBIT_MAP[5].DEFAULT_X1,
      x2: RABBIT_MAP[5].DEFAULT_X2,
      state: RABBIT_STATE_MAP.STAND,
      isDie: false,
      isKilled: false,
      dir: RABBIT_DIR_MAP.RIGHT,
      userNo: 0,
      nickname: "",
      job: 0,
    },
    {
      y1: RABBIT_MAP[6].DEFAULT_Y1,
      y2: RABBIT_MAP[6].DEFAULT_Y2,
      x1: RABBIT_MAP[6].DEFAULT_X1,
      x2: RABBIT_MAP[6].DEFAULT_X2,
      state: RABBIT_STATE_MAP.STAND,
      isDie: false,
      isKilled: false,
      dir: RABBIT_DIR_MAP.LEFT,
      userNo: 0,
      nickname: "",
      job: 0,
    },
    {
      y1: RABBIT_MAP[7].DEFAULT_Y1,
      y2: RABBIT_MAP[7].DEFAULT_Y2,
      x1: RABBIT_MAP[7].DEFAULT_X1,
      x2: RABBIT_MAP[7].DEFAULT_X2,
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
    // y: "3xl:top-[275px] top-[220px]",
    // x: "3xl:left-[532px] left-[430px]",
    y1: 275,
    y2: 220,
    x1: 532,
    x2: 430,
  };

  const onMoveCenter = (no: number) => {
    const newRabbit = rabbit.map((item, index) => {
      if (index === no) {
        // item.y = center.y;
        // item.x = center.x;
        rabbit[index].state = RABBIT_STATE_MAP.WALK;

        setTimeout(() => {
          playSFX(SFX.SLAP);
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
        // item.y = RABBIT_MAP[no].DEFAULT_Y;
        // item.x = RABBIT_MAP[no].DEFAULT_X;
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
      if (userInfo[index].userSeq === 0) {
        user.isKilled = true;
        return user;
      }
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
  }, [deathByZaraOrderNo]);

  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    // 뷰포트 너비 변경시 호출되는 이벤트 핸들러
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    // 윈도우 리사이즈 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const rabbitStyle = (index: number) => {
    if (viewportWidth >= 1880) {
      const style = {
        top: rabbit[index].y1,
        left: rabbit[index].x1,
      };
      return style;
    } else {
      const style = {
        top: rabbit[index].y2,
        left: rabbit[index].x2,
      };
      return style;
    }
  };

  interface changeLocRabbitProps {
    data: {
      orderNumber: number;
      xAxis1: number;
      yAxis1: number;
      xAxis2: number;
      yAxis2: number;
    };
  }

  const changeLocRabbit = ({ data }: changeLocRabbitProps) => {
    const newRabbit = rabbit.map((user, index) => {
      if (data.orderNumber === index) {
        user.y1 = data.yAxis1 - 80;
        user.y2 = data.yAxis2 - 64;
        user.x1 = data.xAxis1 - 70;
        user.x2 = data.xAxis2 - 56;
      }
      return user;
    });

    setRabbit(newRabbit);
  };

  const onMoveRabbit = (e: React.MouseEvent) => {
    const y = e.nativeEvent.offsetY;
    const x = e.nativeEvent.offsetX;
    console.log(y, x);
    if (viewportWidth >= 1880) {
      const loc = {
        data: {
          orderNumber: myOrderNo,
          yAxis1: y,
          yAxis2: y / 1.25,
          xAxis1: x,
          xAxis2: x / 1.25,
        },
      };
      changeLocRabbit(loc);
    } else {
      const loc = {
        data: {
          orderNumber: myOrderNo,
          yAxis1: y * 1.25,
          yAxis2: y,
          xAxis1: x * 1.25,
          xAxis2: x,
        },
      };
      changeLocRabbit(loc);
    }
  };

  return (
    <div
      className="absolute 3xl:top-[250px] top-[200px] 3xl:w-[1200px] w-[960px] 3xl:h-[442.5px] h-[354px]"
      onClick={(e) => onMoveRabbit(e)}
    >
      <div className="relative w-full h-full">
        <GameVoteKill showTentacle={showTentacle} />
        {rabbit.map((user, index) => (
          <div
            className={`${user.isKilled && "animate-fade-out opacity-0"} ${
              user.isDie && "animate-rabbit-fade-out opacity-0"
            } relative transition-all duration-[2000ms] ${
              (nowTime === "NIGHT" || nowTime === "NIGHT_RESULT") && "brightness-50"
            }`}
            key={index}
            style={rabbitStyle(index)}
          >
            <img
              className={`absolute 3xl:w-[150px] w-[120px] 3xl:h-[150px] h-[120px] ${user.dir === 0 && "scale-x-[-1]"}`}
              src={RABBIT_MAP[index].IMG[user.state]}
            />
            <p
              className={`absolute ${
                isZara(index) ? "text-green-200" : "text-white"
              } font-bold top-[0px] text-center 3xl:w-[150px] w-[120px] drop-shadow-stroke-black-sm`}
            >
              {rabbit[index].nickname}
            </p>
          </div>
        ))}
      </div>
      <div className="absolute w-full h-full top-[0px] left-[0px] bg-transparent"></div>
    </div>
  );
};
