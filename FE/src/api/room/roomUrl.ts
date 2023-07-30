import { BaseUrl } from "../baseUrl";

export default {
  getRoomList: () => `${BaseUrl}/room/rooms`,
  createRoom: () => `${BaseUrl}/room/create`,
};
