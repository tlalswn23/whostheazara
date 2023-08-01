import { createContext, useContext, useEffect, useRef } from "react";
import { LayoutChildrenProps } from "../types/LayoutChildrenProps";
import chatUrl from "../api/url/chatUrl";
import { Client } from "@stomp/stompjs";

interface WebSocketContextProps {
  client: Client | undefined;
}

const WebSocketContext = createContext<WebSocketContextProps>({
  client: new Client(),
});

export const WebSocketProvider = ({ children }: LayoutChildrenProps) => {
  const clientRef = useRef<Client>();

  useEffect(() => {
    clientRef.current = new Client({
      brokerURL: chatUrl.chatBroker(),
      onConnect: () => {
        console.log("Connected to WebSocket");
      },
    });
  }, []);

  return <WebSocketContext.Provider value={{ client: clientRef.current }}>{children}</WebSocketContext.Provider>;
};

export const useWebSocket = (): WebSocketContextProps => {
  const context = useContext(WebSocketContext);
  if (context === null) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return {
    client: context.client,
  };
};
