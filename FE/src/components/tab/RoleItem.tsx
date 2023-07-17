interface RoleItemProps {
  name: string;
  desc: string;
  imgPath: string;
}
const RoleItem = ({ name, desc, imgPath }: RoleItemProps) => {
  return (
    <div className="flex items-center  gap-6">
      <img src={imgPath} className="w-20 h-20" />
      <div className="text-3xl">{name}</div>
      <div> - </div>
      <div className="text-3xl">{desc}</div>
    </div>
  );
};
export default RoleItem;
