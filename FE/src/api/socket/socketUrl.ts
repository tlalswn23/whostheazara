import { sockJsBaseUrl } from "../baseUrl";

export default {
  broker: () => `${sockJsBaseUrl}/stomp/chat`,
};
