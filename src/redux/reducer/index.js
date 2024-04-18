import { combineReducers } from "redux";
import walletReducer from "./walletReducer";
import CounterSlice from "../features/CounterSlice";

const rootReducer = combineReducers({
  wallet: walletReducer,
  counter: CounterSlice,
  // other reducers if any
});

export default rootReducer;
