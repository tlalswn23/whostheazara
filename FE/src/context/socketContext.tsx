import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { LayoutChildrenProps } from "../types/LayoutChildrenProps";
import { Client, IMessage } from "@stomp/stompjs";
import { stompBaseUrl } from "../api/url/baseUrl";
import chatUrl from "../api/url/chatUrl";

type ReceiveMsg = (message: IMessage) => void;
interface WebSocketContextProps {
  client: Client | undefined;
  enterRoom: (roomCode: string, receiveMsg: ReceiveMsg) => void;
  exitRoom: (roomCode: string) => void;
  sendMsg: (destination: string, message: string) => void;
}

const WebSocketContext = createContext<WebSocketContextProps>({
  client: new Client(),
  enterRoom: () => {},
  exitRoom: () => {},
  sendMsg: () => {},
});

export const WebSocketProvider = ({ children }: LayoutChildrenProps) => {
  const [client, setClient] = useState<Client | undefined>(undefined);

  const sendMsg = useCallback(
    (destination: string, message: string) => {
      if (client?.active && client?.connected) {
        const body = JSON.stringify({ message });
        client?.publish({ destination, body });
      } else {
        console.log("WebSocket is not connected yet");
      }
    },
    [client]
  );

  const enterRoom = useCallback(
    (roomCode: string, receiveMsg: ReceiveMsg) => {
      if (client?.active && client?.connected) {
        client.subscribe(chatUrl.subscribe(roomCode), receiveMsg);
        // 방 입장시 자동 입장 메시지 전송
        sendMsg(chatUrl.publish(), JSON.stringify({ roomCode }));
      } else {
        console.error("WebSocket is not active yet"); // 클라이언트가 아직 활성화되지 않았다면 오류를 출력
      }
    },
    [client, sendMsg]
  );

  const exitRoom = useCallback(
    (roomCode: string) => {
      client?.unsubscribe(chatUrl.subscribe(roomCode));
    },
    [client]
  );

  useEffect(() => {
    const newClient = new Client({
      brokerURL: stompBaseUrl,
      onConnect: () => {
        console.log("Connected to WebSocket");
        newClient.activate();
        setClient(newClient);
      },
    });
  }, []);

  return (
    <WebSocketContext.Provider value={{ client, enterRoom, exitRoom, sendMsg }}>{children}</WebSocketContext.Provider>
  );
};

export const useWebSocket = (): WebSocketContextProps => {
  const context = useContext(WebSocketContext);
  if (context === null) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
