import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import AppNavigator from "./src/AppNavigator";
// import Dashboard from "./src/screens/Dashboard/Dashboard";
import SwapScreen from "./src/screens/SwapScreen";
import { PersistGate } from "redux-persist/es/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./src/redux/store";
import i18n from "./src/utils/i18n"; // Import your initialized i18n instance
import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18nManager } from "react-native";

const App = () => {
  useEffect(() => {
    // Retrieve the selected language from AsyncStorage on component mount
    AsyncStorage.getItem("selectedLanguage").then((language) => {
      if (language) {
        i18n.locale = language;
        if (language === "ar") {
          I18nManager.forceRTL(true);
        } else {
          I18nManager.forceRTL(false);
        }
      }
    });
  }, []);
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
