import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { ethers } from "ethers";
import { styles } from "./style";

const CreateWallet = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const createWallet = () => {
    console.log("checking loader", loading);

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
    setTimeout(() => {
      navigation.navigate("BackupPhrase", { mnemonic });
      setLoading(false);
    }, 2000);
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/welcome.png")}
        style={styles.image}
      />
      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" color="#F19220" />
      ) : null}
      <TouchableOpacity
        style={styles.createWalletView}
        onPress={() => {
          setLoading((previous) => !previous);
          createWallet();
        }}
      >
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
    </View>
  );
};

export default CreateWallet;
