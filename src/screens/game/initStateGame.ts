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
}
export const GAME_INIT: init = {
  Total: [],
  PositionArray: -1,
  profileUser: {},
  profileUser1: {},
  profileUser2: {},
  profileUser3: {},
  profileUser4: {},
  waveGame: 0,
};
