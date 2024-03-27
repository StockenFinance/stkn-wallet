import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { styles } from "./styles";

const Welcome = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageTextContainer}>
        <Image
          source={require("../../assets/images/welcome.png")}
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
