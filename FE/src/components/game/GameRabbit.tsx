import { useState } from "react";
import { RABBIT_DIR_MAP } from "../../constants/RabbitDirMap";
import { RABBIT_MAP } from "../../constants/RabbitMap";
import { RABBIT_STATE_MAP } from "../../constants/RabbitStateMap";

export const GameRabbit = () => {
  const myRabbitNo = 7;
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
    x: "3xl:left-[432px] left-[350px]",
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

  return (
    <div className="absolute 3xl:top-[250px] top-[200px] 3xl:w-[1200px] w-[960px] 3xl:h-[442.5px] h-[354px] bg-black">
      {RABBIT_MAP.map((item, index) => (
        <div className={`relative ${rabbit[index].y} ${rabbit[index].x} transition-top duration-[2000ms]`} key={index}>
          <img
            className={`absolute 3xl:w-[150px] w-[120px] 3xl:h-[150px] h-[120px] ${
              rabbit[index].dir === 0 && "scale-x-[-1]"
            }`}
            src={item.IMG[rabbit[index].state]}
            onClick={() => onMoveCenter(index)}
          />
          <p
            className={`absolute ${
              rabbit[myRabbitNo].job === 2 && rabbit[index].job === 2 ? "text-red-400" : "text-white"
            } font-bold top-[0px] text-center 3xl:w-[150px] w-[120px] drop-shadow-stroke-black-sm`}
            onClick={() => onMoveReset(index)}
          >
            {rabbit[index].nickname}
          </p>
        </div>
      ))}
    </div>
  );
};
