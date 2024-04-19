import { combineReducers } from "redux";
import walletReducer from "./walletReducer";
import chainReducer from "./chainReducer";

const rootReducer = combineReducers({
  wallet: walletReducer,
  chain: chainReducer,
  // other reducers if any
});

export default rootReducer;
