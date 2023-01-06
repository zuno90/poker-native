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
  currentPlayer?: any;
  SSIDstartgame?: string;
  countDown: number;
  countdownReal: number;
  countDownStartGame: number;
  isRunning: boolean;
  stateClearTimeout: boolean;
  randomCountDown: number;
  currentBetChips: number;
  highBetWave: number;
  waveChipTotal: number;
  raiseBet: number;
  roundGame: Array<string>;
  chatGame: Array<string>;
  arrSeatPlayer?: any;
}
export const GAME_INIT: init = {
  Total: [],
  chatGame: [],
  roundGame: [],

  PositionArray: -1,
  profileUser: {},
  profileUser1: {},
  profileUser2: {},
  profileUser3: {},
  profileUser4: {},
  waveGame: -2,
  countDown: 9,
  countdownReal: -2,
  countDownStartGame: 10,
  stateClearTimeout: true,
  isRunning: true,
  randomCountDown: 2,
  currentPlayer: {
    action: [],
    seat: 0,
  },
  arrSeatPlayer: {
    seat: 0,
    arrSeat: [0, 0, 0, 0, 0],
  },
  SSIDstartgame: "",
  currentBetChips: 100,
  waveChipTotal: 100,
  raiseBet: 100,
  highBetWave: 0,
};
