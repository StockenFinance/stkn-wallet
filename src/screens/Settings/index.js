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

const Settings = () => {
  const [toggleLanguage, setToggleLanguage] = useState(null);

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Image
          source={require("../../assets/images/backIcon.png")}
          style={styles.backIcon}
        /> */}
        <Text style={styles.walletText}>
          {toggleLanguage
            ? EnglishTranslation.settings
            : ArabicTranslation.settings}
        </Text>
      </View>
      <View style={styles.createWalletView}>
        <View style={styles.swapImageContainer}>
          <WalletIcon color={"white"} />
        </View>
        <View style={styles.divider}></View>
        <Text style={styles.createWalletText}>
          {toggleLanguage
            ? EnglishTranslation.walletManagement
            : ArabicTranslation.walletManagement}
        </Text>
        {/* <Image
          source={require("../../assets/images/forward.png")}
          style={styles.forwardIcon}
        /> */}
      </View>
      <View style={[styles.createWalletView, { marginTop: "2%" }]}>
        <View style={styles.swapImageContainer}>
          <Text style={styles.dollarText}>$</Text>
        </View>
        <View style={styles.divider}></View>
        <Text style={styles.createWalletText}>
          {" "}
          {toggleLanguage
            ? EnglishTranslation.setCurrency
            : ArabicTranslation.setCurrency}
        </Text>
        {/* <Text style={styles.currencyText}>USD</Text> */}
      </View>
      <View style={[styles.createWalletView, { marginTop: "2%" }]}>
        <View style={styles.swapImageContainer}>
          <LanguageIcon style={styles.languageImage} />
        </View>
        <View style={styles.divider}></View>
        <Text style={styles.createWalletText}>
          {" "}
          {toggleLanguage
            ? EnglishTranslation.language
            : ArabicTranslation.language}
        </Text>
        {/* <Text style={[styles.currencyText, { marginLeft: "38%" }]}>EN</Text> */}
      </View>
      <View style={[styles.createWalletView, { marginTop: "2%" }]}>
        <View style={styles.swapImageContainer}>
          <WalletConnectIcon style={styles.image} />
        </View>
        <View style={styles.divider}></View>
        <Text style={styles.createWalletText}>
          {" "}
          {toggleLanguage
            ? EnglishTranslation.walletConnect
            : ArabicTranslation.walletConnect}
        </Text>
        {/* <Image
          source={require("../../assets/images/forward.png")}
          style={[styles.forwardIcon, { marginLeft: "13%" }]}
        /> */}
      </View>
      <View style={[styles.createWalletView, { marginTop: "2%" }]}>
        <View style={styles.swapImageContainer}>
          <CustomTokenIcon />
        </View>
        <View style={styles.divider}></View>
        <Text style={styles.createWalletText}>
          {" "}
          {toggleLanguage
            ? EnglishTranslation.customTokens
            : ArabicTranslation.customTokens}
        </Text>
        {/* <Image
          source={require("../../assets/images/forward.png")}
          style={[styles.forwardIcon, { marginLeft: "11%" }]}
        /> */}
      </View>
      <View style={[styles.createWalletView, { marginTop: "2%" }]}>
        <View style={styles.swapImageContainer}>
          <LockIcon />
        </View>
        <View style={styles.divider}></View>
        <Text style={styles.createWalletText}>
          {toggleLanguage
            ? EnglishTranslation.passcode
            : ArabicTranslation.passcode}
        </Text>
        {/* <Image
          source={require("../../assets/images/forward.png")}
          style={[styles.forwardIcon, { marginLeft: "1%" }]}
        /> */}
      </View>
      <View style={[styles.createWalletView, { marginTop: "2%" }]}>
        <View style={styles.swapImageContainer}>
          <RecoveryPhraseIcon />
        </View>
        <View style={styles.divider}></View>
        <Text style={styles.createWalletText}>
          {" "}
          {toggleLanguage
            ? EnglishTranslation.viewPhrase
            : ArabicTranslation.viewPhrase}
        </Text>
        {/* <Image
          source={require("../../assets/images/forward.png")}
          style={[styles.forwardIcon, { marginLeft: "-5%" }]}
        /> */}
      </View>
      <View style={[styles.createWalletView, { marginTop: "2%" }]}>
        <View style={styles.swapImageContainer}>
          <KeyIcon />
        </View>
        <View style={styles.divider}></View>
        <Text style={styles.createWalletText}>
          {" "}
          {toggleLanguage
            ? EnglishTranslation.viewKey
            : ArabicTranslation.viewKey}
        </Text>
        {/* <Image
          source={require("../../assets/images/forward.png")}
          style={[styles.forwardIcon, { marginLeft: "7%" }]}
        /> */}
      </View>
    </View>
  );
};

export default Settings;
