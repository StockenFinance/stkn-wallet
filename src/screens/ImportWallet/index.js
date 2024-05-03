import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import CustomTextInput from "../../components//CustomText/index";
import { TouchableOpacity } from "react-native-gesture-handler";
import Clipboard from "@react-native-clipboard/clipboard";
import { ethers } from "ethers";
import "react-native-get-random-values";
import { styles } from "./styles";
import ScanIcon from "../../SvgIcon/ScanIcon";
import BackIcon from "../../SvgIcon/BackIcon";
import PasteIcon from "../../SvgIcon/PasteIcon";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { addWalletAtReduxStore } from "../../redux/reducer/allWalletStore";
import { addWalletCard } from "../../redux/reducer/walletCardSlice";

const ImportWallet = ({ navigation, route }) => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const index = route?.params?.index;

  const dispatch = useDispatch();

  const handleChangeText = (newText) => {
    setText(newText);
    setErrorMessage("");
  };
  const storePrivateKey = async (privateKey, index) => {
    try {
      // await AsyncStorage.setItem("privateKey", privateKey);
      console.log("index---- from add wallet", index);
      let privateKeys = await AsyncStorage.getItem("privateKeys");
      privateKeys = privateKeys ? JSON.parse(privateKeys) : [];
      console.log("privateKeys", privateKeys);

      privateKeys[index] = privateKey;
      await AsyncStorage.setItem("privateKeys", JSON.stringify(privateKeys));
      console.log("Private key stored on create wallet:", privateKey);
    } catch (error) {
      console.error("Error storing private key:", error);
    }
  };

  const handleOnImport = async () => {
    const isMnemonic = text.split(" ").length > 1;

    let wallet;

    if (isMnemonic) {
      try {
        wallet = ethers.HDNodeWallet.fromMnemonic(
          ethers.Mnemonic.fromPhrase(text)
        );
        console.log("wallet if Mneomnic", wallet);

        securityKey = wallet.mnemonic.phrase;
        backupPhrase = text;
        storePrivateKey(wallet.privateKey, index);
      } catch (error) {
        setErrorMessage("Invalid recovery phrase");
        setLoading(false);
        return;
      }
    } else {
      try {
        wallet = new ethers.Wallet(text);
        console.log("wallet if phrase", wallet);

        storePrivateKey(wallet.privateKey, index);
      } catch (error) {
        setErrorMessage("Invalid private key");
        setLoading(false);
        return;
      }
    }

    console.log("check import::::", wallet);

    const walletAddressExists = await AsyncStorage.getItem("fullWalletAddress");
    if (walletAddressExists === wallet.address) {
      setErrorMessage("This wallet is already imported.");
      setLoading(false);
      return;
    }

    // dispatch(addWalletAtReduxStore(wallet));

    if (wallet) {
      await AsyncStorage.setItem("fullWalletAddress", wallet.address);

      navigation.navigate("RecoveryPhraseConfirmation", {
        selectedLanguage: selectedLanguage,
        walletData: wallet,
      });
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
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
          <TouchableOpacity
            style={[
              styles.copyPasteIcon,
              { marginTop: errorMessage ? "54%" : "64%" },
            ]}
            onPress={handlePaste}
          >
            <PasteIcon style={styles.copyPasteImage} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.importButton, importButtonStyle]}
        onPress={
          importButtonStyle === styles.importButtonActive
            ? () => {
                setLoading(true);
                setTimeout(() => {
                  handleOnImport();
                }, 100);
              }
            : null
        }
        disabled={importButtonStyle !== styles.importButtonActive}
      >
        <Text style={[styles.importText, importButtonStyle]}>
          {t("import")}
        </Text>
      </TouchableOpacity>
      {loading && (
        <ActivityIndicator style={styles.loader} size="large" color="#F19220" />
      )}
    </View>
  );
};

export default ImportWallet;
