import StoryImg from "../../assets/img/home/StoryImg.png";
import { useRef, useState, useEffect } from "react";
import { SFX, playSFX } from "../../utils/audioManager";
import upArrow from "../../assets/img/home/upArrow.png";
import downArrow from "../../assets/img/home/downArrow.png";

const StoryContent = () => {
  const [curViewRoleItemsIndex, setCurViewRoleItemsIndex] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const minViewRoleItemsIndex = 0;
  const maxViewRoleItemsIndex = 2;
  const slideDown = () => {
    if (curViewRoleItemsIndex === maxViewRoleItemsIndex) {
      return;
    }
    playSFX(SFX.SWAP);
    setCurViewRoleItemsIndex((prevSlide) => prevSlide + 1);
  };
  const slideUp = () => {
    if (curViewRoleItemsIndex === minViewRoleItemsIndex) {
      return;
    }
    playSFX(SFX.SWAP);
    setCurViewRoleItemsIndex((prevSlide) => prevSlide - 1);
  };
  useEffect(() => {
    if (slideRef.current) slideRef.current.style.transform = `translateY(-${curViewRoleItemsIndex * 33}%)`;
  }, [curViewRoleItemsIndex]);
  return (
    <>
      <img
        src={downArrow}
        alt="down arrow"
        className={`z-10 absolute 3xl:bottom-[-40px] bottom-[-32px] 3xl:right-[16px] right-[12.8px]  3xl:w-[80px] w-[64px] 3xl:h-[80px] h-[64px] 3xl:p-[20px] p-[16px] mx-auto 3xl:mt-[24px] mt-[19.2px] hover:scale-110 transition-all duration-500 ${
          curViewRoleItemsIndex === maxViewRoleItemsIndex && "opacity-0"
        } `}
        onClick={slideDown}
      />
      <img
        src={upArrow}
        alt="up arrow"
        className={`z-10 absolute 3xl:bottom-[30px] bottom-[24px] 3xl:right-[16px] right-[12.8px]  3xl:w-[80px] w-[64px] 3xl:h-[80px] h-[64px] 3xl:p-[20px] p-[16px] mx-auto 3xl:mt-[24px] mt-[19.2px] hover:scale-110 transition-all duration-500 ${
          curViewRoleItemsIndex === minViewRoleItemsIndex && "opacity-0"
        }`}
        onClick={slideUp}
      />
      <div
        className="text-center 3xl:text-[28px] text-[22.4px] 3xl:leading-[60px] leading-[48px] duration-500 transition-all"
        ref={slideRef}
      >
        <div className="3xl:h-[500px] h-[400px] 3xl:mt-[10px] mt-[8px]">
          <p>1. 어느 날, 바다의 용왕은 이유모를 큰 병에 걸린다.</p>
          <p>용왕에게는 소문난 충신 자라가 있었는데,</p>
          <p>자라는 용왕을 위해 명약이라 소문난 토끼의 간을 찾아나선다.</p>
          <img className="m-auto 3xl:h-[220px] h-[176px] 3xl:mt-[10px] mt-[8px]" src={StoryImg} />
        </div>
        <div className="3xl:h-[500px] h-[400px]">
          <p>2. 한 달에 한 번 토끼들이 배를 타고 이동하는 날,</p>
          <p>자라는 토끼들이 시력이 나쁜 점을 이용하여 변장 후 잠입한다!</p>
          <img className="m-auto 3xl:h-[220px] h-[176px] 3xl:mt-[10px] mt-[8px]" src={StoryImg} />
        </div>
        <div className="3xl:h-[500px] h-[400px]">
          <p>3. 자라가 배에 숨어들었다는 소식을 듣게 된 토끼들,</p>
          <p>그들은 과연 숨은 자라를 찾아내고 무사히 배에서 내릴 수 있을까?</p>
          <img className="m-auto 3xl:h-[220px] h-[176px] 3xl:mt-[10px] mt-[8px]" src={StoryImg} />
        </div>
      </div>
    </>
  );
};

export default StoryContent;
