interface User {
  betChips: number;
  cards: Array<string>;
  chips: number;
  connected: boolean;
  id: string;
  isFold: boolean;
  isHost: boolean;
  isWinner: false;
  role: string;
  turn?: number;
}
interface init {
  Total: any;
  profileUser?: any;
  profileUser1?: any;
  profileUser2?: any;
  profileUser3?: any;
  profileUser4?: any;
  PositionArray: number;
  waveGame: number;
  currentPlayer?: string;
  countDown: number;
  countDownStartGame: number;
  isRunning: boolean;
  randomCountDown: number;
  currentBetChips: number;
  highBetWave: number;
  waveChipTotal: number;
  roundGame: Array<string>;
}
export const GAME_INIT: init = {
  Total: [],
  PositionArray: -1,
  profileUser: {},
  profileUser1: {},
  profileUser2: {},
  profileUser3: {},
  profileUser4: {},
  waveGame: -2,
  countDown: 9,
  countDownStartGame: 10,
  isRunning: true,
  randomCountDown: 2,
  currentPlayer: "",
  roundGame: [],
  currentBetChips: 100,
  waveChipTotal: 100,
  highBetWave: 0,
};
