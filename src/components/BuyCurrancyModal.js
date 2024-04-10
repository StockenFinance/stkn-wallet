import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Modal from "react-native-modal";

const BuyCurrancyModal = ({
  isVisible,
  onClose,
  value,
  onSelect,
  data: fiatCurrencies,
  top: height,
}) => {
  const handleChainSelect = (currency) => {
    onSelect(currency);
    onClose();
  };

  return (
    <Modal
      animationType="none"
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropOpacity={0}
      style={[styles.modalContainer, { top: height }]}
      isVisible={isVisible}
      onBackdropPress={onClose}
    >
      <View style={styles.modalContent}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={[...fiatCurrencies]}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleChainSelect(item.code)}>
              <Text style={[styles.chainText, { textTransform: "uppercase" }]}>
                {item.code}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.modalSeparator} />}
        />
      </View>
      {/* {<Text style={styles.selectedText}>{value}</Text>} */}
    </Modal>
  );
};

export default BuyCurrancyModal;

const styles = StyleSheet.create({
  modalContent: {
    width: "60%",
    height: "20%",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    alignSelf: "center",
    position: "absolute",
    top: "28%",
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
