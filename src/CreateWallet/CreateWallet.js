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
import { bitcoin, bip32, bip39, ecc } from "bitcoinjs-lib";

const CreateWallet = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const createWallet = () => {
    setLoading(true);
    const wallet = ethers.Wallet.createRandom();
    const mnemonic = wallet.mnemonic.phrase;
    const phrase = ethers.Wallet.fromPhrase(mnemonic);

    // Generate Bitcoin wallet
    generateMnemonicandBtcWallet(mnemonic);
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

  function generateMnemonicandBtcWallet(mnemonic) {
    try {
      const network = bitcoin?.networks?.bitcoin;
      const path = `m/44'/0'/0'/0'`;
      const seed = bip39?.mnemonicToSeedSync(mnemonic);
      let root = bip32?.fromSeed(seed, network);

      let account = root?.derivePath(path);
      let node = account?.derive(0).derive(0);

      let btcAddress = bitcoin?.payments.p2pkh({
        pubkey: node?.publicKey,
        network: network,
      }).address;

      console.log(`
       Bitcoin Wallet generated:
         - Address  : ${btcAddress},
         - Key : ${node?.toWIF()},
         - Mnemonic : ${mnemonic} 
      `);
    } catch (error) {
      console.error("Error generating Bitcoin wallet:", error);
    }
  }

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  image: {
    width: "43%",
    marginTop: "31%",
    alignSelf: "center",
  },
  createWalletView: {
    flexDirection: "row",
    alignItems: "center",
    width: "88%",
    height: 61,
    marginTop: "70%",
    alignSelf: "center",
    borderRadius: 15,
    backgroundColor: "rgba(213, 223, 235, 1)",
  },
  createWalletImage: {
    alignSelf: "center",
    width: 34,
    height: 34,
    marginLeft: "10%",
    marginHorizontal: "5%",
  },
  createWalletText: {
    fontSize: 18,
    fontWeight: "400",
    color: "#233452",
    marginLeft: "5%",
  },
  subText: {
    color: "#808191",
    fontSize: 10,
    fontWeight: "700",
    marginLeft: "5%",
  },
  divider: {
    height: "70%",
    width: 1,
    backgroundColor: "#000000",
  },
  loader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
});
