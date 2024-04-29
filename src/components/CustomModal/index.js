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
import EnglishTranslation from "../englishTranslation";
import ArabicTranslation from "../arabicTranslations";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { styles } from "./styles";

const CustomModal = ({ isVisible, onClose, walletAddress }) => {
  const { t, i18n } = useTranslation();

  const [toggleLanguage, setToggleLanguage] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

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
        // console.log("Retrieved language:", language);
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

  useEffect(() => {
    // Retrieve the selected language from AsyncStorage on component mount
    AsyncStorage.getItem("selectedLanguage").then((language) => {
      if (language) {
        setSelectedLanguage(language);
        i18n.changeLanguage(language);
      }
    });
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
          <Text style={styles.copyAddressText}>{t("copyAddress")}</Text>
        </TouchableOpacity>
        <View style={styles.modalSeparator} />

        <TouchableOpacity onPress={() => console.log("Turn off notification")}>
          <Text style={styles.copyAddressText}>
            {t("turnOffNotifications")}
          </Text>
        </TouchableOpacity>
        <View style={styles.modalSeparator} />

        <TouchableOpacity onPress={() => console.log("Customize")}>
          <Text style={styles.copyAddressText}>{t("customize")}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CustomModal;
