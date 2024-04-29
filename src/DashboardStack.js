import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Dashboard from "./screens/Dashboard/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import SendScreen from "./screens/SendScreen/index";
import ChartScreen from "./screens/ChartScreen";
import ReceiveScreen from "./screens/ReceiveScreen";

const Stack = createStackNavigator();

const DashboardStack = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const walletAddressFromApp = useSelector(
    (state) => state.wallet.walletAddress
  );

  const asyncWrap = useCallback(async () => {
    const value = await AsyncStorage.getItem("fullWalletAddress");
    // console.log("value from wrappppperrrr--------------", value);
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

        if (storedWalletAddress) {
          setWalletAddress(storedWalletAddress);
        } else {
          // alert("Data not found");
          // console.log("Wallet address not found in AsyncStorage.");
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
      <Stack.Screen
        name="ChartScreen"
        component={ChartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReceiveScreen"
        component={ReceiveScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default DashboardStack;

const styles = StyleSheet.create({});
