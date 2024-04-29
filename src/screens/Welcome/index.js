import { Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import HomeLogoIcon from "../../SvgIcon/HomeLogoIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

const Welcome = ({ navigation }) => {
  const { t, i18n } = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const saveSelectedLanguage = async (language) => {
    try {
      await AsyncStorage.setItem("selectedLanguage", language);
    } catch (error) {
      console.error("Error saving selected language to AsyncStorage:", error);
    }
  };

  const toggleLanguage = async () => {
    const newLanguage = selectedLanguage === "en" ? "ar" : "en";
    setSelectedLanguage(newLanguage);
    await saveSelectedLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };
  useEffect(() => {
    AsyncStorage.getItem("selectedLanguage").then((language) => {
      if (language) {
        setSelectedLanguage(language);
        i18n.changeLanguage(language);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageTextContainer}>
        <HomeLogoIcon style={styles.image} />
        <Text style={styles.welcomeText}>{t("welcome")}</Text>
        <Text style={styles.restoreWalletText}>{t("restoreWalletText")}</Text>
      </View>
      <View style={styles.languageViewContainer}>
        <Text style={styles.languageText}>Language</Text>
        <View style={[styles.languageButtonContainer, { marginLeft: "-5%" }]}>
          <TouchableOpacity
            onPress={() => {
              if (selectedLanguage !== "en") {
                i18n.changeLanguage("en");
                toggleLanguage();
              }
            }}
            style={[
              styles.languageButton,
              {
                backgroundColor:
                  selectedLanguage === "en" ? "#F19220" : "#F4F7FA",
              },
            ]}
          >
            <Text
              style={[
                styles.englishText,
                {
                  color: selectedLanguage === "en" ? "#ffffff" : "#000000",
                },
              ]}
            >
              English
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (selectedLanguage !== "ar") {
                i18n.changeLanguage("ar");
                toggleLanguage();
              }
            }}
            style={[
              styles.languageButton,
              {
                backgroundColor:
                  selectedLanguage === "ar" ? "#F19220" : "#F4F7FA",
              },
            ]}
          >
            <Text
              style={[
                styles.englishText,
                {
                  color: selectedLanguage === "ar" ? "#ffffff" : "#000000",
                  fontSize: 21,
                  marginBottom: "5%",
                },
              ]}
            >
              عربي
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("CreateWallet", {
              selectedLanguage: selectedLanguage,
            })
          }
          style={styles.getStartedContainer}
        >
          <Text style={styles.getStartedText}>{t("getStarted")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;
