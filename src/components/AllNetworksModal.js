import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";

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
          <Text style={{ color: "#253452", fontSize: 12, fontWeight: "400" }}>
            Bitcoin
          </Text>
        </TouchableOpacity>
        <View style={styles.modalSeparator} />

        <TouchableOpacity onPress={() => console.log("Turn off notification")}>
          <Text style={{ color: "#253452", fontSize: 12, fontWeight: "400" }}>
            Ethereum
          </Text>
        </TouchableOpacity>
        <View style={styles.modalSeparator} />

        <TouchableOpacity onPress={() => console.log("Customize")}>
          <Text style={{ color: "#253452", fontSize: 12, fontWeight: "400" }}>
            Polygon
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default AllNetworksModal;
const styles = StyleSheet.create({
  modalContent: {
    width: 160,
    height: "auto",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 6,
    alignSelf: "center",
    position: "absolute",
    top: 103,
    left: 18,
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
});
