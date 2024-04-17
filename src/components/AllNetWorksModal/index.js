import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { styles } from "./styles";

const AllNetworksModal = ({ isVisible, onClose }) => {
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
        <TouchableOpacity onPress={() => console.log("Copy address")}>
          <Text style={styles.copyText}>Bitcoin</Text>
        </TouchableOpacity>
        <View style={styles.modalSeparator} />

        <TouchableOpacity onPress={() => console.log("Turn off notification")}>
          <Text style={styles.copyText}>Ethereum</Text>
        </TouchableOpacity>
        <View style={styles.modalSeparator} />

        <TouchableOpacity onPress={() => console.log("Customize")}>
          <Text style={styles.copyText}>Polygon</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default AllNetworksModal;
