import { useState, useEffect } from "react";
import { RABBIT_DIR_MAP } from "../../constants/game/RabbitDirMap";
import { RABBIT_MAP } from "../../constants/common/RabbitMap";
import { RABBIT_STATE_MAP } from "../../constants/game/RabbitStateMap";

export const GameRabbit = () => {
  const myOrderNo = 1;
  const [render, setRender] = useState(false);
  const [rabbit, setRabbit] = useState([
    {
      y: RABBIT_MAP[0].DEFAULT_Y,
      x: RABBIT_MAP[0].DEFAULT_X,
      state: RABBIT_STATE_MAP.STAND,
      isDie: false,
      dir: RABBIT_DIR_MAP.RIGHT,
      userNo: 1,
      nickname: "Test",
      job: 1,
    },
    {
      y: RABBIT_MAP[1].DEFAULT_Y,
      x: RABBIT_MAP[1].DEFAULT_X,
      state: RABBIT_STATE_MAP.STAND,
      isDie: false,
      dir: RABBIT_DIR_MAP.RIGHT,
      userNo: 2,
      nickname: "Test",
      job: 2,
    },
    {
      y: RABBIT_MAP[2].DEFAULT_Y,
      x: RABBIT_MAP[2].DEFAULT_X,
      state: RABBIT_STATE_MAP.STAND,
      isDie: false,
      dir: RABBIT_DIR_MAP.RIGHT,
      userNo: 3,
      nickname: "Test",
      job: 3,
    },
    {
      y: RABBIT_MAP[3].DEFAULT_Y,
      x: RABBIT_MAP[3].DEFAULT_X,
      state: RABBIT_STATE_MAP.STAND,
      isDie: false,
      dir: RABBIT_DIR_MAP.RIGHT,
      userNo: 4,
      nickname: "Test",
      job: 4,
    },
    {
      y: RABBIT_MAP[4].DEFAULT_Y,
      x: RABBIT_MAP[4].DEFAULT_X,
      state: RABBIT_STATE_MAP.STAND,
      isDie: false,
      dir: RABBIT_DIR_MAP.LEFT,
      userNo: 5,
      nickname: "Test",
      job: 5,
    },
    {
      y: RABBIT_MAP[5].DEFAULT_Y,
      x: RABBIT_MAP[5].DEFAULT_X,
      state: RABBIT_STATE_MAP.STAND,
      isDie: false,
      dir: RABBIT_DIR_MAP.LEFT,
      userNo: 6,
      nickname: "Test",
      job: 6,
    },
    {
      y: RABBIT_MAP[6].DEFAULT_Y,
      x: RABBIT_MAP[6].DEFAULT_X,
      state: RABBIT_STATE_MAP.STAND,
      isDie: false,
      dir: RABBIT_DIR_MAP.LEFT,
      userNo: 7,
      nickname: "Test",
      job: 7,
    },
    {
      y: RABBIT_MAP[7].DEFAULT_Y,
      x: RABBIT_MAP[7].DEFAULT_X,
      state: RABBIT_STATE_MAP.STAND,
      isDie: false,
      dir: RABBIT_DIR_MAP.LEFT,
      userNo: 8,
      nickname: "Test",
      job: 2,
    },
  ]);
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
          rabbit[index].state = RABBIT_STATE_MAP.STAND;
          setRender(!render);
        }, 2000);
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

  const [nextLoc, setNextLoc] = useState(["", ""]);
  const test = (e) => {
    let y = "";
    let x = "";
    y = e.nativeEvent.offsetY;
    x = e.nativeEvent.offsetX;
    if (e.target.clientWidth > 1000) {
      // 1920
      // loc += `3xl:top-[${e.nativeEvent.offsetY}px] top-[${e.nativeEvent.offsetY / 1.25}px] `;
      // loc += `3xl:left-[${e.nativeEvent.offsetX}px] left-[${e.nativeEvent.offsetX / 1.25}px]`;
      // y = `@media (max-width: 1000px) {
      //     top: "${e.nativeEvent.offsetY}px"
      //   } top: "[${e.nativeEvent.offsetY / 1.25}px]"`;
      // x = `@media (max-width: 1000px) {
      //   left: "${e.nativeEvent.offsetX}px"
      //   left: "[${e.nativeEvent.offsetX / 1.25}px]"`;
    } else {
      // 1560
      // loc += `3xl:top-[${e.nativeEvent.offsetY * 1.25}px] top-[${e.nativeEvent.offsetY}px] `;
      // loc += `3xl:left -[${e.nativeEvent.offsetX * 1.25}px] left -[${e.nativeEvent.offsetX}px]`;
      // y = `@media (max-width: 1000px) {
      //   top: "${e.nativeEvent.offsetY * 1.25}px"
      // } top: "[${e.nativeEvent.offsetY}px]"`;
      // x = `@media (max-width: 1000px) {
      // left: "${e.nativeEvent.offsetX * 1.25}px"
      // left: "[${e.nativeEvent.offsetX}px]"`;
    }
  };

  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    if (width > 1880) {
    }
  }, [width]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      // cleanup
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const move = (orderNo: number) => {
    if (orderNo === myOrderNo) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div
      className="absolute 3xl:top-[250px] top-[200px] 3xl:w-[1200px] w-[960px] 3xl:h-[442.5px] h-[354px] bg-red-100"
      onClick={(e) => test(e)}
    >
      {RABBIT_MAP.map((userInfo, orderNo) => (
        <div
          className={`relative ${
            move(orderNo) ? nextLoc : rabbit[orderNo].y + " " + rabbit[orderNo].x
          } transition-top duration-[2000ms]`}
          key={orderNo}
          style={{ top: `${nextLoc[0]}px`, left: `${nextLoc[1]}px` }}
        >
          <img
            className={`absolute 3xl:w-[150px] w-[120px] 3xl:h-[150px] h-[120px] ${
              rabbit[orderNo].dir === 0 && "scale-x-[-1]"
            }`}
            src={userInfo.IMG[rabbit[orderNo].state]}
            onClick={() => onMoveCenter(orderNo)}
          />
          <p
            className={`absolute ${
              isZara(orderNo) ? "text-red-400" : "text-white"
            } font-bold top-[0px] text-center 3xl:w-[150px] w-[120px] drop-shadow-stroke-black-sm`}
            onClick={() => onMoveReset(orderNo)}
          >
            {rabbit[orderNo].nickname}
          </p>
        </div>
      ))}
    </div>
  );
};
