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
      <div className="relative 3xl:w-[280px] w-[224px] 3xl:h-[160px] h-[128px] 3xl:mx-[35px] mx-[28px] 3xl:my-[22px] my-[17.6px]">
        <img src={userListBox} className={`w-full h-full ${itemBg[item]}`} />
        <p className="absolute 3xl:top-[60px] top-[48px] w-full text-center text-black 3xl:text-[26px] text-[20px]">
          강북고릴라들
        </p>
      </div>
    </>
  );
};
