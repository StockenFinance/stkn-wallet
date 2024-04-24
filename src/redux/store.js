import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import rootReducer from "../redux/reducer/index";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  cardState: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware());

const persistor = persistStore(store);

export { store, persistor };
