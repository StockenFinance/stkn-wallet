import Clipboard from "@react-native-clipboard/clipboard";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import EnglishTranslation from "./englishTranslation";
import ArabicTranslation from "./arabicTranslations";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomModal = ({ isVisible, onClose, walletAddress }) => {
  const [toggleLanguage, setToggleLanguage] = useState(null);
  const copyToClipboard = async () => {
    try {
      Clipboard.setString(walletAddress);
      Alert.alert("Success", "Your wallet address copied!", [{ text: "OK" }]);
    } catch (error) {
      console.error("Failed to copy text: ", error);
      Alert.alert("Error", "Failed to copy text!", [{ text: "OK" }]);
    }
  };

  const retrieveSelectedLanguage = async () => {
    try {
      const language = await AsyncStorage.getItem("selectedLanguage");
      if (language !== null) {
        console.log("Retrieved language:", language);
        let bool = language === "english" ? true : false;
        setToggleLanguage(bool);
      } else {
        console.log("No language saved in AsyncStorage");
        setToggleLanguage(true);
      }
    } catch (error) {
      console.error("Error retrieving language from AsyncStorage:", error);
    }
  };

  useEffect(() => {
    retrieveSelectedLanguage();
  }, []);

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
        <TouchableOpacity onPress={() => copyToClipboard}>
          <Text style={{ color: "#253452", fontSize: 12, fontWeight: "400" }}>
            {toggleLanguage
              ? EnglishTranslation.addNewWallet
              : ArabicTranslation.addNewWallet}
          </Text>
        </TouchableOpacity>
        <View style={styles.modalSeparator} />

        <TouchableOpacity onPress={() => console.log("Turn off notification")}>
          <Text style={{ color: "#253452", fontSize: 12, fontWeight: "400" }}>
            {toggleLanguage
              ? EnglishTranslation.turnOffNotifications
              : ArabicTranslation.turnOffNotifications}
          </Text>
        </TouchableOpacity>
        <View style={styles.modalSeparator} />

        <TouchableOpacity onPress={() => console.log("Customize")}>
          <Text style={{ color: "#253452", fontSize: 12, fontWeight: "400" }}>
            {toggleLanguage
              ? EnglishTranslation.customize
              : ArabicTranslation.customize}
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
