import React, { useState } from "react";
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
import EnglishTranslation from "./englishTranslation";
import ArabicTranslation from "./arabicTranslations";

const Disclaimer = ({ setStatus }) => {
  const [isChecked, setIsChecked] = useState(false);
  const slide = React.useRef(new Animated.Value(300)).current;

  const openUrl = () => {
    const url = "https://www.moonpay.com/legal/terms_of_use_row";
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  const openBuyCrypto = () => {
    const url = "https://buy.moonpay.com/";
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

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
              Disclaimer
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
              You will be taken to MoonPay. Services relating to payments are
              provided by MoonPay, which is a separate platform owned by a third
              party. Please read and agree to MoonPay's Terms of Service before
              using their service. For any questions relating to payments,
              please contact MoonPay. 1inch does not assume any responsibility
              for any loss or damage caused by the use of this payment service.
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
                {EnglishTranslation.termAndCondition}{" "}
                <Text style={styles.linkText} onPress={openUrl}>
                  Terms of Service
                </Text>
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setStatus(false);
                openBuyCrypto();
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
                {EnglishTranslation.continueText}
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
    height: "40%",
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
