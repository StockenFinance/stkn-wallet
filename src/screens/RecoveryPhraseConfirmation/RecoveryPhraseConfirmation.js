import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./styles";

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
