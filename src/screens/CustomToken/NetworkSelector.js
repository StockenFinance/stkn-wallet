import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const NetworkSelector = ({ selectedNetwork, onSelectNetwork }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Network:</Text>
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => onSelectNetwork("Mainnet")}
      >
        <Text style={styles.selectText}>Mainnet</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => onSelectNetwork("Testnet")}
      >
        <Text style={styles.selectText}>Testnet</Text>
      </TouchableOpacity>
      {/* Add more network options as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  selectButton: {
    backgroundColor: "#F19220",
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },
  selectText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NetworkSelector;
