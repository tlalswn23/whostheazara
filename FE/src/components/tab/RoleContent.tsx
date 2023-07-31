import RoleItem from "./RoleItem";
import { JOB_MAP } from "../../constants/JobMap";
import upArrow from "../../assets/img/upArrow.png";
import downArrow from "../../assets/img/downArrow.png";
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
    if (slideRef.current) slideRef.current.style.transform = `translateY(-${curViewRoleItemsIndex * 80}%)`;
  }, [curViewRoleItemsIndex]);

  const renderViewRoleItems = (index: number) => {
    return JOB_MAP.map((roleItemInfo) => (
      <RoleItem key={roleItemInfo.name} name={roleItemInfo.name} desc={roleItemInfo.info} imgPath={roleItemInfo.img} />
    ));
  };

  return (
    <div className=" relative w-full h-full overflow-hidden">
      {curViewRoleItemsIndex === minViewRoleItemsIndex && (
        <img
          src={downArrow}
          alt=""
          className=" z-10 absolute bottom-4 right-4 cursor-pointer w-[56px] h-[36px] mx-auto mt-6 hover:scale-110 border-2 rounded-lg transition-all duration-500 p-2"
          onClick={slideDown}
        />
      )}
      {curViewRoleItemsIndex === maxViewRoleItemsIndex && (
        <img
          src={upArrow}
          alt=""
          className=" z-10 absolute bottom-4 right-4 cursor-pointer w-[56px] h-[36px] mx-auto mt-6 hover:scale-110 border-2 rounded-lg transition-all duration-500 p-2"
          onClick={slideUp}
        />
      )}
      <div ref={slideRef} className=" duration-500 transition-all">
        <div className=" flex flex-col gap-4">{renderViewRoleItems(0)}</div>
        <div className=" flex flex-col gap-4 mt-[800px]">{renderViewRoleItems(1)}</div>
      </div>
    </div>
  );
};
export default RoleContent;
