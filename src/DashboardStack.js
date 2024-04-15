import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import SendScreen from "./screens/SendScreen/SendScreen";

const Stack = createStackNavigator();

const DashboardStack = () => {
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
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SendScreen"
        component={SendScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default DashboardStack;

const styles = StyleSheet.create({});
