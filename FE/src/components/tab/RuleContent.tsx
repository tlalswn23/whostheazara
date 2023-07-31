import upArrow from "../../assets/img/home/downArrow.png";
import downArrow from "../../assets/img/home/downArrow.png";
import { useState, useEffect, useRef } from "react";

const RuleContent = () => {
  const [curViewRuleTextIndex, setCurViewRuleTextIndex] = useState(0);
  const slideRef = useRef<HTMLImageElement>(null);
  const minViewRuleTextIndex = 0;
  const maxViewRuleTextIndex = 1;
  const slideDown = () => {
    setCurViewRuleTextIndex((prevSlide) => prevSlide + 1);
  };
  const slideUp = () => {
    setCurViewRuleTextIndex((prevSlide) => prevSlide - 1);
  };
  useEffect(() => {
    if (slideRef.current) slideRef.current.style.transform = `translateY(-${curViewRuleTextIndex * 50}%)`;
  }, [curViewRuleTextIndex]);

  return (
    <div className=" relative w-full h-full overflow-hidden">
      {curViewRuleTextIndex === minViewRuleTextIndex && (
        <img
          src={downArrow}
          alt="down arrow"
          className=" z-10 absolute bottom-4 right-4 cursor-pointer w-[56px] h-[56px] mx-auto mt-6 hover:scale-110 transition-all duration-500 p-2 animate-bounce"
          onClick={slideDown}
        />
      )}
      {curViewRuleTextIndex === maxViewRuleTextIndex && (
        <img
          src={upArrow}
          alt="up arrow"
          className=" z-10 absolute bottom-4 right-4 cursor-pointer w-[56px] h-[56px] mx-auto mt-6 hover:scale-110 transition-all duration-500 p-2 animate-bounce"
          onClick={slideUp}
        />
      )}
      <div ref={slideRef} className="duration-500 transition-all leading-[46px]">
        <div className="mb-12 ">
          <p>낮과 밤 (제한시간 : 낮 3분, 밤 30초)</p>
          <li>게임은 ‘낮’부터 시작됩니다.</li>
          <li>‘낮’에는 생존한 모든 토끼들 간의 대화가 가능합니다.</li>
          <li>‘밤’이 되면, 거북이들만 서로 대화가 가능합니다.</li>
          <br />
          <p>투표</p>
          <li>낮이 끝나면 투표를 하여 처형할 토끼를 결정합니다.</li>
          <li>가장 많은 표를 받은 토끼는 최후의 변론을 할 수 있습니다.</li>
          <li>변론 이후에 찬반 투표를 통해 처형 여부를 결정합니다.</li>
          <br />
        </div>
        <div className="relative -top-20">
          <p>승리 조건</p>
          <li>거북이들의 수가 토끼들의 수와 같거나 많으면 거북이들이 승리합니다.</li>
          <li>거북이들이 모두 처형당하면 토끼들이 승리합니다.</li>
          <br />
          <p>기능</p>
          <li>능력 사용 탭에서 역할이 가진 능력을 사용할 수 있습니다.</li>
          <li>‘낮’에 버튼을 눌러 남은 시간을 증가시키거나 감소시킬 수 있습니다.</li>
        </div>
      </div>
    </div>
  );
};
export default RuleContent;
