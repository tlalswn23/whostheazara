interface RoleItemProps {
  name: string;
  desc: string;
  imgPath: string;
  color: string;
}
const RoleItem = ({ name, desc, imgPath, color }: RoleItemProps) => {
  console.log(color);
  return (
    <div className="flex items-center mb-[32px]">
      <img src={imgPath} className="w-20 h-20" />
      <p className={`mx-[40px] w-[100px] text-center text-3xl font-bold ${color}`}>{name}</p>
      <p className="text-2xl">{desc}</p>
    </div>
  );
};
export default RoleItem;
