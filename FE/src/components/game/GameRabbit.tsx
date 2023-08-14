import { useEffect, useState } from "react";
import { RABBIT_DIR_MAP } from "../../constants/game/RabbitDirMap";
import { RABBIT_MAP } from "../../constants/common/RabbitMap";
import { RABBIT_STATE_MAP } from "../../constants/game/RabbitStateMap";
import GameVoteKill from "./GameVoteKill";
import { SFX, playSFX } from "../../utils/audioManager";
import { useWebSocket } from "../../context/socketContext";
import { useParams } from "react-router-dom";
import { SubCharLoc } from "../../types/StompGameSubType";
interface GameRabbitProps {
  userInfo: {
    userSeq: number;
    jobSeq: number;
    nickname: string;
    equippedItems: {
      cap: string;
      clothing: string;
      face: string;
    };
  }[];
  myOrderNo: number;
  deathByVoteOrderNo: number | null;
  deathByZaraOrderNo: number | null;
  nowTime: string;
  locData: SubCharLoc | null;
}

export const GameRabbit = ({
  userInfo,
  myOrderNo,
  deathByVoteOrderNo,
  deathByZaraOrderNo,
  nowTime,
  locData,
}: GameRabbitProps) => {
  const { client } = useWebSocket();
  const { gameCode } = useParams();
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
      equippedItems: {
        cap: "",
        clothing: "",
        face: "",
      },
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
      equippedItems: {
        cap: "",
        clothing: "",
        face: "",
      },
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
      equippedItems: {
        cap: "",
        clothing: "",
        face: "",
      },
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
      equippedItems: {
        cap: "",
        clothing: "",
        face: "",
      },
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
      equippedItems: {
        cap: "",
        clothing: "",
        face: "",
      },
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
      equippedItems: {
        cap: "",
        clothing: "",
        face: "",
      },
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
      equippedItems: {
        cap: "",
        clothing: "",
        face: "",
      },
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
      equippedItems: {
        cap: "",
        clothing: "",
        face: "",
      },
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
        if (item.x1 < RABBIT_MAP[index].DEFAULT_X1) {
          item.dir = RABBIT_DIR_MAP.RIGHT;
        } else {
          item.dir = RABBIT_DIR_MAP.LEFT;
        }
        item.y1 = center.y1 + 80;
        item.x1 = center.x1 + 64;
        item.y2 = center.y2 + 60;
        item.x2 = center.x2 + 51.2;
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
        if (item.x1 < RABBIT_MAP[index].DEFAULT_X1) {
          item.dir = RABBIT_DIR_MAP.RIGHT;
        } else {
          item.dir = RABBIT_DIR_MAP.LEFT;
        }
        item.y1 = RABBIT_MAP[index].DEFAULT_Y1 + 80;
        item.y2 = RABBIT_MAP[index].DEFAULT_Y2 + 60;
        item.x1 = RABBIT_MAP[index].DEFAULT_X1 + 64;
        item.x2 = RABBIT_MAP[index].DEFAULT_X2 + 51.2;
        rabbit[index].state = RABBIT_STATE_MAP.WALK;
        setTimeout(() => {
          rabbit[index].state = RABBIT_STATE_MAP.STAND;
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

      //FIXME: 임시로 적용
      user.equippedItems = {
        cap: "",
        clothing: "",
        face: "",
      };
      // user.equippedItems = userInfo[index].equippedItems;

      return user;
    });
    console.log("newRabbit", newRabbit);
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
        top: rabbit[index].y1 - 80,
        left: rabbit[index].x1 - 64,
      };
      return style;
    } else {
      const style = {
        top: rabbit[index].y2 - 60,
        left: rabbit[index].x2 - 51.2,
      };
      return style;
    }
  };

  useEffect(() => {
    if (nowTime === "VOTE") {
      for (let i = 0; i < 8; ++i) {
        onMoveReset(i);
      }
    }
  }, [nowTime]);

  useEffect(() => {
    if (locData === null) {
      return;
    }
    changeLocRabbit(locData, true);
  }, [locData]);
  interface changeLocRabbitProps {
    data: {
      orderNumber: number;
      xaxis1: number;
      yaxis1: number;
      xaxis2: number;
      yaxis2: number;
    };
  }

  const changeLocRabbit = ({ data }: changeLocRabbitProps, receive: boolean) => {
    if (receive && data.orderNumber === myOrderNo) {
      return;
    }
    const newRabbit = rabbit.map((user, index) => {
      if (data.orderNumber === index) {
        if (user.x1 < data.xaxis1 - 70) {
          user.dir = RABBIT_DIR_MAP.RIGHT;
        } else {
          user.dir = RABBIT_DIR_MAP.LEFT;
        }
        user.y1 = data.yaxis1;
        user.y2 = data.yaxis2;
        user.x1 = data.xaxis1;
        user.x2 = data.xaxis2;
        user.state = RABBIT_STATE_MAP.WALK;
        setTimeout(() => {
          user.state = RABBIT_STATE_MAP.STAND;
        }, 2000);
      }
      return user;
    });
    setRabbit(newRabbit);
    if (!receive) {
      pubGameLoc(gameCode!);
    }
  };

  const pubGameLoc = (gameCode: string) => {
    client?.publish({
      destination: `/pub/game/${gameCode}/loc`,
      body: JSON.stringify({
        orderNumber: myOrderNo,
        xaxis1: rabbit[myOrderNo].x1,
        yaxis1: rabbit[myOrderNo].y1,
        xaxis2: rabbit[myOrderNo].x2,
        yaxis2: rabbit[myOrderNo].y2,
      }),
    });
  };

  const onMoveRabbit = (e: React.MouseEvent) => {
    if (nowTime !== "DAY") {
      return;
    }

    let y = e.nativeEvent.offsetY;
    let x = e.nativeEvent.offsetX;
    if (y < 80) {
      y = 80;
    } else if (y > 400) {
      y = 400;
    }
    if (x < 25) {
      x = 25;
    } else if (x > 1150) {
      x = 1150;
    }

    if (viewportWidth >= 1880) {
      const loc = {
        data: {
          orderNumber: myOrderNo,
          yaxis1: y,
          yaxis2: y / 1.25,
          xaxis1: x,
          xaxis2: x / 1.25,
        },
      };
      changeLocRabbit(loc, false);
    } else {
      const loc = {
        data: {
          orderNumber: myOrderNo,
          yaxis1: y * 1.25,
          yaxis2: y,
          xaxis1: x * 1.25,
          xaxis2: x,
        },
      };
      changeLocRabbit(loc, false);
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
            <img
              className={`absolute 3xl:w-[150px] w-[120px] 3xl:h-[150px] h-[120px] "scale-x-[-1]"}`}
              src={`data:image/png;base64,${user.equippedItems.clothing}`}
            />
            <img
              className={`absolute 3xl:w-[150px] w-[120px] 3xl:h-[150px] h-[120px] "scale-x-[-1]"}`}
              src={`data:image/png;base64,${user.equippedItems.face}`}
            />
            <img
              className={`absolute 3xl:w-[150px] w-[120px] 3xl:h-[150px] h-[120px] "scale-x-[-1]"}`}
              src={`data:image/png;base64,${user.equippedItems.cap}`}
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
