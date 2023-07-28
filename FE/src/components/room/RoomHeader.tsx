import { LobbyJobList } from "../../constants/LobbyJobList";
import LobbyJobBtn from "../lobby/LobbyJobBtn";
import roomTitle from "../../assets/img/roomTitle.png";

export const RoomHeader = () => {
  return (
    <div
      className="3xl:w-[1420px] w-[1136px] 3xl:h-[126px] h-[100.8px] 3xl:text-[38px] text-[30.4px] text-white flex items-center justify-around bg-cover"
      style={{ backgroundImage: `url(${roomTitle})` }}
    >
      <p className=" text-2xl ml-6">221. 자라 잡으러 가실분 구해요 자라 잡으러 가실분 구해요</p>
      <div className="flex justify-end w-5/12">
        {LobbyJobList.map((job) => (
          <LobbyJobBtn key={job.id} img={job.img} id={job.id} />
        ))}
      </div>
    </div>
  );
};
