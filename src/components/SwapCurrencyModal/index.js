import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./styles";
import Modal from "react-native-modal";

const SwapCurrencyModal = ({
  isVisible,
  onClose,
  selectedCurrency,
  value,
  onSelect,
  tokens,
}) => {
  const [isChains, setIsChains] = useState([]);

  const handleChainSelect = (isChains) => {
    onSelect(isChains);
    onClose();
  };

  const retrieveTokens = async () => {
    try {
      const serializedTokens = await AsyncStorage.getItem("importedTokens");
      if (serializedTokens !== null) {
        const tokens = JSON.parse(serializedTokens);
        console.log("Tokens retrieved successfully>>>>>>", tokens);
        return tokens;
      } else {
        console.log("No tokens found in storage.");
        return [];
      }
    } catch (error) {
      console.error("Error retrieving tokens:", error);
      return [];
    }
  };

  useEffect(() => {
    retrieveTokens().then((tokens) => {
      if (tokens.length > 0) {
        setIsChains(tokens);
        console.log("checking storage:::", tokens);
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
        <FlatList
          showsVerticalScrollIndicator={false}
          data={isChains}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleChainSelect(item.symbol)}>
              <Text style={styles.chainText}>{item.symbol}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.symbol}
          ItemSeparatorComponent={() => <View style={styles.modalSeparator} />}
        />
      </View>
      {selectedCurrency && (
        <Text style={styles.selectedText}>Selected Chain: {value}</Text>
      )}
    </Modal>
  );
};

export default SwapCurrencyModal;
