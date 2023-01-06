import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GAME_INIT } from "./initStateGame";
const gameSlice = createSlice({
  name: "game",
  initialState: GAME_INIT,
  reducers: {
    // reset INIT
    updateInit(state) {
      state = GAME_INIT;
    },
    //Chat
    updateChat(state, action: PayloadAction<any>) {
      state.chatGame.push(action.payload);
    },
    updateTotal(state, action: PayloadAction<any>) {
      // console.log(state.Total, "store");
      if (typeof action.payload === "object") {
        state.Total = action.payload;
      }
    },
    updateCurrentBetChips(state, action: PayloadAction<number>) {
      state.currentBetChips = action.payload;
    },

    updateRoundGame(state, action: PayloadAction<any>) {
      state.roundGame = action.payload;
    },
    updateRaiseBet(state, action: PayloadAction<number>) {
      state.raiseBet = action.payload;
    },
    updateHighBetWave(state, action: PayloadAction<number>) {
      state.highBetWave = action.payload;
    },
    updateStateClearTimeout(state, action: PayloadAction<any>) {
      state.stateClearTimeout = action.payload;
    },
    updateCountdownStartGame(state, action: PayloadAction<any>) {
      state.countDownStartGame = action.payload;
    },
    updateCountdown(state, action: PayloadAction<any>) {
      state.countDown = action.payload;
    },
    updateCountdownReal(state, action: PayloadAction<any>) {
      state.countdownReal = action.payload;
    },
    updateIsRunning(state, action: PayloadAction<any>) {
      state.isRunning = action.payload;
    },
    updateRandomCountdown(state, action: PayloadAction<any>) {
      state.randomCountDown = action.payload;
    },
    updateWaveGame(state, action: PayloadAction<any>) {
      state.waveGame = action.payload;
    },
    updatePositionArray(state, action: PayloadAction<any>) {
      state.PositionArray = action.payload;
    },
    //Profile
    updateProfileUser(state, action: PayloadAction<any>) {
      state.profileUser = action.payload;
    },
    updateProfileUser1(state, action: PayloadAction<any>) {
      state.profileUser1 = action.payload;
    },
    updateProfileUser2(state, action: PayloadAction<any>) {
      state.profileUser2 = action.payload;
    },
    updateProfileUser3(state, action: PayloadAction<any>) {
      state.profileUser3 = action.payload;
    },
    updateProfileUser4(state, action: PayloadAction<any>) {
      state.profileUser4 = action.payload;
    },
    //Current
    updateCurrentPlayer(state, action: PayloadAction<any>) {
      state.currentPlayer.seat = action.payload.seat;
      state.currentPlayer.action.push(action.payload.action);
    },
    updateCurrentPlayerEndWave(state) {
      state.currentPlayer.action = [];
    },
    updateArrSeatPlayer(state, action: PayloadAction<any>) {
      state.arrSeatPlayer.arrSeat[action.payload.seat - 1] =
        action.payload.seat;
    },
    updateArrSeatFiler(state) {
      state.arrSeatPlayer.arrSeat = state.arrSeatPlayer.arrSeat.filter(
        (item) => {
          return item !== 0;
        }
      );
    },
    //Player startGame
    updateSSIDStartGame(state, action: PayloadAction<string>) {
      state.SSIDstartgame = action.payload;
    },
  },
});
// Action
export const gameAction = gameSlice.actions;
//Selector
export const selectGame = (state: any) => state.game;

// Reducer
const gameReducer = gameSlice.reducer;
export default gameReducer;
