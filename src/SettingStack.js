import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import WalletManagement from "./screens/WalletManagement/WalletManagement";
import Settings from "./screens/Settings";

const Stack = createStackNavigator();

const SettingStack = ({}) => {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="walletSettings" component={WalletManagement} />
    </Stack.Navigator>
  );
};

export default SettingStack;

const styles = StyleSheet.create({});
