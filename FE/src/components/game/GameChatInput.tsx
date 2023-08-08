import { useState } from "react";
import { useWebSocket } from "../../context/socketContext";
import stompUrl from "../../api/url/stompUrl";
import { useParams } from "react-router-dom";
import { useAccessTokenState } from "../../context/accessTokenContext";
interface GameChatInputProps {
  chatTabCategory: number;
}

export const GameChatInput = ({ chatTabCategory }: GameChatInputProps) => {
  const { userSeq } = useAccessTokenState();
  const { client } = useWebSocket();
  const { gameCode } = useParams();
  const [inputChat, setInputChat] = useState("");

  const pubGameChatAll = (gameCode: string) => {
    client?.publish({
      destination: stompUrl.pubGameChatAll(gameCode),
      body: JSON.stringify({
        sender: userSeq,
        message: inputChat,
      }),
    });
  };
  const pubGameChatZara = (gameCode: string) => {
    client?.publish({
      destination: stompUrl.pubGameChatZara(gameCode),
      body: JSON.stringify({
        sender: userSeq,
        message: inputChat,
      }),
    });
  };
  const pubGameChatGhost = (gameCode: string) => {
    client?.publish({
      destination: stompUrl.pubGameChatGhost(gameCode),
      body: JSON.stringify({
        sender: userSeq,
        message: inputChat,
      }),
    });
  };

  const pubGameChat = (gameCode: string) => {
    if (chatTabCategory === 0) {
      pubGameChatAll(gameCode);
      return;
    }
    if (chatTabCategory === 1) {
      pubGameChatZara(gameCode);
      return;
    }
    if (chatTabCategory === 2) {
      pubGameChatGhost(gameCode);
      return;
    }
  };

  return (
    <div className="absolute 3xl:bottom-[13px] bottom-[10.4px] 3xl:left-[12.5px] left-[10px]">
      <input
        className="3xl:px-[7.5px] px-[6px] 3xl:w-[287.5px] w-[230px] 3xl:h-[41px] h-[32.8px] 3xl:text-[18px] text-[14.4px]"
        value={inputChat}
        onChange={(e) => setInputChat(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            pubGameChat(gameCode!);
            setInputChat("");
          }
        }}
      />
    </div>
  );
};
