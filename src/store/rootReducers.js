import { combineReducers } from "redux";
import userSlice from "./slices/UserSlice";
import GameSlice from "./slices/GameSlice";

const appReducer = combineReducers({
    userData: userSlice,
    gameData: GameSlice,
});

const rootReducer = (state, action) => {
    if (action.type === "RESET") {
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;