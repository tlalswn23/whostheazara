import { baseUrl } from "./baseUrl";

export default {
  baseRoomUrl: () => `${baseUrl}/rooms`,
  createTopicUrl: (roomCode: string) => `${baseUrl}/rooms/${roomCode}/enter`,
  searchRoomUrl: (roomCode: string) => `${baseUrl}/rooms/search/${roomCode}`,
};
