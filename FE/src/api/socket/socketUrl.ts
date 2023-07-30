import { stompBaseUrl } from "../baseUrl";

export default {
  broker: () => `${stompBaseUrl}/stomp/chat`,
};
