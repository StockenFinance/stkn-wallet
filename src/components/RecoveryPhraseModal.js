import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  Dimensions,
  Modal,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AlertIcon from "../SvgIcon/AlertIcon";
import PasteIcon from "../SvgIcon/PasteIcon";
import Clipboard from "@react-native-clipboard/clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setModal, setMyTabHide } from "../redux/reducer/CounterSlice";
import { useTranslation } from "react-i18next";

const { height } = Dimensions.get("window");

const RecoveryPhraseModal = ({ setStatus, mnemonic }) => {
  const dispatch = useDispatch();
  const slide = React.useRef(new Animated.Value(height)).current;

  const slideUp = () => {
    Animated.timing(slide, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const slideDown = () => {
    Animated.timing(slide, {
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    slideUp();
  }, []);

  const closeModal = () => {
    slideDown();

    setTimeout(() => {
      setStatus(false);
      dispatch(setModal(false));
    }, 200);
  };

  const mnemonicWords = mnemonic.split(" ");
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const { t, i18n } = useTranslation();

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

  useEffect(() => {
    AsyncStorage.getItem("selectedLanguage").then((language) => {
      if (language) {
        setSelectedLanguage(language);
        i18n.changeLanguage(language);
      }
    });
  }, []);

  useEffect(() => {
    dispatch(setMyTabHide(true));
    return () => {
      dispatch(setMyTabHide(false));
    };
  }, []);

  return (
    <Pressable onPress={closeModal} style={styles.backdrop}>
      <Pressable style={{ width: "100%", height: "40%" }}>
        <Animated.View
          style={[styles.bottomSheet, { transform: [{ translateY: slide }] }]}
        >
          <View style={styles.container}>
            <View style={styles.recoveryPharseTextContainer}>
              <Text style={styles.recoveryPhraseText}>
                {t("yourRecoveryPhraseText")}
              </Text>

              <Text style={[styles.subText]}>{t("secutiryMessageText")}</Text>
            </View>
            <View style={styles.securityMessageContainer}>
              <AlertIcon style={styles.alertImage} />
              <Text style={styles.securityText}>{t("warningText")}</Text>
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
            <TouchableOpacity
              onPress={closeModal}
              style={styles.getStartedContainer}
            >
              <Text style={styles.getStartedText}>Got It!</Text>
            </TouchableOpacity>
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
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    height: "320%",
    justifyContent: "flex-end",
    zIndex: 999,
  },
  bottomSheet: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: 20,
    top: 70,
    marginBottom: 20,
  },
  container: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    paddingBottom: 10,
  },
  header: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  backIcon: {
    width: 25,
    height: 25,
  },
  walletText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#253452",
    marginLeft: "-10%",
    backgroundColor: "white",
  },
  recoveryPharseTextContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    alignSelf: "center",
  },
  recoveryPhraseText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#253452",
    marginBottom: 20,
  },
  subText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#9F9FA0",
    textAlign: "center",
    width: "115%",
  },
  securityMessageContainer: {
    alignItems: "center",
    alignSelf: "center",
    width: "88%",
    borderWidth: 1,
    borderColor: "#F3AB1D",
    borderRadius: 15,
    height: 83,
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
    width: 335,
    height: 310,
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
  getStartedContainer: {
    width: 335,
    height: 55,
    borderRadius: 10,
    backgroundColor: "#F19220",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  getStartedText: {
    fontSize: 21,
    fontWeight: "700",
    color: "#ffffff",
  },
  namesTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
});
