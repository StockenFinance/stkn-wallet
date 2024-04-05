import Clipboard from "@react-native-clipboard/clipboard";
import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import Modal from "react-native-modal";

const CustomModal = ({ isVisible, onClose, walletAddress }) => {
  const copyToClipboard = async () => {
    try {
      Clipboard.setString(walletAddress);
      Alert.alert("Success", "Your wallet address copied!", [{ text: "OK" }]);
    } catch (error) {
      console.error("Failed to copy text: ", error);
      Alert.alert("Error", "Failed to copy text!", [{ text: "OK" }]);
    }
  };
  return (
    <Modal
      animationType="none"
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropOpacity={0}
      style={styles.modalContainer}
      isVisible={isVisible}
      onBackdropPress={onClose}
    >
      <View style={styles.modalContent}>
        <TouchableOpacity onPress={copyToClipboard}>
          <Text style={{ color: "#253452", fontSize: 10, fontWeight: "400" }}>
            Copy Address
          </Text>
        </TouchableOpacity>
        <View style={styles.modalSeparator} />

        <TouchableOpacity onPress={() => console.log("Turn off notification")}>
          <Text style={{ color: "#253452", fontSize: 10, fontWeight: "400" }}>
            Turn off notifications
          </Text>
        </TouchableOpacity>
        <View style={styles.modalSeparator} />

        <TouchableOpacity onPress={() => console.log("Customize")}>
          <Text style={{ color: "#253452", fontSize: 10, fontWeight: "400" }}>
            Customize
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CustomModal;
const styles = StyleSheet.create({
  modalContent: {
    width: 140,
    height: "auto",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 6,
    alignSelf: "center",
    position: "absolute",
    top: 142,
    right: 60,
  },
  modalSeparator: {
    height: 1,
    backgroundColor: "gray",
    marginVertical: 5,
  },
  modalContainer: {
    justifyContent: "flex-end",
    margin: 0,
  },
});
