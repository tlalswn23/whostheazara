import { stompBaseUrl } from "./baseUrl";

export default {
  chatBroker: () => `${stompBaseUrl}/chat`,
  subscribe: (roomCode: string) => `${stompBaseUrl}/sub/chat/${roomCode}`,
  publish: () => `${stompBaseUrl}/pub/chat/message`,
  publishEnterMessage: () => `${stompBaseUrl}/pub/chat/enter`,
};
