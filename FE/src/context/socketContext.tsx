import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { LayoutChildrenProps } from "../types/LayoutChildrenProps";
import { Client } from "@stomp/stompjs";
import { stompBaseUrl } from "../api/url/baseUrl";
import chatUrl from "../api/url/chatUrl";
import { useAccessTokenState } from "./accessTokenContext";

interface WebSocketContextProps {
  client: Client | undefined;
  sendMsg: (roomCode: string, userSeq: number, message: string) => void;
}

const WebSocketContext = createContext<WebSocketContextProps>({
  client: new Client(),
  sendMsg: () => {},
});

export const WebSocketProvider = ({ children }: LayoutChildrenProps) => {
  const [client, setClient] = useState<Client | undefined>(undefined);
  const { accessToken } = useAccessTokenState();

  const sendMsg = useCallback(
    (roomCode: string, userSeq: number, message: string) => {
      if (client?.connected) {
        const url = chatUrl.publish();
        const body = JSON.stringify({ code: roomCode, userSeq, message });
        client.publish({ destination: url, body });
      } else {
        console.log("WebSocket is not connected yet");
      }
    },
    [client]
  );

  useEffect(() => {
    if (!accessToken) return;
    const newClient = new Client({
      brokerURL: stompBaseUrl,
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      beforeConnect: () => {
        console.log("Connecting to WebSocket");
      },
      onConnect: () => {
        console.log("Connected to WebSocket");
      },
      onWebSocketError: (error) => {
        console.log("WebSocket error: ", error);
        newClient.deactivate();
      },
    });
    setClient(newClient);
    newClient.activate();
  }, [accessToken]);

  return <WebSocketContext.Provider value={{ client, sendMsg }}>{children}</WebSocketContext.Provider>;
};

export const useWebSocket = (): WebSocketContextProps => {
  const context = useContext(WebSocketContext);
  if (context === null) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
