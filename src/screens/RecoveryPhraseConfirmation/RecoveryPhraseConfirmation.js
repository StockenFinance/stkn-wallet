import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import { Utils } from "../../utils/LocalStorage";
import ArabicTranslation from "../../components/arabicTranslations";
import EnglishTranslation from "../../components/englishTranslation";

const RecoveryPhraseConfirmation = ({ navigation, route }) => {
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
        <Image
          source={require("../../assets/images/confirmationImage.png")}
          style={styles.image}
        />
        <Text style={styles.welcomeText}>
          {selectedLanguage === "english"
            ? EnglishTranslation.confirmationMessage
            : ArabicTranslation.confirmationMessage}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.getStartedContainer}
        onPress={() => navigation.navigate("Dashboard")}
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
