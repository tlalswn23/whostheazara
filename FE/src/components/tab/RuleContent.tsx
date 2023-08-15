import upArrow from "../../assets/img/home/upArrow.png";
import downArrow from "../../assets/img/home/downArrow.png";
import { useState, useEffect, useRef } from "react";
import { SFX, playSFX } from "../../utils/audioManager";

const RuleContent = () => {
  const [curViewRuleTextIndex, setCurViewRuleTextIndex] = useState(0);
  const slideRef = useRef<HTMLImageElement>(null);
  const minViewRuleTextIndex = 0;
  const maxViewRuleTextIndex = 1;
  const slideDown = () => {
    playSFX(SFX.SWAP);
    setCurViewRuleTextIndex((prevSlide) => prevSlide + 1);
  };
  const slideUp = () => {
    playSFX(SFX.SWAP);
    setCurViewRuleTextIndex((prevSlide) => prevSlide - 1);
  };
  useEffect(() => {
    if (slideRef.current) slideRef.current.style.transform = `translateY(-${curViewRuleTextIndex * 58}%)`;
  }, [curViewRuleTextIndex]);

  return (
    <div className=" relative w-full h-full overflow-hidden">
      {curViewRuleTextIndex === minViewRuleTextIndex && (
        <img
          src={downArrow}
          alt="down arrow"
          className="z-10 absolute 3xl:bottom-[16px] bottom-[12.8px] 3xl:right-[16px] right-[12.8px]  3xl:w-[80px] w-[64px] 3xl:h-[80px] h-[64px] 3xl:p-[20px] p-[16px] mx-auto 3xl:mt-[24px] mt-[19.2px] hover:scale-110 transition-all duration-500 animate-bounce"
          onClick={slideDown}
        />
      )}
      {curViewRuleTextIndex === maxViewRuleTextIndex && (
        <img
          src={upArrow}
          alt="up arrow"
          className="z-10 absolute 3xl:bottom-[16px] bottom-[12.8px] 3xl:right-[16px] right-[12.8px]  3xl:w-[80px] w-[64px] 3xl:h-[80px] h-[64px] 3xl:p-[20px] p-[16px] mx-auto 3xl:mt-[24px] mt-[19.2px] hover:scale-110 transition-all duration-500 animate-bounce-up"
          onClick={slideUp}
        />
      )}
      <div ref={slideRef} className="3xl:leading-[46px] leading-[36.8px] duration-500 transition-all">
        <div className="">
          <p className="text-yellow-100">낮과 밤 (제한시간 : 낮 3분, 밤 30초)</p>
          <li>게임은 ‘낮’부터 시작됩니다.</li>
          <li>‘낮’에는 생존한 모든 토끼들 간의 대화가 가능합니다.</li>
          <li>‘밤’이 되면, 자라들만 서로 대화가 가능합니다.</li>
          <br />
          <p className="text-red-200">투표</p>
          <li>낮이 끝나면 투표를 하여 처형할 토끼를 결정합니다.</li>
          <li>가장 많은 표를 받은 토끼는 최후의 변론을 할 수 있습니다.</li>
          <li>변론 이후에 찬반 투표를 통해 처형 여부를 결정합니다.</li>
          <br />
        </div>
        <div className="">
          <p className="text-blue-200">승리 조건</p>
          <li>자라들의 수가 토끼들의 수와 같거나 많으면 자라들이 승리합니다.</li>
          <li>자라들이 모두 처형당하면 토끼들이 승리합니다.</li>
          <br />
          <p className="text-green-200">기능</p>
          <li>능력 사용 탭에서 역할이 가진 능력을 사용할 수 있습니다.</li>
          <li>‘낮’에 버튼을 눌러 남은 시간을 증가시키거나 감소시킬 수 있습니다.</li>
        </div>
      </div>
    </div>
  );
};
export default RuleContent;
