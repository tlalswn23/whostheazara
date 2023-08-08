export default {
  subRoom: (roomCode: string) => `/sub/room/${roomCode}`,
  pubChat: (roomCode: string) => `/pub/room/${roomCode}/chat`,
  pubRoomEnter: (roomCode: string) => `/pub/room/${roomCode}/enter`,
  pubRoomTitle: (roomCode: string) => `/pub/room/${roomCode}/title`,
  pubRoomJobSetting: (roomCode: string) => `/pub/room/${roomCode}/jobSetting`,
  pubRoomStart: (roomCode: string) => `/pub/room/${roomCode}/start`,

  subGame: (gameCode: string) => `/sub/game/${gameCode}/all`,
  subGameZara: (gameCode: string) => `/sub/game/${gameCode}/zara`,
  subGameGhost: (gameCode: string) => `/sub/game/${gameCode}/ghost`,
  pubGameTimer: (gameCode: string) => `/pub/game/${gameCode}/timer`,

  pubGameChatAll: (gameCode: string) => `/pub/game/${gameCode}/all/chat`,
  pubGameChatZara: (gameCode: string) => `/pub/game/${gameCode}/zara/chat`,
  pubGameChatGhost: (gameCode: string) => `/pub/game/${gameCode}/ghost/chat`,
};
