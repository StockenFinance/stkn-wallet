import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";

import Modal from "react-native-modal";

const SwapCurrencyModal = ({
  isVisible,
  onClose,
  selectedCurrency,
  value,
  onSelect,
}) => {
  const handleChainSelect = (chain) => {
    onSelect(chain);
    onClose();
  };
  const chains = [
    { id: 1, symbol: "BTC" },
    { id: 2, symbol: "ETH" },
    { id: 3, symbol: "USDT" },
    { id: 4, symbol: "BNB" },
    { id: 5, symbol: "DAI" },
    { id: 6, symbol: "MKR" },
    { id: 7, symbol: "VEN" },
    { id: 8, symbol: "FTM" },
    { id: 9, symbol: "APE" },
  ];
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
          data={chains}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleChainSelect(item.symbol)}>
              <Text style={styles.chainText}>{item.symbol}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
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
    width: "60%",
    height: "27%",
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
    fontSize: 20,
    fontWeight: "900",
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
