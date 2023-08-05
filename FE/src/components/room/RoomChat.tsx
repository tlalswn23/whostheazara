import roomChat from "../../assets/img/room/roomChat.png";
import { useState } from "react";
import { useWebSocket } from "../../context/socketContext";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useAccessTokenState } from "../../context/accessTokenContext";
import chatUrl from "../../api/url/chatUrl";

export const RoomChat = () => {
  const { roomCode } = useParams();
  const location = useLocation();
  const [inputChat, setInputChat] = useState("");
  const { client, sendMsg } = useWebSocket();
  const [chatList, setChatList] = useState<string[]>([]);
  const { userSeq } = useAccessTokenState();

  // TODO: Test
  const onSendMsg = () => {
    if (!roomCode) return;
    sendMsg(roomCode, userSeq, inputChat);
    setInputChat("");
  };

  const subRoom = () => {
    const url = chatUrl.subscribe(roomCode!);
    client?.subscribe(url, (receiveMsg) => {
      const data = JSON.parse(receiveMsg.body);
      setChatList((prev) => [...prev, data.message]);
    });
  };

  const sendEnterMsg = () => {
    const url = chatUrl.publishEnterMessage();
    const body = JSON.stringify({ code: roomCode, userSeq });
    client?.publish({ destination: url, body });
  };

  const unSubRoom = () => {
    if (!roomCode) return;
    client?.unsubscribe(chatUrl.subscribe(roomCode));
    console.log("unsubscribed");
  };

  useEffect(() => {
    if (!roomCode) return;
    subRoom();
    sendEnterMsg();

    return () => {
      // location.pathname을 확인하여 /game으로 시작하는 경로로 이동하는지 확인
      if (!location.pathname.startsWith("/game")) {
        unSubRoom();
      }

      setChatList([]);
    };
  }, [roomCode, client, location]);
  return (
    <aside className="relative 3xl:mb-[30px] mb-[24px] 3xl:w-[550px] w-[440px] 3xl:h-[720px] h-[576px] text-white 3xl:ml-[25px] ml-[20px]">
      <img src={roomChat} className="absolute left-[0px] top-[0px] w-[full]" />
      <div className="absolute 3xl:top-[60px] top-[48px] 3xl:left-[40px] left-[36px] 3xl:text-[28px] text-[22.4px] 3xl:pr-[10px] pr-[8px] overflow-y-scroll 3xl:h-[540px] h-[432px] 3xl:w-[490px] w-[392px]">
        {chatList.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
      <input
        className="absolute 3xl:w-[510px] w-[408px] 3xl:h-[60px] h-[48px] 3xl:left-[20px] left-[16px] 3xl:bottom-[20px] bottom-[16px] text-black 3xl:px-[20px] px-[16px] 3xl:text-[28px] text-[22.4px]"
        value={inputChat}
        onChange={(e) => setInputChat(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            onSendMsg();
          }
        }}
      />
    </aside>
  );
};
