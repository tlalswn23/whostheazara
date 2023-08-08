export default {
  subRoom: (roomCode: string) => `/sub/room/${roomCode}`,
  pubChat: (roomCode: string) => `/pub/room/${roomCode}/chat`,
  pubRoomTitle: (roomCode: string) => `/pub/room/${roomCode}/title`,
  pubRoomJobSetting: (roomCode: string) => `/pub/room/${roomCode}/jobSetting`,
  pubRoomStart: (roomCode: string) => `/pub/room/${roomCode}/start`,
  subGame: (gameCode: string) => `/sub/game/${gameCode}`,
  // publishEnterMessage: () => `/pub/chat/enter`,
};
