import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppNavigator from "./src/AppNavigator";
import Dashboard from "./src/screens/Dashboard/Dashboard";
import SwapScreen from "./src/screens/SwapScreen/SwapScreen";
import { PersistGate } from "redux-persist/es/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./src/redux/store";

// import BottomTabNavigation from "./src/TabNavigator";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>

    // <SwapScreen />
    // <Dashboard />
  );
};

export default App;

const styles = StyleSheet.create({});
