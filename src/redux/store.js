import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import rootReducer from "../redux/reducer/index";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  serialize: (value) =>
    JSON.stringify(value, (key, val) =>
      typeof val === "bigint" ? val.toString() : val
    ),
  deserialize: (value) =>
    JSON.parse(value, (key, val) =>
      typeof val === "string" && /^\d+n$/.test(val)
        ? BigInt(val.slice(0, -1))
        : val
    ),
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware());

const persistor = persistStore(store);

export { store, persistor };
