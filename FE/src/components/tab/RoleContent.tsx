import RoleItem from "./RoleItem";
import { JOB_MAP } from "../../constants/common/JobMap";
import upArrow from "../../assets/img/home/upArrow.png";
import downArrow from "../../assets/img/home/downArrow.png";
import { useState, useEffect, useRef } from "react";

const RoleContent = () => {
  const [curViewRoleItemsIndex, setCurViewRoleItemsIndex] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const minViewRoleItemsIndex = 0;
  const maxViewRoleItemsIndex = 1;
  const slideDown = () => {
    setCurViewRoleItemsIndex((prevSlide) => prevSlide + 1);
  };
  const slideUp = () => {
    setCurViewRoleItemsIndex((prevSlide) => prevSlide - 1);
  };
  useEffect(() => {
    if (slideRef.current) slideRef.current.style.transform = `translateY(-${curViewRoleItemsIndex * 56}%)`;
  }, [curViewRoleItemsIndex]);

  const renderViewRoleItems = () => {
    return JOB_MAP.map((roleItemInfo) => (
      <RoleItem
        key={roleItemInfo.name}
        name={roleItemInfo.name}
        desc={roleItemInfo.info}
        imgPath={roleItemInfo.imgColor}
        color={roleItemInfo.color}
      />
    ));
  };

  return (
    <div className=" relative w-full h-full overflow-hidden">
      {curViewRoleItemsIndex === minViewRoleItemsIndex && (
        <img
          src={downArrow}
          alt=""
          className=" z-10 absolute bottom-4 right-4 cursor-pointer w-[80px] h-[80px] p-[20px] mx-auto mt-6 hover:scale-110 transition-all duration-500 animate-bounce"
          onClick={slideDown}
        />
      )}
      {curViewRoleItemsIndex === maxViewRoleItemsIndex && (
        <img
          src={upArrow}
          alt=""
          className=" z-10 absolute bottom-4 right-4 cursor-pointer w-[80px] h-[80px] p-[20px] mx-auto mt-6 hover:scale-110 transition-all duration-500 animate-bounce-up"
          onClick={slideUp}
        />
      )}
      <div ref={slideRef} className=" duration-500 transition-all">
        {renderViewRoleItems()}
      </div>
    </div>
  );
};
export default RoleContent;
