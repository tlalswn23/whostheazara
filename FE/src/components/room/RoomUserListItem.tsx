import userListBox from "../../assets/img/userListBox.png";

interface RoomUserListItemProps {
  item: number;
}

export const RoomUserListItem = ({ item }: RoomUserListItemProps) => {
  const itemBg = [
    "bg-sky-300",
    "bg-yellow-100",
    "bg-pink-200",
    "bg-green-300",
    "bg-fuchsia-400",
    "bg-orange-300",
    "bg-red-300",
    "bg-gray-200",
  ];
  return (
    <>
      <div className="relative w-[280px] h-[160px] mx-[35px] my-[22px]">
        <img src={userListBox} className={`w-full h-full ${itemBg[item]}`} />
        <p className="absolute top-[50px] w-full text-center text-black text-[36px]">강북고릴라들</p>
      </div>
    </>
  );
};
