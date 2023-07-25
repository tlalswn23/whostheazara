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

  useEffect(() => {
    client?.subscribe("", (body) => {
      const jsonBody = JSON.parse(body.body);
      //TODO: 채팅 리스트에 추가
      // setChatList((prev: StompChatType[]): StompChatType[] => [...prev, jsonBody]);
    });

    client?.activate();

    return () => {
      setChatList([]);
    };
  }, []);

  const onSend = () => {
    client?.publish({
      destination: "",
      body: JSON.stringify({
        message: inputChat,
      }),
    });
  };

  return (
    <aside className="relative top-[136px] left-[40px] ml-[30px] w-[550px] h-[720px] text-white">
      <img src={roomChat} className="absolute left-[0px] top-[0px] w-[full]" />
      <div className="absolute top-[60px] left-[40px] text-[28px] pr-[10px] overflow-y-scroll h-[540px] w-[490px]">
        {chatList.map((item) => (
          <p>{item}</p>
        ))}
      </div>
      <input
        className="absolute w-[510px] h-[60px] left-[20px] bottom-[20px] text-black px-[20px] text-[28px]"
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
