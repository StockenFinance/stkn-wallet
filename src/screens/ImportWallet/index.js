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

  const dispatch = useDispatch();

  const handleChangeText = (newText) => {
    setText(newText);
    setErrorMessage("");
  };

  const handleOnImport = async () => {
    const isMnemonic = text.split(" ").length > 1;

    let wallet;
    let securityKey;
    let backupPhrase;

    if (isMnemonic) {
      try {
        wallet = ethers.HDNodeWallet.fromMnemonic(
          ethers.Mnemonic.fromPhrase(text)
        );
        securityKey = wallet.mnemonic.phrase;
        backupPhrase = text;
      } catch (error) {
        setErrorMessage("Invalid recovery phrase");
        setLoading(false);
        return; // Exit early if there's an error
      }
    } else {
      try {
        wallet = new ethers.Wallet(text);
        securityKey = wallet.privateKey;
        backupPhrase = wallet.mnemonic.phrase;
      } catch (error) {
        setErrorMessage("Invalid private key");
        setLoading(CSSFontFeatureValuesRule);
        return; // Exit early if there's an error
      }
    }

    console.log("check import::::", wallet);

    dispatch(addWalletAtReduxStore(wallet));

    if (wallet) {
      dispatch(
        addWalletCard({ newWalletAddress: wallet, newWalletBalance: "0.00" })
      );

      const shortenedAddress =
        wallet.address.slice(0, 6) + wallet.address.slice(-6);

      await AsyncStorage.setItem("fullWalletAddress", wallet.address);
      await AsyncStorage.setItem("walletAddress", shortenedAddress);
      await AsyncStorage.setItem("securityKey", securityKey);
      await AsyncStorage.setItem("backupPhrase", backupPhrase);
      updateCardData(shortenedAddress);

      console.log(
        "Shortened wallet address stored in import",
        shortenedAddress
      );
      console.log("Wallet address stored in import", wallet.address);
      console.log("Security key stored in import", securityKey);
      console.log("Backup phrase stored in import", backupPhrase);

      navigation.navigate("RecoveryPhraseConfirmation", {
        selectedLanguage: selectedLanguage,
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

  const updateCardData = async (shortenedAddress) => {
    try {
      const existingData = await AsyncStorage.getItem("CARD_DATA");
      console.log(" Existing data CARD_DATA:", existingData);

      // Parse the retrieved string or initialize an empty array
      let dataArray = JSON.parse(existingData) || [];

      console.log("parse card data", dataArray);

      dataArray.push({
        newWalletAddress: shortenedAddress,
        newWalletBalance: "",
      });

      const updatedDataString = JSON.stringify(dataArray);

      await AsyncStorage.setItem("CARD_DATA", updatedDataString);

      console.log("CARD_DATA successfully updated in AsyncStorage");
    } catch (error) {
      console.error("Error updating data: ", error);
    }
  };

  useEffect(() => {
    const fetchWalletAddress = async () => {
      try {
        const walletAddress = await AsyncStorage.getItem("walletAddress");
        console.log("local storage >>>", walletAddress);
        if (walletAddress) {
          setNewAccount((prevAccount) => {
            return [
              {
                ...prevAccount[0],
                newWalletAddress: walletAddress,
              },
              ...prevAccount.slice(1),
            ];
          });
        }
      } catch (error) {
        console.error(
          "Error fetching wallet address from AsyncStorage:",
          error
        );
      }
    };
    fetchWalletAddress();
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
          <TouchableOpacity style={styles.copyPasteIcon} onPress={handlePaste}>
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
