import { stompBaseUrl } from "./baseUrl";

export default {
  chatBroker: () => `${stompBaseUrl}`,
  subRoom: (roomCode: string) => `/sub/room/${roomCode}`,
  pubRoomTitle: (roomCode: string) => `/pub/room/${roomCode}/title`,
  pubRoomJobSetting: (roomCode: string) => `/pub/room/${roomCode}/jobSetting`,
  pubRoomStart: (roomCode: string) => `/pub/room/${roomCode}/start`,
  // publishEnterMessage: () => `/pub/chat/enter`,
};
