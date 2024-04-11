import { combineReducers } from "redux";
import walletReducer from "./walletReducer";

const rootReducer = combineReducers({
  wallet: walletReducer,
  // other reducers if any
});

export default rootReducer;
