import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Welcome from "./screens/Welcome/index";
import CreateWallet from "./screens/CreateWallet/index";
import BackupPhrase from "./screens/BackupPhrase/index";
import ImportWallet from "./screens/ImportWallet/index";
import ConfirmBackupPhrase from "./screens/ConfirmBackupPhrase/index";
import RecoveryPhraseConfirmation from "./screens/RecoveryPhraseConfirmation/index";
import Dashboard from "./screens/Dashboard";
import BottomNavigator from "./TabNavigator";
import CurrencyDetailsCard from "./components/CurrencyDetailsCard";
import SwapScreen from "./screens/SendScreen/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import SendScreen from "./screens/SendScreen";
import ChartScreen from "./screens/ChartScreen/index";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const walletAddressFromApp = useSelector(
    (state) => state.wallet.walletAddress
  );

  console.log("wal", walletAddressFromApp);

  const asyncWrap = useCallback(async () => {
    console.log("works from appendis and crossober");
    const value = await AsyncStorage.getItem("fullWalletAddress");
    console.log("value from wrappppperrrr--------------", value);
  }, []);

  useEffect(() => {
    asyncWrap(); // you can't make async calls directly in useEffect
  }, []); // <-- empty [] is very important!

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
