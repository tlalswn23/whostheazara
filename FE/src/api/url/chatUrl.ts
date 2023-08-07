import { stompBaseUrl } from "./baseUrl";

export default {
  chatBroker: () => `${stompBaseUrl}`,
  subscribe: (roomCode: string) => `/sub/chat/${roomCode}`,
  publish: () => `/pub/chat/message`,
  publishEnterMessage: () => `/pub/chat/enter`,
};
