import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const Welcome = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageTextContainer}>
        <Image
          source={require("../assets/images/welcome.png")}
          style={styles.image}
        />
        <Text style={styles.welcomeText}> Welcome</Text>
        <Text style={styles.restoreWalletText}>
          You can restore a wallet or create a new one
        </Text>
      </View>
      <View style={styles.languageViewContainer}>
        <Text style={styles.languageText}>Language</Text>
        <View style={[styles.languageButtonContainer, { marginLeft: "-5%" }]}>
          <TouchableOpacity
            onPress={() => handleLanguageChange("English")}
            style={[
              styles.languageButton,
              {
                backgroundColor:
                  selectedLanguage === "English" ? "#F19220" : "#F4F7FA",
              },
            ]}
          >
            <Text
              style={[
                styles.englishText,
                {
                  color: selectedLanguage === "English" ? "#ffffff" : "#000000",
                },
              ]}
            >
              English
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleLanguageChange("Arabic")}
            style={[
              styles.languageButton,
              {
                backgroundColor:
                  selectedLanguage === "Arabic" ? "#F19220" : "#F4F7FA",
              },
            ]}
          >
            <Text
              style={[
                styles.englishText,
                {
                  color: selectedLanguage === "Arabic" ? "#ffffff" : "#000000",
                  fontSize: 21,
                  marginBottom: "5%",
                },
              ]}
            >
              عربي
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.getStartedContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("CreateWallet")}>
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  imageTextContainer: {
    alignItems: "center",
  },
  image: {
    width: "43%",
    marginTop: "31%",
  },
  welcomeText: {
    color: "black",
    fontSize: 21,
    fontWeight: "700",
    marginTop: "7%",
  },
  restoreWalletText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#939393",
    width: "62%",
    textAlign: "center",
    marginTop: "2%",
  },
  languageViewContainer: {
    marginLeft: "10%",
    marginTop: "25%",
  },
  languageText: {
    fontSize: 19,
    fontWeight: "400",
    color: "#000000",
  },
  languageButtonContainer: {
    flexDirection: "row",
    marginTop: "3%",
  },
  languageButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "44%",
    height: "48%",
    backgroundColor: "#F19220",
    borderRadius: 50,
    marginHorizontal: "2%",
  },
  englishText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
  },
  getStartedContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "25%",
    width: "97%",
    marginLeft: "-3%",
    height: 55,
    borderRadius: 50,
    backgroundColor: "#F19220",
  },
  getStartedText: {
    fontSize: 21,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
  },
});
