import { combineReducers } from "redux";
import walletReducer from "./walletReducer";
import chainReducer from "./chainReducer";
import recoverReducer from "./CounterSlice";
import allWalletStore from "./allWalletStore";
import walletCardSlice from "./walletCardSlice";

const rootReducer = combineReducers({
  wallet: walletReducer,
  chain: chainReducer,
  walletRecover: recoverReducer,
  walletStore: allWalletStore,
  walletcards: walletCardSlice,
  // other reducers if any
});

export default rootReducer;
