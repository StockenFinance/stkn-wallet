import { StyleSheet, Text, View } from "react-native";
import React from "react";

const EmptyList = ({ index = 0 }) => {
  return (
    <View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No currency items available{index}</Text>
      </View>
    </View>
  );
};

export default EmptyList;

const styles = StyleSheet.create({});
