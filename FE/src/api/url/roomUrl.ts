import { baseUrl } from "./baseUrl";

export default {
  getRoomList: () => `${baseUrl}/room/rooms`,
  createRoom: () => `${baseUrl}/room/create`,
};
