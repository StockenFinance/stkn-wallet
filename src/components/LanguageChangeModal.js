import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

const LanguageChangeModal = ({ setStatus }) => {
  const slide = React.useRef(new Animated.Value(300)).current;
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleLanguageChange = async (language) => {
    setSelectedLanguage(language);
    setShowContinueButton(true);
  };

  const saveSelectedLanguage = async (language) => {
    try {
      await AsyncStorage.setItem("selectedLanguage", language);
      console.log("Selected language saved successfully:", language);
    } catch (error) {
      console.error("Error saving selected language to AsyncStorage:", error);
    }
  };

  const applyLanguageChange = async () => {
    await saveSelectedLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
    setShowContinueButton(false);
  };

  useEffect(() => {
    AsyncStorage.getItem("selectedLanguage").then((language) => {
      if (language) {
        setSelectedLanguage(language);
        i18n.changeLanguage(language);
      }
    });
  }, []);
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
    }).start(() => {
      setStatus(false);
    });
  };

  useEffect(() => {
    slideUp();
  }, []);

  const closeModal = () => {
    slideDown();
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
                fontSize: 20,
                fontWeight: "700",
                padding: 10,
                color: "black",
              }}
            >
              Select Language
            </Text>
            <View style={styles.languageViewContainer}>
              <Pressable
                onPress={() => handleLanguageChange("en")}
                style={[
                  styles.languageOption,
                  {
                    backgroundColor:
                      selectedLanguage === "en" ? "#F19220" : "#F4F7FA",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.languageText,
                    {
                      color: selectedLanguage === "en" ? "#fff" : "#000",
                    },
                  ]}
                >
                  English
                </Text>
                <View
                  style={[
                    styles.selectCircle,
                    {
                      borderColor:
                        selectedLanguage === "en" ? "#F19220" : "#ccc",
                    },
                  ]}
                >
                  {selectedLanguage === "en" && (
                    <Text style={styles.selectSymbol}>✓</Text>
                  )}
                </View>
              </Pressable>
            </View>
            <View style={styles.languageViewContainer}>
              <Pressable
                onPress={() => handleLanguageChange("ar")}
                style={[
                  styles.languageOption,
                  {
                    backgroundColor:
                      selectedLanguage === "ar" ? "#F19220" : "#F4F7FA",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.languageText,
                    {
                      color: selectedLanguage === "ar" ? "#fff" : "#000",
                    },
                  ]}
                >
                  عربي
                </Text>
                <View
                  style={[
                    styles.selectCircle,
                    {
                      borderColor:
                        selectedLanguage === "ar" ? "#F19220" : "#ccc",
                    },
                  ]}
                >
                  {selectedLanguage === "ar" && (
                    <Text style={styles.selectSymbol}>✓</Text>
                  )}
                </View>
              </Pressable>
            </View>
            <TouchableOpacity
              onPress={() => {
                applyLanguageChange(selectedLanguage);
                closeModal();
              }}
              style={styles.getStartedContainer}
            >
              <Text style={styles.getStartedText}>{t("continueText")}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Pressable>
    </Pressable>
  );
};

export default LanguageChangeModal;

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    height: "75%",
    justifyContent: "flex-end",
    zIndex: 999,
  },
  bottomSheet: {
    width: "100%",
    height: "100%",
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
  languageViewContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 5,
  },
  languageOption: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: 350,
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  languageText: {
    fontSize: 16,
    marginRight: 10,
  },
  selectCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selectSymbol: {
    fontSize: 16,
  },
  getStartedContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "25%",
    width: "97%",
    marginLeft: "-3%",
    height: 55,
    borderRadius: 10,
    backgroundColor: "#F19220",
    marginLeft: 5,
  },
  getStartedText: {
    fontSize: 21,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
  },
});
