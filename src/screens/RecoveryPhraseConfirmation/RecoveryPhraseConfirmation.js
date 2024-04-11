import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import HomeLogoDoneIcon from "../../SvgIcon/HomeLogoDoneIcon";
import { Utils } from "../../utils/LocalStorage";
import ArabicTranslation from "../../components/arabicTranslations";
import EnglishTranslation from "../../components/englishTranslation";
import { useDispatch } from "react-redux";

const RecoveryPhraseConfirmation = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { selectedLanguage } = route.params;
  selectedLanguage === "arabic" ? ArabicTranslation : EnglishTranslation;

  const [toggleLanguage, setToggleLanguage] = useState(true);

  useEffect(() => {
    Utils.getStoreData("changeLanguage").then((res) => {
      setToggleLanguage(res);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageTextContainer}>
        <HomeLogoDoneIcon style={styles.image} />
        <Text style={styles.welcomeText}>
          {selectedLanguage === "english"
            ? EnglishTranslation.confirmationMessage
            : ArabicTranslation.confirmationMessage}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.getStartedContainer}
        onPress={() =>
          navigation.navigate("Dashboard", {
            selectedLanguage: selectedLanguage,
          })
        }
      >
        <Text style={styles.getStartedText}>
          {" "}
          {selectedLanguage === "english"
            ? EnglishTranslation.done
            : ArabicTranslation.done}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RecoveryPhraseConfirmation;
