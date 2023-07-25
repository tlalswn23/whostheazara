import { createContext, useContext, useEffect, useRef } from "react";
import { LayoutChildrenProps } from "../types/LayoutChildrenProps";
import socketUrl from "../api/socket/socketUrl";
import { CompatClient, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

interface WebSocketContextProps {
  client: CompatClient | null;
}

const WebSocketContext = createContext<WebSocketContextProps | null>(null);

export const WebSocketProvider = ({ children }: LayoutChildrenProps) => {
  const clientRef = useRef<CompatClient | null>(null);

  useEffect(() => {
    const sockJs = new SockJS(socketUrl.connect());
    clientRef.current = Stomp.over(sockJs);
    clientRef.current.connect(
      {},
      () => {
        console.log("WebSocket is connected");
      },
      (error: any) => {
        console.log("Failed to connect WebSocket: ", error);
      }
    );
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
