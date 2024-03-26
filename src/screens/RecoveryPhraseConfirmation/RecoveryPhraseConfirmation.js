import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const RecoveryPhraseConfirmation = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageTextContainer}>
        <Image
          source={require("../../assets/images/confirmationImage.png")}
          style={styles.image}
        />
        <Text style={styles.welcomeText}>
          You are ready to safely manage your crypto!
        </Text>
      </View>
      <TouchableOpacity
        style={styles.getStartedContainer}
        onPress={() => navigation.navigate("Dashboard")}
      >
        <Text style={styles.getStartedText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RecoveryPhraseConfirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  imageTextContainer: {
    alignItems: "center",
  },
  image: {
    width: "41%",
    height: "37%",
    marginTop: "31%",
  },
  welcomeText: {
    color: "black",
    fontSize: 21,
    fontWeight: "700",
    marginTop: "7%",
    textAlign: "center",
    width: "89%",
  },
  getStartedContainer: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "25%",
    width: 307,
    marginLeft: "-3%",
    height: 49,
    borderRadius: 10,
    backgroundColor: "#F19220",
  },
  getStartedText: {
    fontSize: 21,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
  },
});
