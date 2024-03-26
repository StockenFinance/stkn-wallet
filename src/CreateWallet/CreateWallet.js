import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { styles } from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storeWalletAddress = async (walletAddress, wallet) => {
  try {
    const shortenedAddress =
      walletAddress.slice(0, 6) + walletAddress.slice(-6);
    await AsyncStorage.setItem("walletAddress", shortenedAddress);
    console.log("wallet address stored:::", walletAddress);
  } catch (error) {
    console.error("Error storing wallet address:", error);
  }
};

const CreateWallet = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [generatedWalletAddress, setGeneratedWalletAddress] = useState("");

  const createWallet = () => {
    setLoading(true);
    const wallet = ethers.Wallet.createRandom();
    const mnemonic = wallet.mnemonic.phrase;
    const phrase = ethers.Wallet.fromPhrase(mnemonic);

    console.log("Phrase wallet: ", JSON.stringify(phrase, null, 2));
    console.log("Phrase wallet: ", phrase?.privateKey);
    console.log("Wallet: ", JSON.stringify(wallet, null, 2));
    console.log("New Wallet Address:", wallet.address);
    console.log("Private Key:", wallet.privateKey);
    console.log("Generated Mnemonic:", mnemonic);
    const shortenedAddress =
      wallet.address.slice(0, 6) + wallet.address.slice(-6);
    setGeneratedWalletAddress(shortenedAddress);
    setTimeout(() => {
      navigation.navigate("BackupPhrase", { mnemonic });
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    storeWalletAddress(generatedWalletAddress);
  }, [generatedWalletAddress]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/welcome.png")}
        style={styles.image}
      />
      <TouchableOpacity style={styles.createWalletView} onPress={createWallet}>
        <Image
          source={require("../assets/images/createWallet.png")}
          style={styles.createWalletImage}
        />
        <View style={styles.divider}></View>
        <Text style={styles.createWalletText}>Create New Wallet</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.createWalletView, { marginTop: "5%" }]}
        onPress={() => navigation.navigate("ImportWallet")}
      >
        <Image
          source={require("../assets/images/importWallet.png")}
          style={styles.createWalletImage}
        />
        <View style={styles.divider}></View>
        <View style={{ marginLeft: "5%" }}>
          <Text style={styles.createWalletText}>Import Wallet</Text>
          <Text style={styles.subText}>Private key or recovery phrase</Text>
        </View>
      </TouchableOpacity>
      {loading && (
        <ActivityIndicator style={styles.loader} size="large" color="#F19220" />
      )}
    </View>
  );
};

export default CreateWallet;
