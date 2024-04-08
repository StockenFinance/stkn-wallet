import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
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
import CurrencyDetailsCard from "./components/CurrencyDetailsCard";
import SwapScreen from "./screens/SwapScreen/SwapScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    const fetchWalletAddress = async () => {
      try {
        const storedWalletAddress = await AsyncStorage.getItem(
          "fullWalletAddress"
        );
        // alert("Not getting data");
        console.log(
          "Retrieved wallet address for confirmation:",
          storedWalletAddress
        );
        if (storedWalletAddress) {
          setWalletAddress(storedWalletAddress);
        } else {
          // alert("Data not found");
          console.log("Wallet address not found in AsyncStorage.");
        }
      } catch (error) {
        console.error("Error fetching wallet address:", error);
      }
    };

    fetchWalletAddress();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!walletAddress ? (
          <>
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
              name="Dashboard"
              component={BottomNavigator}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Dashboard"
            component={BottomNavigator}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
