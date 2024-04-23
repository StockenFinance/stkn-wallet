import { combineReducers } from "redux";
import walletReducer from "./walletReducer";
import chainReducer from "./chainReducer";
import recoverReducer from "./CounterSlice";
import allWalletStore from "./allWalletStore";

const rootReducer = combineReducers({
  wallet: walletReducer,
  chain: chainReducer,
  walletRecover: recoverReducer,
  walletStore: allWalletStore,
  // other reducers if any
});

export default rootReducer;
