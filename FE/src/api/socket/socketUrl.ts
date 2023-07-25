import { sockJsBaseUrl } from "../baseUrl";

export default {
  connect: () => `${sockJsBaseUrl}/stomp/chat`,
};
