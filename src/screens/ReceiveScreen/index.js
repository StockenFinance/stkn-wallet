import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import BackIcon from "../../SvgIcon/BackIcon";

const ReceiveScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: "5%",
          marginTop: "5%",
        }}
      >
        <TouchableOpacity>
          <BackIcon />
        </TouchableOpacity>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "10%",
            height: 20,
            backgroundColor: "#F19220",
            borderRadius: 5,
            marginTop: "-3%",
          }}
        >
          <Text style={{ color: "#ffffff", fontSize: 12, textAlign: "center" }}>
            47AA
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ReceiveScreen;

const styles = StyleSheet.create({});
