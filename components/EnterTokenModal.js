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
                onChangeText={onChangeText}
              />
            </View>

            {/* Read-only TextInputs */}
            {/* <View style={styles.readOnlyInputsContainer}>
              <TextInput
                style={styles.readOnlyInput}
                value="Read-only 1"
                editable={false}
              />
              <TextInput
                style={styles.readOnlyInput}
                value="Read-only 2"
                editable={false}
              />
              <TextInput
                style={styles.readOnlyInput}
                value="Read-only 3"
                editable={false}
              />
            </View> */}

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
    height: 380, // Increased height to accommodate read-only inputs
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
    // marginTop: "2%",
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
  // readOnlyInputsContainer: {
  //   marginTop: 10, // Adjust as needed
  // },
  // readOnlyInput: {
  //   width: 150,
  //   height: 45,
  //   borderColor: "#E9E9E9",
  //   borderWidth: 1,
  //   borderRadius: 8,
  //   padding: 10,
  //   color: "black",
  //   marginVertical: "2%",
  // },
  disabledButton: {
    backgroundColor: "#ccc",
  },
});

export default EnterTokenModal;
