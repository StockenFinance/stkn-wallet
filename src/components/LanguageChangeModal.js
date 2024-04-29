import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  TouchableOpacity,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

const LanguageChangeModal = ({ isVisible, onClose }) => {
  const slide = React.useRef(new Animated.Value(1)).current;
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const saveSelectedLanguage = async (language) => {
    try {
      await AsyncStorage.setItem("selectedLanguage", language);
    } catch (error) {
      console.error("Error saving selected language to AsyncStorage:", error);
    }
  };

  const applyLanguageChange = async () => {
    await saveSelectedLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
    onClose();
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
    if (isVisible) {
      Animated.timing(slide, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slide, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const closeModal = () => {
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <Animated.View
          style={[styles.bottomSheet, { transform: [{ translateY: slide }] }]}
        >
          <View style={styles.container}>
            <Text style={styles.modalTitle}>{t("selectLanguage")}</Text>
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
                applyLanguageChange();
                closeModal();
              }}
              style={styles.getStartedContainer}
            >
              <Text style={styles.getStartedText}>{t("continueText")}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        <Pressable onPress={closeModal} style={styles.backdrop} />
      </View>
    </Modal>
  );
};

export default LanguageChangeModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  },
  bottomSheet: {
    width: "100%",
    height: "70%",
    backgroundColor: "white",
    padding: "5%",
    borderRadius: 12,
    alignItems: "center",
    marginTop: "140%",
  },
  container: {
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    padding: 10,
    color: "black",
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
    marginTop: 75,
    width: 350,
    height: 55,
    borderRadius: 10,
    backgroundColor: "#F19220",
  },
  getStartedText: {
    fontSize: 21,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
  },
});
