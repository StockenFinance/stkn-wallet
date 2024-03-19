import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
} from "react-native";

const EnterTokenModal = ({
  isVisible,
  onClose,
  onChangeText,
  value,
  onPress,
}) => {
  const [tokenNumber, setTokenNumber] = useState("");
  const handleOverlayPress = () => {
    setTokenNumber("");
    onClose();
  };

  //   const fetchTokenData = async (tokenAddresses) => {
  //     try {
  //       const response = await fetch(
  //         `https://api.dexscreener.com/latest/dex/tokens/${tokenAddresses}`
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch token data");
  //       }
  //       const data = await response.json();

  //       console.log("API call successfull:", data);
  //     } catch (error) {
  //       console.error("Error fetching token data:", error);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchTokenData("0xf0F161fDA2712DB8b566946122a5af183995e2eD");
  //   }, []);

  //   const handleFetchData = () => {
  //     fetchTokenData("0xf0F161fDA2712DB8b566946122a5af183995e2eD");
  //   };

  const isButtonDisabled = value.trim() === "";
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handleOverlayPress}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.HeaderText}>Enter Token Address</Text>

            <View style={styles.TokenInputContainer}>
              <TextInput
                placeholderTextColor={"#7483A1"}
                style={styles.input}
                placeholder="Enter Token "
                value={value}
                // onChangeText={(text) => setTokenNumber(text)}
                onChangeText={onChangeText}
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.doneButton,
                  isButtonDisabled && styles.disabledButton,
                ]}
                disabled={isButtonDisabled}
                onPress={onPress}
              >
                <Text style={styles.doneButtonText}>Import Token</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "73%",
    height: 240,
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
    marginTop: "5%",
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
    marginTop: "2%",
  },
  doneButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
  },
  TokenInputContainer: {
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
  disabledButton: {
    backgroundColor: "#ccc",
  },
});

export default EnterTokenModal;
