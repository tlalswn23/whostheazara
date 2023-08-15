interface RoleItemProps {
  name: string;
  desc: string;
  imgPath: string;
  color: string;
}
const RoleItem = ({ name, desc, imgPath, color }: RoleItemProps) => {
  return (
    <div className="flex items-center 3xl:mb-[32px] mb-[25.6px]">
      <img src={imgPath} className="3xl:w-[80px] w-[64px] 3xl:h-[80px] h-[64px]" />
      <p
        className={`3xl:mx-[40px] mx-[32px] 3xl:w-[120px] w-[80px] text-center 3xl:text-[28px] text-[22.4px] font-bold ${color}`}
      >
        {name}
      </p>
      <p className="3xl:text-[24px] text-[19.2px]">{desc}</p>
    </div>
  );
};
export default RoleItem;
