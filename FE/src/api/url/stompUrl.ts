export default {
  subGame: (gameCode: string) => `/sub/game/${gameCode}/all`,
  subGameZara: (gameCode: string) => `/sub/game/${gameCode}/zara`,
  subGameGhost: (gameCode: string) => `/sub/game/${gameCode}/ghost`,
  pubGameTimer: (gameCode: string) => `/pub/game/${gameCode}/timer`,

  pubGameChatAll: (gameCode: string) => `/pub/game/${gameCode}/all/chat`,
  pubGameChatZara: (gameCode: string) => `/pub/game/${gameCode}/zara/chat`,
  pubGameChatGhost: (gameCode: string) => `/pub/game/${gameCode}/ghost/chat`,
  pubGameVote: (gameCode: string) => `/pub/game/${gameCode}/vote`,
  pubGameEndTimer: (gameCode: string) => `/pub/game/${gameCode}/timer`,
};
