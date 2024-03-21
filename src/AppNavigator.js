import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Welcome from "./Welcome/Welcome";
import CreateWallet from "./CreateWallet/CreateWallet";
import BackupPhrase from "./BackupPhrase/BackupPhrase";
import ImportWallet from "./ImportWallet/ImportWallet";
import ConfirmBackupPhrase from "./ConfirmBackupPhrase/ConfirmBackupPhrase";
import RecoveryPhraseConfirmation from "./RecoveryPhraseConfirmation/RecoveryPhraseConfirmation";
import Dashboard from "./Dashboard/Dashboard";
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
