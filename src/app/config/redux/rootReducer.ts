import gameReducer from "../../../module/game/GameSlice";
import homeReducer from "../../../module/home/HomeSlice";

const rootReducer = {
  game: gameReducer,
  home: homeReducer,
};

export default rootReducer;
