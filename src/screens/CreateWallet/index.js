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
import { Utils } from "../../utils/LocalStorage";
import { addWalletCard } from "../../redux/reducer/walletCardSlice";

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
    // dispatch(
    //   addWalletCard({ newWalletAddress: wallet, newWalletBalance: "0.00" })
    // );

    const shortenedAddress =
      wallet.address.slice(0, 6) + wallet.address.slice(-6);
    setGeneratedWalletAddress(shortenedAddress);
    dispatch(saveWalletAddress(wallet.address));
    storeFullWalletAddress(wallet.address);
    storePrivateKey(wallet.privateKey);
    // dispatch(addWalletAtReduxStore(wallet));
    setWalletStore(wallet);

    // setCardDATAMethod(shortenedAddress);
    navigation.replace("BackupPhrase", {
      walletData: wallet,
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
    AsyncStorage.getItem("selectedLanguage").then((language) => {
      if (language) {
        setSelectedLanguage(language);
        i18n.changeLanguage(language);
      }
    });
  }, []);

  const storePrivateKey = async (privateKey) => {
    try {
      await AsyncStorage.setItem("privateKey", privateKey);
      console.log("Private key stored on create wallet:", privateKey);
    } catch (error) {
      console.error("Error storing private key:", error);
    }
  };

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
