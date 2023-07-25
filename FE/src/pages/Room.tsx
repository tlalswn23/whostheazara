import { RoomHeader } from "../components/room/RoomHeader";
import { RoomHeaderBtn } from "../components/room/RoomHeaderBtn";
import { RoomSideMenu } from "../components/room/RoomSideMenu";
import { RoomUserList } from "../components/room/RoomUserList";
import { RoomLayout } from "../layouts/RoomLayout";

export const Room = () => {
  return (
    <RoomLayout>
      <div className="flex flex-wrap w-full h-full justify-center items-center 3xl:mt-[40px] mt-[36px] 3xl:px-[40px] px-[36px]">
        <div className="flex 3xl:mb-[0px] mb-[px] justify-around items-center w-full">
          <RoomHeader />
          <RoomHeaderBtn text="나가기" loc="lobby" />
        </div>
        <div className="flex justify-around w-full items-center">
          <RoomSideMenu />
          <RoomUserList />
        </div>
      </div>
    </RoomLayout>
  );
};
