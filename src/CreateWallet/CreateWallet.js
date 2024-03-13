import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { ethers } from "ethers";

const CreateWallet = ({ navigation }) => {
  const createWallet = () => {
    const wallet = ethers.Wallet.createRandom();
    const mnemonic = wallet.mnemonic.phrase;
    console.log("New Wallet Address:", wallet.address);
    console.log("Private Key:", wallet.privateKey);
    console.log("Generated Mnemonic:", mnemonic);
    navigation.navigate("BackupPhrase", { mnemonic });
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/welcome.png")}
        style={styles.image}
      />
      <TouchableOpacity
        style={styles.createWalletView}
        // onPress={() => navigation.navigate("BackupPhrase")}
        onPress={createWallet}
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
});
