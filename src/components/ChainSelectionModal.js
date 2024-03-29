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

const ChainSelectionModal = ({
  isVisible,
  onClose,
  selectedChain,
  value,
  onSelect,
}) => {
  const handleChainSelect = (chain) => {
    onSelect(chain);
    onClose();
  };
  const chains = [
    { id: 1, name: "Bitcoin" },
    { id: 2, name: "Ethereum" },
    { id: 3, name: "Polygon" },
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
            <TouchableOpacity onPress={() => handleChainSelect(item.name)}>
              <Text style={styles.chainText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.modalSeparator} />}
        />
      </View>
      {selectedChain && (
        <Text style={styles.selectedText}>Selected Chain: {value}</Text>
      )}
    </Modal>
  );
};

export default ChainSelectionModal;
const styles = StyleSheet.create({
  modalContent: {
    width: 160,
    height: 110,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 6,
    alignSelf: "center",
    position: "absolute",
    top: "8%",
    left: 30,
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
    fontSize: 14,
    fontWeight: "600",
  },
  selectedText: {
    alignSelf: "center",
    marginTop: 10,
    color: "#253452",
    fontSize: 16,
    fontWeight: "bold",
  },
});
