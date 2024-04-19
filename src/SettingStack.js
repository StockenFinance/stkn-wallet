import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Settings from "./screens/Settings/Settings";
import WalletManagement from "./screens/WalletManagement/WalletManagement";

const Stack = createStackNavigator();

const SettingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WalletManagement"
        component={WalletManagement}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default SettingStack;

const styles = StyleSheet.create({});
