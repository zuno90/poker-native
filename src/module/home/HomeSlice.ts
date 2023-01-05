import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HOME_INIT } from "./initHome";

const homeSlice = createSlice({
  name: "home",
  initialState: HOME_INIT,
  reducers: {
    updateSeat(state, action: PayloadAction<number>) {
      state.seat = action.payload;
    },
  },
});
export const homeAction = homeSlice.actions;
//Selector
export const selectHome = (state: any) => state.home;

// Reducer
const homeReducer = homeSlice.reducer;
export default homeReducer;
