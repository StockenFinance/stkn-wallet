import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import { styles } from "./styles";
import Modal from "react-native-modal";

const ChainSelectionModal = ({
  isVisible,
  onClose,
  selectedChain,
  value,
  onSelect,
}) => {
  const { t, i18n } = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleChainSelect = (chain) => {
    onSelect(chain);
    onClose();
  };
  const chains = [
    { id: 1, name: "Bitcoin" },
    { id: 2, name: "Ethereum" },
    { id: 3, name: "Polygon" },
  ];

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
        {/* <TouchableOpacity onPress={() => handleChainSelect(t("bitcoin"))}>
          <Text style={styles.chainText}>{t("bitcoin")}</Text>
        </TouchableOpacity> */}
        {/* <View style={styles.modalSeparator} /> */}
        <TouchableOpacity onPress={() => handleChainSelect(t("polygon"))}>
          <Text style={styles.chainText}>{t("polygon")}</Text>
        </TouchableOpacity>
        <View style={styles.modalSeparator} />

        <TouchableOpacity onPress={() => handleChainSelect(t("ethereum"))}>
          <Text style={styles.chainText}>{t("ethereum")}</Text>
        </TouchableOpacity>
      </View>
      {selectedChain && (
        <Text style={styles.selectedText}>
          {t("selectedChain")} {value}
        </Text>
      )}
    </Modal>
  );
};

export default ChainSelectionModal;
