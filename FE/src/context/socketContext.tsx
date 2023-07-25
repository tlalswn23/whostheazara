import { createContext, useContext, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import { LayoutChildrenProps } from "../types/LayoutChildrenProps";
import socketUrl from "../api/socket/socketUrl";
interface WebSocketContextProps {
  client: Client | null;
}

const WebSocketContext = createContext<WebSocketContextProps | null>(null);

export const WebSocketProvider = ({ children }: LayoutChildrenProps) => {
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    clientRef.current = new Client({
      brokerURL: socketUrl.broker(),
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
