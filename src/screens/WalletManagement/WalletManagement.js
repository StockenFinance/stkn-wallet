import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WalletList from "./WalletList";
import BackIcon from "../../SvgIcon/BackIcon";

const WalletManagement = ({ navigation }) => {
  const [wallets, setWallets] = useState([]);
  useEffect(() => {
    // Function to retrieve wallet data from AsyncStorage
    const retrieveWallets = async () => {
      try {
        const serializedWallets = await AsyncStorage.getItem(`wallets`);
        if (serializedWallets !== null) {
          const parsedWallets = JSON.parse(serializedWallets);
          setWallets(parsedWallets);
        }
      } catch (error) {
        console.error("Error retrieving wallets:", error);
      }
    };
    retrieveWallets();
  }, []);

  return (
    <View style={{ marginTop: 20 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.heading}>My wallets</Text>
      </View>

      <View>
        {wallets?.map((wallet, index) => {
          return (
            <WalletList key={index} wallet={wallet} walletNumber={index + 1} />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 60,
    marginLeft: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 110,
    color: "black",
  },
});

export default WalletManagement;
