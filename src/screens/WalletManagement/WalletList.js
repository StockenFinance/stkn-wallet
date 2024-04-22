import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import KeyIcon from "../../SvgIcon/KeyIcon";
import RecoveryPhraseIcon from "../../SvgIcon/RecoveryPhraseIcon";
import RemoveIcon from "../../SvgIcon/RemoveIcon";
import RecoveryPhraseModal from "../../components/RecoveryPhraseModal";
import PublicKeyModal from "../../components/PublicKeyModal";
import { useDispatch } from "react-redux";
import { setModal } from "../../redux/features/CounterSlice";
import DeleteWalletModal from "../../components/DeleteWalletModal";

const WalletList = ({ wallet, walletNumber }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(false);
  const [publicKeyModalStatus, setPublicKeyModalStatus] = useState(false);
  const [deleteWalletModalStatus, setDeleteWalletModalStatus] = useState(false);

  const shortenEthereumAddress = (address) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

  const mnemonic = wallet?.mnemonic?.phrase;

  const publicKey = wallet?.publicKey;

  const recoveryPharseHandlers = () => {
    dispatch(setModal(true));
    setStatus(true);
  };

  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>Wallet {walletNumber}</Text>
          <Text style={styles.addressText}>
            {shortenEthereumAddress(wallet?.address)}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={recoveryPharseHandlers}>
            <View style={styles.swapImageContainer}>
              <RecoveryPhraseIcon />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dispatch(setModal(true));
              setPublicKeyModalStatus(true);
            }}
          >
            <View style={styles.swapImageContainer}>
              <KeyIcon />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dispatch(setModal(true));
              setDeleteWalletModalStatus(true);
            }}
          >
            <View style={styles.removeIcon}>
              <RemoveIcon />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {status && (
        <RecoveryPhraseModal setStatus={setStatus} mnemonic={mnemonic} />
      )}
      {publicKeyModalStatus && (
        <PublicKeyModal
          setStatus={setPublicKeyModalStatus}
          publicKey={publicKey}
        />
      )}
      {deleteWalletModalStatus && (
        <DeleteWalletModal setStatus={setDeleteWalletModalStatus} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
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
    justifyContent: "space-around",
    marginLeft: "auto",
    marginTop: 5,
    width: 150,
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
