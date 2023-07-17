import { FirstViewRuleText, SecondViewRuleText } from "../../constants/RuleText";
import upArrow from "../../assets/img/upArrow.png";
import downArrow from "../../assets/img/downArrow.png";
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
    if (slideRef.current) slideRef.current.style.transform = `translateY(-${curViewRuleTextIndex * 80}%)`;
    console.log(curViewRuleTextIndex);
  }, [curViewRuleTextIndex]);

  return (
    <div className=" relative w-full h-full overflow-hidden">
      {curViewRuleTextIndex === minViewRuleTextIndex && (
        <img
          src={downArrow}
          alt=""
          className=" z-10 absolute bottom-4 right-4 cursor-pointer w-[56px] h-[36px] mx-auto mt-6 hover:scale-110 border-2 rounded-lg transition-all duration-500 p-2"
          onClick={slideDown}
        />
      )}
      {curViewRuleTextIndex === maxViewRuleTextIndex && (
        <img
          src={upArrow}
          alt=""
          className=" z-10 absolute -top-4 right-4 cursor-pointer w-[56px] h-[36px] mx-auto mt-6 hover:scale-110 border-2 rounded-lg transition-all duration-500 p-2"
          onClick={slideUp}
        />
      )}
      <div ref={slideRef} className=" duration-500 transition-all">
        <FirstViewRuleText />
        <SecondViewRuleText />
      </div>
    </div>
  );
};
export default RuleContent;
