import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Modal from "react-native-modal";
import { styles } from "./styles";

const BuyCurrancyModal = ({
  isVisible,
  onClose,
  value,
  onSelect,
  data: fiatCurrencies,
  top: height,
  modalHeight,
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
      style={[styles.modalContainer, { top: height, height: modalHeight }]}
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
    </Modal>
  );
};

export default BuyCurrancyModal;
