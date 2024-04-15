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
import { erc20Instance, provider, wallet } from "../utils/helper";
import Erc20Contract from "../contracts/Erc20";

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
            <Text style={{ color: "black", marginBottom: "5%" }}>
              Enter Amount:
            </Text>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              placeholder="Enter amount"
              style={styles.input}
            />
            <Text
              style={{
                color: "black",
                marginTop: "5%",
                marginBottom: "3%",
              }}
            >
              Wallet Address:
            </Text>
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

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "73%",
    height: 275,
    backgroundColor: "white",
    padding: "5%",
    borderRadius: 12,
    alignItems: "center",
    marginTop: "10%",
  },
  HeaderText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#494949",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: "13%",
  },
  doneButton: {
    width: "55%",
    height: 45,
    borderColor: "#ffffff",
    borderWidth: 0.5,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F19220",
    marginTop: "10%",
  },
  doneButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
  },
  TokenInputContainer: {
    marginRight: "35%",
    width: "70%",
    marginTop: "8%",
  },
  input: {
    width: 220,
    height: 50,
    borderColor: "#E9E9E9",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    paddingVertical: 8,
    marginRight: 10,
    color: "black",
  },
  readOnlyInputsContainer: {
    // flexDirection: "row",
    margin: 20,
    // alignSelf: "center",
  },
  readOnlyInput: {
    width: 120,
    height: 45,
    borderColor: "#E9E9E9",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    color: "black",
    marginVertical: "2%",
    marginHorizontal: "2%",
    textAlign: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  copyPasteIcon: {
    position: "absolute",
    marginTop: "30%",
    right: 15,
  },
  copyPasteImage: {
    width: 25,
    height: 25,
  },
});
