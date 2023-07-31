import { stompBaseUrl } from "./baseUrl";

export default {
  chatBroker: () => `${stompBaseUrl}/chat`,
  subscribe: (roomId: string) => `${stompBaseUrl}/sub/chat${roomId}`,
  publish: () => `${stompBaseUrl}/pub/chat/message`,
  publishEnterMessage: () => `${stompBaseUrl}/pub/chat/enter`,
};
