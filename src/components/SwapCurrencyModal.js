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
const styles = StyleSheet.create({
  modalContent: {
    width: "55%",
    height: "20%",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    alignSelf: "center",
    position: "absolute",
    top: "22%",
    left: "10%",
    borderWidth: 1,
    borderColor: "#253452",
    overflow: "hidden",
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
  chainText: {
    color: "#253452",
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
    marginVertical: "2%",
    marginRight: "5%",
  },
  selectedText: {
    alignSelf: "center",
    marginTop: 10,
    color: "#253452",
    fontSize: 16,
    fontWeight: "bold",
  },
});
