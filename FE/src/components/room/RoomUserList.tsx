import { RoomUserListItem } from "./RoomUserListItem";

export const RoomUserList = () => {
  const num = [...Array(8).keys()];
  return (
    <>
      <div className="3xl:w-[1225px] w-[980px] 3xl:h-[700px] h-[560px] 3xl:text-[56px] text-[44.8px] font-bold bg-transparent">
        <div className="flex flex-wrap justify-end">
          {num.map((item, index) => (
            <RoomUserListItem item={item + 1} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};
