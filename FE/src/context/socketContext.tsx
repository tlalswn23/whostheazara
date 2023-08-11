import { createContext, useContext, useEffect, useState } from "react";
import { LayoutChildrenProps } from "../types/LayoutChildrenProps";
import { Client, StompHeaders } from "@stomp/stompjs";
import { useAccessTokenState } from "./accessTokenContext";
import { stompBaseUrl } from "../api/url/baseUrl";

interface WebSocketContextProps {
  client: Client | undefined;
}

const WebSocketContext = createContext<WebSocketContextProps>({
  client: new Client(),
});

export const WebSocketProvider = ({ children }: LayoutChildrenProps) => {
  const [client, setClient] = useState<Client | undefined>(undefined);
  const { accessToken } = useAccessTokenState();

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
      onDisconnect: () => {
        console.log("Disconnected from WebSocket");
      },
      onWebSocketError: (error) => {
        console.log("WebSocket error: ", error);
      },
    });

    const handleBeforeUnload = () => {
      if (newClient.connected) {
        // 필요한 헤더와 함께 메시지를 보낼 수 있습니다.
        const headers: StompHeaders = {
          customHeader: "value", // 원하는 헤더를 여기에 추가하세요
        };
        newClient.publish({ destination: "/your/destination", headers: headers, body: "your-message" });

        // 웹 소켓 연결을 종료하는 코드도 추가할 수 있습니다.
        // newClient.deactivate();
      }
    };

    // beforeunload 이벤트를 등록합니다.
    window.addEventListener("beforeunload", handleBeforeUnload);

    setClient(newClient);
    newClient.activate();

    return () => {
      // 컴포넌트가 언마운트되면 이벤트를 제거합니다.
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [accessToken]);

  return <WebSocketContext.Provider value={{ client }}>{children}</WebSocketContext.Provider>;
};

export const useWebSocket = (): WebSocketContextProps => {
  const context = useContext(WebSocketContext);
  if (context === null) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
