export const LobbyRoomItem = () => {
  // TODO: onClick시에 방 라우팅(방 입장하면 useEffect로 구독)
  return (
    <div
      className={`w-[50%] h-[25%] 3xl:border-[10px] border-[8px] border-solid border-black flex items-center 3xl:text-[24px] text-[20px] text-white hover:text-yellow-200 cursor-pointer shadow-inner shadow-white bg-gray-900`}
    >
      <div className="flex">
        <p className="3xl:w-[64px] w-[54px] 3xl:ml-[40px] ml-[32px]">{}.</p>
        <p className="3xl:w-[300px] w-[250px]">{}</p>
      </div>
      <p className="">{}</p>
    </div>
  );
};
