import { wsBaseUrl } from "../baseUrl";

export default {
  connect: () => `${wsBaseUrl}/stomp/chat`,
};
