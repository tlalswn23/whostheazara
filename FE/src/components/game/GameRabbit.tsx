import { useState } from "react";
import { RABBIT_DIR_MAP } from "../../constants/RabbitDirMap";
import { RABBIT_MAP } from "../../constants/RabbitMap";
import { RABBIT_STATE_MAP } from "../../constants/RabbitStateMap";

export const GameRabbit = () => {
  const [render, setRender] = useState(false);
  const [rabbit, setRabbit] = useState([
    {
      y: RABBIT_MAP[0].DEFAULT_Y,
      x: RABBIT_MAP[0].DEFAULT_X,
      state: RABBIT_STATE_MAP.STAND,
      isDie: false,
      dir: RABBIT_DIR_MAP.RIGHT,
      nickname: "Test",
    },
    {
      y: RABBIT_MAP[1].DEFAULT_Y,
      x: RABBIT_MAP[1].DEFAULT_X,
      state: RABBIT_STATE_MAP.STAND,
      isDie: false,
      dir: RABBIT_DIR_MAP.RIGHT,
      nickname: "Test",
    },
    {
      y: RABBIT_MAP[2].DEFAULT_Y,
      x: RABBIT_MAP[2].DEFAULT_X,
      state: RABBIT_STATE_MAP.STAND,
      isDie: false,
      dir: RABBIT_DIR_MAP.RIGHT,
      nickname: "Test",
    },
    {
      y: RABBIT_MAP[3].DEFAULT_Y,
      x: RABBIT_MAP[3].DEFAULT_X,
      state: RABBIT_STATE_MAP.STAND,
      isDie: false,
      dir: RABBIT_DIR_MAP.RIGHT,
      nickname: "Test",
    },
    {
      y: RABBIT_MAP[4].DEFAULT_Y,
      x: RABBIT_MAP[4].DEFAULT_X,
      state: RABBIT_STATE_MAP.STAND,
      isDie: false,
      dir: RABBIT_DIR_MAP.LEFT,
      nickname: "Test",
    },
    {
      y: RABBIT_MAP[5].DEFAULT_Y,
      x: RABBIT_MAP[5].DEFAULT_X,
      state: RABBIT_STATE_MAP.STAND,
      isDie: false,
      dir: RABBIT_DIR_MAP.LEFT,
      nickname: "Test",
    },
    {
      y: RABBIT_MAP[6].DEFAULT_Y,
      x: RABBIT_MAP[6].DEFAULT_X,
      state: RABBIT_STATE_MAP.STAND,
      isDie: false,
      dir: RABBIT_DIR_MAP.LEFT,
      nickname: "Test",
    },
    {
      y: RABBIT_MAP[7].DEFAULT_Y,
      x: RABBIT_MAP[7].DEFAULT_X,
      state: RABBIT_STATE_MAP.STAND,
      isDie: false,
      dir: RABBIT_DIR_MAP.LEFT,
      nickname: "Test",
    },
  ]);
  const center = {
    y: "top-[220px]",
    x: "left-[350px]",
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
    <div className="absolute top-[200px] w-[800px] h-[354px] ">
      {RABBIT_MAP.map((item, index) => (
        <div className={`relative ${rabbit[index].y} ${rabbit[index].x} transition-top duration-[2000ms]`}>
          <img
            className={`absolute w-[120px] h-[120px] ${rabbit[index].dir === 0 && "scale-x-[-1]"}`}
            src={item.IMG[rabbit[index].state]}
            onClick={() => onMoveCenter(index)}
          />
          <p className="absolute text-white top-[0px] text-center w-[120px]" onClick={() => onMoveReset(index)}>
            {rabbit[index].nickname}
          </p>
        </div>
      ))}
    </div>
  );
};
