import { baseUrl } from "./baseUrl";

export default {
  baseRoomUrl: () => `${baseUrl}/rooms`,
  createTopicUrl: (roomCode: string) => `${baseUrl}/rooms/${roomCode}/enter`,
};
