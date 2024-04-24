import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNewWallet, provider } from "../../utils/helper";
import ImportIcon from "../../SvgIcon/ImportIcon";
import CreateIcon from "../../SvgIcon/CreateIcon";
import HomeLogoIcon from "../../SvgIcon/HomeLogoIcon";
import { saveWalletAddress } from "../../redux/actions/walletActions";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { addWalletAtReduxStore } from "../../redux/reducer/allWalletStore";

const storeWalletAddress = async (walletAddress, wallet) => {
  try {
    const shortenedAddress =
      walletAddress.slice(0, 6) + walletAddress.slice(-6);
    await AsyncStorage.setItem("walletAddress", shortenedAddress);
    await AsyncStorage.setItem("walletObject", JSON.stringify(wallet));
  } catch (error) {
    console.error("Error storing wallet address:", error);
  }
};

const storeFullWalletAddress = async (fullWalletAddress) => {
  try {
    await AsyncStorage.setItem("fullWalletAddress", fullWalletAddress);
    console.log(
      "Full wallet address stored on create wallet:",
      fullWalletAddress
    );
  } catch (error) {
    console.error("Error storing full wallet address:", error);
  }
};

const CreateWallet = ({ navigation, route }) => {
  const { t, i18n } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [generatedWalletAddress, setGeneratedWalletAddress] = useState("");
  const [walletStore, setWalletStore] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const dispatch = useDispatch();

  const createWallet = () => {
    setLoading(true);
    const { wallet, mnemonic, encryptedWallet } = createNewWallet();
    const phrase = wallet;

    console.log("Phrase wallet: ", JSON.stringify(phrase, null, 2));
    console.log("Phrase wallet: ", phrase?.privateKey);
    console.log("Wallet: ", JSON.stringify(wallet, null, 2));
    console.log("New Wallet Address:", wallet.address);
    console.log("Private Key:", wallet.privateKey);
    console.log("Generated Mnemonic:", mnemonic);
    // AsyncStorage.setItem("encryptedWallet", encryptedWallet).catch((err) => {
    //   console.log("Error while setting encrypted wallet: ", err);
    // });

    const shortenedAddress =
      wallet.address.slice(0, 6) + wallet.address.slice(-6);
    setGeneratedWalletAddress(shortenedAddress);
    dispatch(saveWalletAddress(shortenedAddress));
    storeFullWalletAddress(wallet.address);

    setWalletStore(wallet);
    dispatch(addWalletAtReduxStore(wallet));

    navigation.navigate("BackupPhrase", {
      mnemonic,
      selectedLanguage: selectedLanguage,
    });
    setLoading(false);
  };

  useEffect(() => {
    storeWalletAddress(generatedWalletAddress, walletStore);
    storeFullWalletAddress(walletStore.address);
  }, [generatedWalletAddress, walletStore]);

  useEffect(() => {
    // Retrieve the selected language from AsyncStorage on component mount
    AsyncStorage.getItem("selectedLanguage").then((language) => {
      if (language) {
        setSelectedLanguage(language);
        i18n.changeLanguage(language);
      }
    });
  }, []);

  console.log("Check loader:::::", loading);

  return (
    <View style={styles.container}>
      <HomeLogoIcon style={styles.image} />
      <TouchableOpacity
        style={styles.createWalletView}
        onPress={() => {
          setLoading(true);
          setTimeout(() => {
            createWallet();
          }, 100);
        }}
      >
        <CreateIcon style={styles.createWalletImage} />
        <View style={styles.divider}></View>
        <Text style={styles.createWalletText}>{t("createNewWallet")}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.createWalletView, { marginTop: "5%" }]}
        onPress={() =>
          navigation.navigate("ImportWallet", {
            selectedLanguage: selectedLanguage,
          })
        }
      >
        <ImportIcon
          style={[styles.createWalletImage, { marginLeft: "10.9%" }]}
        />
        <View style={styles.divider}></View>
        <View style={{ marginLeft: "3%" }}>
          <Text
            style={[
              styles.createWalletText,
              { left: selectedLanguage === "arabic" ? "-25%" : null },
            ]}
          >
            {t("importWallet")}
          </Text>
          <Text
            style={[
              styles.subText,
              { left: selectedLanguage === "arabic" ? "-12%" : null },
            ]}
          >
            {t("privateKeyText")}
          </Text>
        </View>
      </TouchableOpacity>
      {loading && (
        <ActivityIndicator style={styles.loader} size="large" color="#F19220" />
      )}
    </View>
  );
};

export default CreateWallet;
