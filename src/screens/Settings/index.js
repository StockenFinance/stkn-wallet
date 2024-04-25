import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
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
import LanguageChangeModal from "../../components/LanguageChangeModal";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setMyTabHide } from "../../redux/reducer/CounterSlice";
import { useRoute } from "@react-navigation/native";

const Settings = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const { t, i18n } = useTranslation();

  const tabhide = useSelector((store) => store.walletRecover.myTabHide);

  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    AsyncStorage.getItem("selectedLanguage").then((language) => {
      if (language) {
        setSelectedLanguage(language);
        i18n.changeLanguage(language);
      }
    });
  }, []);

  const route = useRoute();
  const ScreenName = route.name;

  useEffect(() => {
    if (ScreenName === "Settings") {
      dispatch(setMyTabHide(false));
    }
  }, [ScreenName]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.walletText}>{t("settings")}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          console.log("wallet managemet", navigation);
          navigation.navigate("walletSettings");
        }}
      >
        <View style={styles.createWalletView}>
          <View style={styles.swapImageContainer}>
            <WalletIcon color={"white"} />
          </View>
          <View style={styles.divider}></View>
          <Text style={styles.createWalletText}>{t("walletManagement")}</Text>
          <RightArrowIcon style={styles.forwardIcon} />
        </View>
      </TouchableOpacity>
      <View style={[styles.createWalletView, { marginTop: "2%" }]}>
        <View style={styles.swapImageContainer}>
          <Text style={styles.dollarText}>$</Text>
        </View>
        <View style={styles.divider}></View>
        <Text style={styles.createWalletText}> {t("setCurrency")}</Text>
        <Text style={styles.currencyText}>USD</Text>
      </View>
      <TouchableOpacity onPress={openModal}>
        <View style={[styles.createWalletView, { marginTop: "2%" }]}>
          <View style={styles.swapImageContainer}>
            <LanguageIcon style={styles.languageImage} />
          </View>
          <View style={styles.divider}></View>
          <Text style={styles.createWalletText}> {t("language")}</Text>
          <Text
            style={[
              styles.currencyText,
              { marginLeft: "35%", textTransform: "uppercase" },
              // { marginLeft: selectedLanguage === "ar" ? 200 : null },
            ]}
          >
            {t("en")}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={[styles.createWalletView, { marginTop: "2%" }]}>
        <View style={styles.swapImageContainer}>
          <WalletConnectIcon style={styles.image} />
        </View>
        <View style={styles.divider}></View>
        <Text style={styles.createWalletText}>{t("walletConnect")}</Text>
        <RightArrowIcon style={styles.forwardIcon} />
      </View>
      {/* <TouchableOpacity onPress={() => navigation.navigate("CustomToken")}>
        <View style={[styles.createWalletView, { marginTop: "2%" }]}>
          <View style={styles.swapImageContainer}>
            <CustomTokenIcon />
          </View>
          <View style={styles.divider}></View>
          <Text style={styles.createWalletText}>
            {toggleLanguage
              ? EnglishTranslation.customTokens
              : ArabicTranslation.customTokens}
          </Text>
          <RightArrowIcon style={styles.forwardIcon} />
        </View>
      </TouchableOpacity> */}
      <View style={[styles.createWalletView, { marginTop: "2%" }]}>
        <View style={styles.swapImageContainer}>
          <LockIcon />
        </View>
        <View style={styles.divider}></View>
        <Text style={styles.createWalletText}>{t("passcode")}</Text>
        <Text
          style={{
            marginLeft: 40,
            color: "#B6BDC8",
            fontSize: 17,
            fontWeight: "800",
          }}
        >
          On
        </Text>
        <RightArrowIcon style={styles.forwardIcon} />
      </View>
      {/* <View style={[styles.createWalletView, { marginTop: "2%" }]}>
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
        <RightArrowIcon style={styles.forwardIcon} />
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
        <RightArrowIcon style={styles.forwardIcon} />
      </View> */}
      <LanguageChangeModal isVisible={modalVisible} onClose={closeModal} />
    </View>
  );
};

export default Settings;
