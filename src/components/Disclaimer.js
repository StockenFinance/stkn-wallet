import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  TouchableOpacity,
  Linking,
} from "react-native";
import CheckBox from "react-native-check-box";

const Disclaimer = ({ setStatus, buyData }) => {
  const [isChecked, setIsChecked] = useState(false);
  const slide = React.useRef(new Animated.Value(300)).current;

  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    AsyncStorage.getItem("selectedLanguage").then((language) => {
      if (language) {
        setSelectedLanguage(language);
        i18n.changeLanguage(language);
      }
    });
  }, []);

  const openUrl = () => {
    const url = "https://www.moonpay.com/legal/terms_of_use_row";
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  const openBuyCrypto = () => {
    const apiKey = "pk_test_oxQY1qdAGKlItZrVIRQ9qpNwpfAPHjQ";
    const url = `https://buy-sandbox.moonpay.com/?apiKey=${apiKey}&cryptoAmount=${buyData.cryptoAmount}&fiatAmount=${buyData.fiatAmount}&selectedCryptoCurrency=${buyData.selectedCryptoCurrency}&selectedFiatCurrency=${buyData.selectedFiatCurrency}`;
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  console.log("buydata.cryptoAmount", buyData.cryptoAmount);
  console.log("buyData", buyData);

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
      toValue: 300,
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

  return (
    <Pressable onPress={closeModal} style={styles.backdrop}>
      <Pressable style={{ width: "100%", height: "40%" }}>
        <Animated.View
          style={[styles.bottomSheet, { transform: [{ translateY: slide }] }]}
        >
          <View style={styles.container}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "700",
                padding: 10,
                color: "black",
              }}
            >
              {t("disclaimer")}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                color: "#344567",
                lineHeight: 22,
                fontFamily: "Nunito Sans",
                textAlign: "justify",
                padding: 5,
              }}
            >
              {t("disclaimerPragraph")}
            </Text>
            <View style={styles.termsConsentContainer}>
              <CheckBox
                isChecked={isChecked}
                onClick={() => setIsChecked(!isChecked)}
                checkedCheckBoxColor="#F19220"
                openBuyCrypto
                style={[styles.checkBox]}
              />
              <Text style={[styles.consentText]}>
                {t("termAndCondition")}
                <Text style={styles.linkText} onPress={openUrl}>
                  {t("termAndConditionHalf")}
                </Text>
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                openBuyCrypto();
                setStatus(false);
              }}
              style={[
                styles.importButton,
                isChecked
                  ? styles.importButtonEnabled
                  : styles.importButtonDisabled,
              ]}
              disabled={!isChecked}
            >
              <Text
                style={[
                  styles.importText,
                  isChecked
                    ? styles.importTextEnabled
                    : styles.importTextDisabled,
                ]}
              >
                {t("continueText")}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Pressable>
    </Pressable>
  );
};

export default Disclaimer;

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    height: "63%",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    width: "100%",
    height: "200%",
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 20,
    padding: "10%",
  },
  container: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  termsConsentContainer: {
    flexDirection: "row",
    width: "85%",
    alignSelf: "center",
    marginTop: "10%",
    marginLeft: "5%",
  },
  checkBox: {
    alignSelf: "center",
    marginLeft: "-10%",
    marginHorizontal: "3%",
    // width: "15%",
  },
  consentText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#9F9FA0",
    width: "100%",
  },
  importButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
    width: "96%",
    height: 49,
    alignSelf: "center",
    borderRadius: 15,
    backgroundColor: "#D5DFEB",
  },
  importButtonEnabled: {
    backgroundColor: "#F19220",
  },
  importTextEnabled: {
    color: "#FFFFFF",
  },
  importText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#979797",
  },
  linkText: {
    color: "#6680E1",
  },
});
