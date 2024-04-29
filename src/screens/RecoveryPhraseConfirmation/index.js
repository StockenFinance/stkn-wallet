import { Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import HomeLogoDoneIcon from "../../SvgIcon/HomeLogoDoneIcon";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setNavigationEnabled } from "../../redux/reducer/navigationSlice";
import { addWalletAtReduxStore } from "../../redux/reducer/allWalletStore";
import { addWalletCard } from "../../redux/reducer/walletCardSlice";
const RecoveryPhraseConfirmation = ({ navigation, route }) => {
  const { t, i18n } = useTranslation();
  const { walletData } = route.params;
  console.log("walletdata>>>", walletData);

  const dispatch = useDispatch();

  // selectedLanguage === "arabic" ? ArabicTranslation : EnglishTranslation;

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

  const handleDoneButton = () => {
    if (walletData !== undefined) {
      dispatch(addWalletAtReduxStore(walletData));
      dispatch(
        addWalletCard({
          newWalletAddress: walletData,
          newWalletBalance: "0.00",
        })
      );
      navigation.reset({
        index: 0,
        routes: [{ name: "Dashboard" }],
      });
      dispatch(setNavigationEnabled(true));
    } else {
      alert("Please create wallet first");
      navigation.goBack();
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageTextContainer}>
        <HomeLogoDoneIcon style={styles.image} />
        <Text style={styles.welcomeText}>{t("confirmationMessage")}</Text>
      </View>
      <TouchableOpacity
        style={styles.getStartedContainer}
        onPress={() => {
          handleDoneButton();
        }}
      >
        <Text style={styles.getStartedText}> {t("done")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RecoveryPhraseConfirmation;
