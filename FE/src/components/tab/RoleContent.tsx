import RoleItem from "./RoleItem";
import { allRoleItemsInfo } from "../../constants/RoleItemsInfo";
import upArrow from "../../assets/img/upArrow.png";
import downArrow from "../../assets/img/downArrow.png";
import { useState, useEffect, useRef } from "react";

const RoleContent = () => {
  const [curViewRoleItemsIndex, setCurViewRoleItemsIndex] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const slideDown = () => {
    setCurViewRoleItemsIndex((prevSlide) => prevSlide + 1);
  };
  const slideUp = () => {
    setCurViewRoleItemsIndex((prevSlide) => prevSlide - 1);
  };
  useEffect(() => {
    if (slideRef.current) slideRef.current.style.transform = `translateY(-${curViewRoleItemsIndex * 80}%)`;
  }, [curViewRoleItemsIndex]);
  const renderViewRoleItems = (index: number) => {
    return allRoleItemsInfo[index].map((roleItemInfo) => (
      <RoleItem
        key={roleItemInfo.name}
        name={roleItemInfo.name}
        desc={roleItemInfo.desc}
        imgPath={roleItemInfo.imgPath}
      />
    ));
  };

  return (
    <div className=" overflow-hidden max-h-full">
      <img
        src={upArrow}
        alt=""
        className=" cursor-pointer w-[66px] h-[36px] mx-auto hover:scale-150 transition-all duration-500"
        onClick={slideUp}
      />
      <div className="flex flex-col gap-2 transition-transform duration-500" ref={slideRef}>
        {renderViewRoleItems(curViewRoleItemsIndex)}
      </div>
      <img
        src={downArrow}
        alt=""
        className=" cursor-pointer w-[66px] h-[36px] mx-auto mt-6 hover:scale-150 transition-all duration-500"
        onClick={slideDown}
      />
    </div>
  );
};
export default RoleContent;
