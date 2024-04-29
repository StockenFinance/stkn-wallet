import { StyleSheet, Text, View } from "react-native";
import { React } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Welcome from "./screens/Welcome/index";
import CreateWallet from "./screens/CreateWallet/index";
import BackupPhrase from "./screens/BackupPhrase/index";
import ImportWallet from "./screens/ImportWallet/index";
import ConfirmBackupPhrase from "./screens/ConfirmBackupPhrase/index";
import RecoveryPhraseConfirmation from "./screens/RecoveryPhraseConfirmation/index";
import BottomNavigator from "./TabNavigator";
import CurrencyDetailsCard from "./components/CurrencyDetailsCard";
import SwapScreen from "./screens/SendScreen/index";
import { useSelector } from "react-redux";
import WalletManagement from "./screens/WalletManagement/WalletManagement";
import SendScreen from "./screens/SendScreen";
import ChartScreen from "./screens/ChartScreen/index";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const isNavigationEnabled = useSelector((state) => state.navigation);
  const initialRouteName = isNavigationEnabled ? "Dashboard" : "Welcome";

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
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
          name="CurrencyDetailsCard"
          component={CurrencyDetailsCard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SwapScreen"
          component={SwapScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SendScreen"
          component={SendScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChartScreen"
          component={ChartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={BottomNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WalletManagement"
          component={WalletManagement}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
