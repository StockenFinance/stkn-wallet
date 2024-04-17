import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import KeyIcon from "../../SvgIcon/KeyIcon";
import RecoveryPhraseIcon from "../../SvgIcon/RecoveryPhraseIcon";
import RemoveIcon from "../../SvgIcon/RemoveIcon";
import RecoveryPhraseModal from "../../components/RecoveryPhraseModal";

const WalletList = ({ wallet, walletNumber }) => {
  const [status, setStatus] = useState(false);

  const shortenEthereumAddress = (address) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

  const mnemonic = wallet?.mnemonic?.phrase;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Wallet {walletNumber}</Text>
        <Text style={styles.addressText}>
          {shortenEthereumAddress(wallet?.address)}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => setStatus(true)}>
          <View style={styles.swapImageContainer}>
            <RecoveryPhraseIcon />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.swapImageContainer}>
            <KeyIcon />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.removeIcon}>
            <RemoveIcon />
          </View>
        </TouchableOpacity>
      </View>
      {status && (
        <RecoveryPhraseModal setStatus={setStatus} mnemonic={mnemonic} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderColor: "#808BA0",
    borderWidth: 1,
    borderRadius: 10,
    margin: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#253452",
  },
  addressText: {
    fontSize: 14,
    fontWeight: "semibold",
    marginTop: 5,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 95,
    marginTop: 5,
  },
  swapImageContainer: {
    width: 35,
    height: 35,
    borderRadius: 10,
    backgroundColor: "#F2A13F",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "3.5%",
    marginLeft: "5%",
  },
  removeIcon: {
    width: 35,
    height: 35,
    borderRadius: 10,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "5%",
    marginLeft: "5%",
  },
});

export default WalletList;
