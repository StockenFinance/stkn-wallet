import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import CheckBox from "react-native-check-box";
import { styles } from "./styles";
import EnglishTranslation from "../../components/englishTranslation";
import ArabicTranslation from "../../components/arabicTranslations";
import { Utils } from "../../utils/LocalStorage";

const BackupPhrase = ({ navigation, route }) => {
  const { selectedLanguage } = route.params;
  const { mnemonic } = route.params;
  const mnemonicWords = mnemonic.split(" ");
  const [isChecked, setIsChecked] = useState(false);
  const [randomIndexes, setRandomIndexes] = useState([]);
  const [toggleLanguage, setToggleLanguage] = useState(true);

  selectedLanguage === "arabic" ? ArabicTranslation : EnglishTranslation;

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
    Utils.getStoreData("changeLanguage").then((res) => {
      setToggleLanguage(res);
    });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../../assets/images/backIcon.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.walletText,
            { left: selectedLanguage === "arabic" ? "35%" : null },
          ]}
        >
          {selectedLanguage === "english"
            ? EnglishTranslation.backupPhrase
            : ArabicTranslation.backupPhrase}
        </Text>
      </View>
      <View style={styles.recoveryPharseTextContainer}>
        <Text style={styles.recoveryPhraseText}>
          {""}
          {selectedLanguage === "english"
            ? EnglishTranslation.yourRecoveryPhraseText
            : ArabicTranslation.yourRecoveryPhraseText}
        </Text>

        <Text
          style={[
            styles.subText,
            { width: selectedLanguage === "arabic" ? "105%" : null },
          ]}
        >
          {selectedLanguage === "english"
            ? EnglishTranslation.secutiryMessageText
            : ArabicTranslation.secutiryMessageText}
        </Text>
      </View>
      <View style={styles.securityMessageContainer}>
        <Image
          source={require("../../assets/images/alert.png")}
          style={styles.alertImage}
        />
        <Text style={styles.securityText}>
          {selectedLanguage === "english"
            ? EnglishTranslation.warningText
            : ArabicTranslation.warningText}
        </Text>
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
          {selectedLanguage === "english"
            ? EnglishTranslation.consentText
            : ArabicTranslation.consentText}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ConfirmBackupPhrase", {
            mnemonicWords,
            randomIndexes,
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
          {selectedLanguage === "english"
            ? EnglishTranslation.continueText
            : ArabicTranslation.continueText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BackupPhrase;
