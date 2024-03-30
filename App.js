import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppNavigator from "./src/AppNavigator";
import Dashboard from "./src/screens/Dashboard/Dashboard";
import SwapScreen from "./src/screens/SwapScreen/SwapScreen";

// import BottomTabNavigation from "./src/TabNavigator";

const App = () => {
  return (
    <AppNavigator />
    // <SwapScreen />
    // <Dashboard />
  );
};

export default App;

const styles = StyleSheet.create({});
