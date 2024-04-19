import { Wallet } from "ethers";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ethers } from "ethers";
import { erc20Instance, provider, wallet } from "../../utils/helper";
import Erc20Contract from "../../contracts/Erc20";
import { styles } from "./styles";

const SendModal = ({ visible, onClose }) => {
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");

  const SendMoney = async () => {
    try {
      if (!amount) {
        console.error("Amount is required.");
        return;
      }

      if ("0xdAC17F958D2ee523a2206206994597C13D831ec7") {
        const erc20Prov = new Erc20Contract(
          "0xdAC17F958D2ee523a2206206994597C13D831ec7",
          wallet
        );

        const amountToSend = ethers.parseUnits(amount, 18);
        console.log("ERC20:::", erc20Prov);
        console.log("check wallet data::::", wallet);

        const tx = await erc20Prov
          .transfer("0xdAC17F958D2ee523a2206206994597C13D831ec7", amountToSend)
          .then((data) => {
            console.log("Txn details on success: ", data);
          })
          .catch((err) => {
            console.error(err);
          });
        console.log("ERC20 Transaction details:", tx);
      } else {
        wallet
          .sendTransaction({
            to: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
            value: ethers.parseUnits(amount, 18),
          })
          .then((data) => {
            console.log("Ether Transaction details:", data);
          })
          .catch((err) => {
            console.error("Error sending Ether transaction:", err);
          });
      }
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  };

  const handleSend = () => {
    console.log("Sending amount:", amount, "Token:", token);
    onClose();
  };
  useEffect(() => {
    if (!visible) {
      setAmount("");
      setToken("");
      //   setWallet(null);
    }
  }, [visible]);

  const isButtonDisabled = amount.trim() === "" || token.trim() === "";

  // Function to handle overlay press (click outside modal)
  const handleOverlayPress = () => {
    onClose(); // Close the modal
  };
  return (
    <Modal visible={visible} transparent>
      <TouchableWithoutFeedback onPress={handleOverlayPress}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.enterAmountText}>Enter Amount:</Text>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              placeholder="Enter amount"
              style={styles.input}
            />
            <Text style={styles.walletAddressText}>Wallet Address:</Text>
            <TextInput
              value={token}
              onChangeText={setToken}
              placeholder="Wallet address"
              style={styles.input}
            />
            <TouchableOpacity
              onPress={SendMoney}
              style={[
                styles.doneButton,
                isButtonDisabled && styles.disabledButton,
              ]}
              disabled={isButtonDisabled}
            >
              <Text style={styles.doneButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SendModal;
