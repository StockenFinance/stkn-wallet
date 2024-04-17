import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import RightArrowIcon from "../../SvgIcon/RightArrowIcon";
import WalletIcon from "../../SvgIcon/WalletIcon";
import KeyIcon from "../../SvgIcon/KeyIcon";
import WalletConnectIcon from "../../SvgIcon/WalletConnectIcon";
import LanguageIcon from "../../SvgIcon/LanguageIcon";
import LockIcon from "../../SvgIcon/LockIcon";
import RecoveryPhraseIcon from "../../SvgIcon/RecoveryPhraseIcon";
import CustomTokenIcon from "../../SvgIcon/CustomTokenIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EnglishTranslation from "../../components/englishTranslation";
import ArabicTranslation from "../../components/arabicTranslations";
import { useTranslation } from "react-i18next";

const Settings = () => {
  const { t, i18n } = useTranslation();

  const [toggleLanguage, setToggleLanguage] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  useEffect(() => {
    retrieveSelectedLanguage();
  }, []);

  const retrieveSelectedLanguage = async () => {
    try {
      const language = await AsyncStorage.getItem("selectedLanguage");
      if (language !== null) {
        console.log("Retrieved language:", language);
        let bool = language === "english" ? true : false;
        setToggleLanguage(bool);
      } else {
        console.log("No language saved in AsyncStorage");
        setToggleLanguage(true);
      }
    } catch (error) {
      console.error("Error retrieving language from AsyncStorage:", error);
    }
  };
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
      <View style={styles.header}>
        <Text style={styles.walletText}>{t("settings")}</Text>
      </View>
      <View style={styles.createWalletView}>
        <View style={styles.swapImageContainer}>
          <WalletIcon color={"white"} />
        </View>
        <View style={styles.divider}></View>
        <Text style={styles.createWalletText}>{t("walletManagement")}</Text>

        <RightArrowIcon style={styles.forwardIcon} />
      </View>
      <View style={[styles.createWalletView, { marginTop: "2%" }]}>
        <View style={styles.swapImageContainer}>
          <Text style={styles.dollarText}>$</Text>
        </View>
        <View style={styles.divider}></View>
        <Text style={styles.createWalletText}> {t("setCurrency")}</Text>
        <Text style={styles.currencyText}>USD</Text>
      </View>
      <View style={[styles.createWalletView, { marginTop: "2%" }]}>
        <View style={styles.swapImageContainer}>
          <LanguageIcon style={styles.languageImage} />
        </View>
        <View style={styles.divider}></View>
        <Text style={styles.createWalletText}> {t("language")}</Text>
        <Text style={[styles.currencyText, { marginLeft: "40%" }]}>EN</Text>
      </View>
      <View style={[styles.createWalletView, { marginTop: "2%" }]}>
        <View style={styles.swapImageContainer}>
          <WalletConnectIcon style={styles.image} />
        </View>
        <View style={styles.divider}></View>
        <Text style={styles.createWalletText}> {t("walletConnect")}</Text>
        <RightArrowIcon style={styles.forwardIcon} />
      </View>
      <View style={[styles.createWalletView, { marginTop: "2%" }]}>
        <View style={styles.swapImageContainer}>
          <CustomTokenIcon />
        </View>
        <View style={styles.divider}></View>
        <Text style={styles.createWalletText}> {t("customTokens")}</Text>
        <RightArrowIcon style={styles.forwardIcon} />
      </View>
      <View style={[styles.createWalletView, { marginTop: "2%" }]}>
        <View style={styles.swapImageContainer}>
          <LockIcon />
        </View>
        <View style={styles.divider}></View>
        <Text style={styles.createWalletText}>{t("passcode")}</Text>
        <Text
          style={{
            marginLeft: 65,
            color: "#B6BDC8",
            fontSize: 17,
            fontWeight: "800",
          }}
        >
          On
        </Text>
        <RightArrowIcon style={styles.forwardIcon} />
      </View>
      <View style={[styles.createWalletView, { marginTop: "2%" }]}>
        <View style={styles.swapImageContainer}>
          <RecoveryPhraseIcon />
        </View>
        <View style={styles.divider}></View>
        <Text style={styles.createWalletText}> {t("viewPhrase")}</Text>
        <RightArrowIcon style={styles.forwardIcon} />
      </View>
      <View style={[styles.createWalletView, { marginTop: "2%" }]}>
        <View style={styles.swapImageContainer}>
          <KeyIcon />
        </View>
        <View style={styles.divider}></View>
        <Text style={styles.createWalletText}> {t("viewKey")}</Text>
        <RightArrowIcon style={styles.forwardIcon} />
      </View>
    </View>
  );
};

export default Settings;