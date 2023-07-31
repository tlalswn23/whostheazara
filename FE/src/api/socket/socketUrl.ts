import { stompBaseUrl } from "../baseUrl";

export default {
  broker: () => `${stompBaseUrl}/stomp/chat`,
  subscribe: () => `${stompBaseUrl}/stomp/chat/sub`,
  publish: (roomId: number) => `${stompBaseUrl}/stomp/chat/pub/${roomId}`,
};
