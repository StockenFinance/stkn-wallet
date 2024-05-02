import { combineReducers } from "redux";
import walletReducer from "./walletReducer";
import chainReducer from "./chainReducer";
import recoverReducer from "./CounterSlice";
import allWalletStore from "./allWalletStore";
import walletCardSlice from "./walletCardSlice";
import CounterSlice from "./CounterSlice";
import currencyCardSlice from "./currencyCardSlice";
import navigationSlice from "./navigationSlice";
import activeIndexSlice from "./activeIndexSlice";

const rootReducer = combineReducers({
  wallet: walletReducer,
  chain: chainReducer,
  walletRecover: recoverReducer,
  walletStore: allWalletStore,
  walletcards: walletCardSlice,
  counter: CounterSlice,
  currencyCardData: currencyCardSlice,
  navigation: navigationSlice,
  activeIndex: activeIndexSlice,

  // other reducers if any
});

export default rootReducer;
