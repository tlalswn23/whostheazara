import { createContext, useContext, useEffect, useRef } from "react";
import { LayoutChildrenProps } from "../types/LayoutChildrenProps";
import socketUrl from "../api/socket/socketUrl";
import { Client } from "@stomp/stompjs";

interface WebSocketContextProps {
  client: Client | null;
}

const WebSocketContext = createContext<WebSocketContextProps | null>(null);

export const WebSocketProvider = ({ children }: LayoutChildrenProps) => {
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    clientRef.current = new Client({
      brokerURL: socketUrl.connect(),
    });

    clientRef.current.onConnect = () => {
      console.log("Connected to WebSocket");
    };
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
