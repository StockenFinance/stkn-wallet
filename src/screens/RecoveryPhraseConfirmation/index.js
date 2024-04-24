import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import HomeLogoDoneIcon from "../../SvgIcon/HomeLogoDoneIcon";
import { Utils } from "../../utils/LocalStorage";
import ArabicTranslation from "../../components/arabicTranslations";
import EnglishTranslation from "../../components/englishTranslation";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RecoveryPhraseConfirmation = ({ navigation, route }) => {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();

  selectedLanguage === "arabic" ? ArabicTranslation : EnglishTranslation;

  const [toggleLanguage, setToggleLanguage] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  useEffect(() => {
    // Retrieve the selected language from AsyncStorage on component mount
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
        <HomeLogoDoneIcon style={styles.image} />
        <Text style={styles.welcomeText}>{t("confirmationMessage")}</Text>
      </View>
      <TouchableOpacity
        style={styles.getStartedContainer}
        onPress={() =>
          navigation.navigate("Dashboard", {
            selectedLanguage: selectedLanguage,
          })
        }
      >
        <Text style={styles.getStartedText}> {t("done")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RecoveryPhraseConfirmation;
