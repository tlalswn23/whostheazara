import roomChat from "../../assets/img/roomChat.png";
import { useState } from "react";
import { useWebSocket } from "../../context/socketContext";
import { useEffect } from "react";
import { StompChatType } from "../../types/StompChatType";

export const RoomChat = () => {
  const [inputChat, setInputChat] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputChat(e.target.value);
  };
  const { client } = useWebSocket();
  const [chatList, setChatList] = useState([]);

  // useEffect(() => {
  //   client?.subscribe("", (body) => {
  //     const jsonBody = JSON.parse(body.body);
  //     //TODO: 채팅 리스트에 추가
  //     // setChatList((prev: StompChatType[]): StompChatType[] => [...prev, jsonBody]);
  //   });

  //   client?.activate();

  //   return () => {
  //     setChatList([]);
  //   };
  // }, []);

  const onSend = () => {
    client?.publish({
      destination: "",
      body: JSON.stringify({
        message: inputChat,
      }),
    });
  };

  return (
    <aside className="relative 3xl:mb-[30px] mb-[24px] 3xl:w-[550px] w-[440px] 3xl:h-[720px] h-[576px] text-white">
      <img src={roomChat} className="absolute left-[0px] top-[0px] w-[full]" />
      <div className="absolute 3xl:top-[60px] top-[48px] 3xl:left-[40px] left-[36px] 3xl:text-[28px] text-[22.4px] 3xl:pr-[10px] pr-[8px] overflow-y-scroll 3xl:h-[540px] h-[432px] 3xl:w-[490px] w-[392px]">
        {chatList.map((item) => (
          <p>{item}</p>
        ))}
      </div>
      <input
        className="absolute 3xl:w-[510px] w-[408px] 3xl:h-[60px] h-[48px] 3xl:left-[20px] left-[16px] 3xl:bottom-[20px] bottom-[16px] text-black 3xl:px-[20px] px-[16px] 3xl:text-[28px] text-[22.4px]"
        value={inputChat}
        onChange={onChange}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            onSend();
            setInputChat("");
          }
        }}
      />
    </aside>
  );
};
