import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Welcome from "./screens/Welcome/Welcome";
import CreateWallet from "./screens/CreateWallet/CreateWallet";
import BackupPhrase from "./screens/BackupPhrase/BackupPhrase";
import ImportWallet from "./screens/ImportWallet/ImportWallet";
import ConfirmBackupPhrase from "./screens/ConfirmBackupPhrase/ConfirmBackupPhrase";
import RecoveryPhraseConfirmation from "./screens/RecoveryPhraseConfirmation/RecoveryPhraseConfirmation";
import Dashboard from "./screens/Dashboard/Dashboard";
import BottomNavigator from "./TabNavigator";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateWallet"
          component={CreateWallet}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BackupPhrase"
          component={BackupPhrase}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ImportWallet"
          component={ImportWallet}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ConfirmBackupPhrase"
          component={ConfirmBackupPhrase}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RecoveryPhraseConfirmation"
          component={RecoveryPhraseConfirmation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={BottomNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
