import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import CustomTextInput from "../../components//CustomText/index";
import { TouchableOpacity } from "react-native-gesture-handler";
import Clipboard from "@react-native-clipboard/clipboard";
// import DocumentScanner from "react-native-document-scanner";
import { ethers } from "ethers";
import "react-native-get-random-values";
import { styles } from "./styles";
import ScanIcon from "../../SvgIcon/ScanIcon";
import BackIcon from "../../SvgIcon/BackIcon";
import PasteIcon from "../../SvgIcon/PasteIcon";
import { Utils } from "../../utils/LocalStorage";
import ArabicTranslation from "../../components/arabicTranslations";
import EnglishTranslation from "../../components/englishTranslation";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ImportWallet = ({ navigation, route }) => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const [text, setText] = useState("");
  const handleChangeText = (newText) => {
    setText(newText);
  };

  const handleOnImport = async () => {
    const isMnemonic = text.split(" ").length > 1;

    let wallet;

    if (isMnemonic) {
      wallet = ethers.HDNodeWallet.fromMnemonic(
        ethers.Mnemonic.fromPhrase(text)
      );
    } else {
      wallet = new ethers.Wallet(text);
    }

    console.log("check import::::", wallet);
    if (wallet) {
      navigation.navigate("RecoveryPhraseConfirmation"),
        {
          selectedLanguage: selectedLanguage,
        };
      const shortenedAddress =
        wallet.address.slice(0, 6) + wallet.address.slice(-6);

      await AsyncStorage.setItem("fullWalletAddress", wallet.address);
      await AsyncStorage.setItem("walletAddress", shortenedAddress);
      console.log(
        "Shortened wallet address stored in import",
        shortenedAddress
      );
      console.log("Wallet address stored in import", wallet.address);
      navigation.navigate("RecoveryPhraseConfirmation");
    } else {
      console.error("Warning: Recovery phrase does not match");
    }
  };

  const importButtonStyle =
    text.length > 12 ? styles.importButtonActive : styles.importButtonInactive;

  const handlePaste = async () => {
    const clipboardContent = await Clipboard.getString();
    setText(clipboardContent);
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>

        <Text style={styles.walletText}>{t("importWallet")}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("QRScanner")}>
          <ScanIcon style={styles.scanIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <View
          style={{
            width: "85%",
            alignSelf: "center",
            marginBottom: "3%",
          }}
        >
          <Text
            style={[
              styles.inputHeaderText,
              { right: selectedLanguage === "arabic" ? "2%" : null },
            ]}
          >
            {t("privateKeyText")}
          </Text>
        </View>
        <View style={styles.EnterInputContainer}>
          <CustomTextInput
            placeholder={t("privateKeyText")}
            onChangeText={handleChangeText}
            value={text}
          />
          <TouchableOpacity style={styles.copyPasteIcon} onPress={handlePaste}>
            <PasteIcon style={styles.copyPasteImage} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.importButton, importButtonStyle]}
        onPress={
          importButtonStyle === styles.importButtonActive
            ? handleOnImport
            : null
        }
        disabled={importButtonStyle !== styles.importButtonActive}
      >
        <Text style={[styles.importText, importButtonStyle]}>
          {t("import")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImportWallet;
