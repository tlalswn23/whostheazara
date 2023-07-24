import { RoomHeader } from "../components/room/RoomHeader";
import { RoomHeaderBtn } from "../components/room/RoomHeaderBtn";
import { RoomSideMenu } from "../components/room/RoomSideMenu";
import { RoomUserList } from "../components/room/RoomUserList";
import { RoomLayout } from "../layouts/RoomLayout";

export const Room = () => {
  return (
    <RoomLayout>
      <div className="flex w-full justify-center items-center">
        <div className="flex mb-[20px] mr-[60px]">
          <RoomHeader />
          <RoomHeaderBtn text="나가기" loc="lobby" />
        </div>
        <div className="flex mb-[20px] mr-[60px]">
          <RoomSideMenu />
          <RoomUserList />
        </div>
      </div>
    </RoomLayout>
  );
};
