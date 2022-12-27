import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GAME_INIT } from "./initStateGame";
const gameSlice = createSlice({
  name: "game",
  initialState: GAME_INIT,
  reducers: {
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
    updateProfileUser(state, action: PayloadAction<any>) {
      if (action.payload) {
        state.profileUser = action.payload;
      }
    },
    updateProfileUser1(state, action: PayloadAction<any>) {
      if (action.payload) {
        state.profileUser1 = action.payload;
      }
    },
    updateProfileUser2(state, action: PayloadAction<any>) {
      if (action.payload) {
        state.profileUser2 = action.payload;
      }
    },
    updateProfileUser3(state, action: PayloadAction<any>) {
      if (action.payload) {
        state.profileUser3 = action.payload;
      }
    },
    updateProfileUser4(state, action: PayloadAction<any>) {
      if (action.payload) {
        state.profileUser4 = action.payload;
      }
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
