import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import CheckBox from "react-native-check-box";
import { styles } from "./styles";
import BackIcon from "../../SvgIcon/BackIcon";
import AlertIcon from "../../SvgIcon/AlertIcon";
import PasteIcon from "../../SvgIcon/PasteIcon";
import ScreenshotModal from "../../components/ScreenshotModal/index";
import Clipboard from "@react-native-clipboard/clipboard";
import { addScreenshotListener } from "react-native-detector";
import EnglishTranslation from "../../components/englishTranslation";
import ArabicTranslation from "../../components/arabicTranslations";
import { Utils } from "../../utils/LocalStorage";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BackupPhrase = ({ navigation, route }) => {
  const { t, i18n } = useTranslation();

  const { mnemonic } = route.params;
  const mnemonicWords = mnemonic.split(" ");
  const [isChecked, setIsChecked] = useState(false);
  const [randomIndexes, setRandomIndexes] = useState([]);
  const [toggleLanguage, setToggleLanguage] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  selectedLanguage === "arabic" ? ArabicTranslation : EnglishTranslation;

  const [status, setStatus] = useState(false);

  useEffect(() => {
    const userDidScreenshot = () => {
      console.log("User took screenshot");
    };
    const unsubscribe = addScreenshotListener(userDidScreenshot);
    // return () => {
    //   unsubscribe();
    // };
  }, []);

  const requestPermission = async () => {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: "Get Read External Storage Access",
        message: "get read external storage access for detecting screenshots",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
  };
  useEffect(() => {
    requestPermission();
  }, []);

  const copyToClipboard = async () => {
    try {
      Clipboard.setString(mnemonic);
      Alert.alert("Success", "Your recovery phrase copied to clipboard!", [
        { text: "OK" },
      ]);
    } catch (error) {
      console.error("Failed to copy text: ", error);
      Alert.alert("Error", "Failed to copy text!", [{ text: "OK" }]);
    }
  };

  const getRandomIndexes = () => {
    const allIndexes = Array.from(
      { length: mnemonicWords.length },
      (_, i) => i
    );
    const shuffledIndexes = allIndexes.sort(() => Math.random() - 0.5);
    setRandomIndexes(shuffledIndexes.slice(0, 4));
  };

  // Call getRandomIndexes when the component mounts to generate random indexes

  useEffect(() => {
    getRandomIndexes();
  }, []);

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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon style={styles.backIcon} />
        </TouchableOpacity>
        <Text
          style={[
            styles.walletText,
            { left: selectedLanguage === "arabic" ? "35%" : null },
          ]}
        >
          {t("backupPhrase")}
        </Text>
      </View>
      <View style={styles.recoveryPharseTextContainer}>
        <Text style={styles.recoveryPhraseText}>
          {t("yourRecoveryPhraseText")}
        </Text>

        <Text
          style={[
            styles.subText,
            { width: selectedLanguage === "arabic" ? "105%" : null },
          ]}
        >
          {t("secutiryMessageText")}
        </Text>
      </View>
      <View style={styles.securityMessageContainer}>
        <AlertIcon style={styles.alertImage} />
        <Text style={styles.securityText}>{t("warningText")}</Text>
      </View>
      <View style={styles.securityPhraseContainer}>
        <View style={styles.securityPhraseTextContainer}>
          <View>
            {mnemonicWords.slice(0, 6).map((word, index) => (
              <View style={styles.namesTextContainer} key={index}>
                <Text style={styles.countingText}>{index + 1}</Text>
                <Text style={styles.namesText}>{word}</Text>
              </View>
            ))}
          </View>
          <View>
            {mnemonicWords.slice(6).map((word, index) => (
              <View style={styles.namesTextContainer} key={index}>
                <Text style={styles.countingText}>{index + 7}</Text>
                <Text style={styles.namesText}>{word}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.copyIcon}>
        <TouchableOpacity onPress={copyToClipboard}>
          <PasteIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.termsConsentContainer}>
        <CheckBox
          isChecked={isChecked}
          onClick={() => setIsChecked(!isChecked)}
          checkedCheckBoxColor="#F19220"
          style={[
            styles.checkBox,
            { width: selectedLanguage === "arabic" ? "15%" : null },
          ]}
        />
        <Text
          style={[
            styles.consentText,
            { right: selectedLanguage === "arabic" ? "105%" : null },
          ]}
        >
          {t("consentText")}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ConfirmBackupPhrase", {
            mnemonicWords,
            randomIndexes,
            selectedLanguage: selectedLanguage,
          })
        }
        style={[
          styles.importButton,
          isChecked ? styles.importButtonEnabled : styles.importButtonDisabled,
        ]}
        disabled={!isChecked}
      >
        <Text
          style={[
            styles.importText,
            isChecked ? styles.importTextEnabled : styles.importTextDisabled,
          ]}
        >
          {t("continueText")}
        </Text>
      </TouchableOpacity>
      {status && <ScreenshotModal setStatus={setStatus} />}
    </View>
  );
};

export default BackupPhrase;
