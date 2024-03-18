import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";

const CustomModal = ({ isVisible, onClose }) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContent}>
        <TouchableOpacity onPress={() => console.log("Copy address")}>
          <Text style={{ color: "#253452", fontSize: 12, fontWeight: "400" }}>
            Copy address
          </Text>
        </TouchableOpacity>
        <View style={styles.modalSeparator} />

        <TouchableOpacity onPress={() => console.log("Turn off notification")}>
          <Text style={{ color: "#253452", fontSize: 12, fontWeight: "400" }}>
            Turn off notifications
          </Text>
        </TouchableOpacity>
        <View style={styles.modalSeparator} />

        <TouchableOpacity onPress={() => console.log("Customize")}>
          <Text style={{ color: "#253452", fontSize: 12, fontWeight: "400" }}>
            Customize
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CustomModal;
const styles = StyleSheet.create({
  modalContent: {
    width: 160,
    height: 110,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 6,
    alignSelf: "center",
    position: "absolute",
    top: 115,
    right: 60,
  },
  modalSeparator: {
    height: 1,
    backgroundColor: "gray",
    marginVertical: 5,
  },
});
