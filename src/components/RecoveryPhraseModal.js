import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  Dimensions,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import EnglishTranslation from "./englishTranslation";
import ArabicTranslation from "./arabicTranslations";
import AlertIcon from "../SvgIcon/AlertIcon";
import PasteIcon from "../SvgIcon/PasteIcon";
import Clipboard from "@react-native-clipboard/clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height } = Dimensions.get("window");

const RecoveryPhraseModal = ({ setStatus, mnemonic }) => {
  const slide = React.useRef(new Animated.Value(height)).current;

  const slideUp = () => {
    // Will change slide up the bottom sheet
    Animated.timing(slide, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const slideDown = () => {
    // Will slide down the bottom sheet
    Animated.timing(slide, {
      toValue: height,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    slideUp();
  });

  const closeModal = () => {
    slideDown();

    setTimeout(() => {
      setStatus(false);
    }, 0);
  };

  const mnemonicWords = mnemonic.split(" ");
  const [toggleLanguage, setToggleLanguage] = useState(null);

  const copyToClipboard = async () => {
    try {
      Clipboard.setString(mnemonic);
      Alert.alert("Success", "Your recovery phrase copied to clipboard!", [
        { text: "OK" },
      ]);
    } catch (error) {
      console.error("Failed to copy text: ", error);
      Alert.alert("Error", "Failed to copy text!", [{ text: "OK" }]);
    }
  };

  const retrieveSelectedLanguage = async () => {
    try {
      const language = await AsyncStorage.getItem("selectedLanguage");
      if (language !== null) {
        console.log("Retrieved language:", language);
        let bool = language === "english" ? true : false;
        setToggleLanguage(bool);
      } else {
        console.log("No language saved in AsyncStorage");
        setToggleLanguage(true);
      }
    } catch (error) {
      console.error("Error retrieving language from AsyncStorage:", error);
    }
  };

  useEffect(() => {
    retrieveSelectedLanguage();
  }, []);

  return (
    <Pressable onPress={closeModal} style={styles.backdrop}>
      <Pressable style={{ width: "100%", height: "100%" }}>
        <Animated.View
          style={[styles.bottomSheet, { transform: [{ translateY: slide }] }]}
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <Text
                style={[
                  styles.walletText,
                  { left: toggleLanguage === "arabic" ? "35%" : null },
                ]}
              >
                {toggleLanguage
                  ? EnglishTranslation.backupPhrase
                  : ArabicTranslation.backupPhrase}
              </Text>
            </View>
            <View style={styles.recoveryPharseTextContainer}>
              <Text style={styles.recoveryPhraseText}>
                {toggleLanguage
                  ? EnglishTranslation.yourRecoveryPhraseText
                  : ArabicTranslation.yourRecoveryPhraseText}
              </Text>

              <Text
                style={[
                  styles.subText,
                  { width: toggleLanguage === "arabic" ? "105%" : null },
                ]}
              >
                {toggleLanguage
                  ? EnglishTranslation.secutiryMessageText
                  : ArabicTranslation.secutiryMessageText}
              </Text>
            </View>
            <View style={styles.securityMessageContainer}>
              <AlertIcon style={styles.alertImage} />
              <Text style={styles.securityText}>
                {toggleLanguage
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
            <View style={styles.copyIcon}>
              <TouchableOpacity onPress={copyToClipboard}>
                <PasteIcon />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Pressable>
  );
};

export default RecoveryPhraseModal;

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSheet: {
    width: "90%",
    height: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  header: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "5%",
    marginLeft: "-8%",
  },
  backIcon: {
    width: 25,
    height: 25,
  },
  walletText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#253452",
    marginTop: "-1%",
    marginLeft: "-10%",
  },
  recoveryPharseTextContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "7%",
    width: "80%",
    alignSelf: "center",
  },
  recoveryPhraseText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#253452",
  },
  subText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#9F9FA0",
    textAlign: "center",
    width: "115%",
    marginTop: "4%",
  },
  securityMessageContainer: {
    alignItems: "center",
    alignSelf: "center",
    width: "88%",
    borderWidth: 1,
    borderColor: "#F3AB1D",
    borderRadius: 15,
    height: "12%",
    marginTop: "7%",
    backgroundColor: "#F4F7FA",
  },
  alertImage: {
    width: 38,
    height: 40,
    marginTop: "2%",
  },
  securityText: {
    fontSize: 13,
    fontWeight: "400",
    color: "#000000",
    textAlign: "center",
    width: "85%",
  },
  securityPhraseContainer: {
    alignSelf: "center",
    width: "87%",
    height: "38.5%",
    borderRadius: 15,
    marginTop: "10%",
    backgroundColor: "#F4F7FA",
  },
  securityPhraseTextContainer: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    justifyContent: "space-between",
    marginTop: "3%",
  },
  countingText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#B7BECD",
    marginHorizontal: "8%",
  },
  namesText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#253452",
  },
  termsConsentContainer: {
    flexDirection: "row",
    width: "85%",
    alignSelf: "center",
    marginTop: "10%",
    marginLeft: "5%",
  },

  copyIcon: {
    justifyContent: "center",
    marginTop: "3%",
    width: "85%",
    alignSelf: "center",
    marginLeft: "155%",
  },
});
