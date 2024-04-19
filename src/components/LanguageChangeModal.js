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
import EnglishTranslation from "./englishTranslation";
import ArabicTranslation from "./arabicTranslations";

const LanguageChangeModal = ({ setStatus }) => {
  const slide = React.useRef(new Animated.Value(300)).current;

  const [selectedLanguage, setSelectedLanguage] = useState("english");

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const saveSelectedLanguage = async (language) => {
    try {
      await AsyncStorage.setItem("selectedLanguage", language);
      console.log("Selected language saved successfully:", language);
      // Apply language change to the app after saving to AsyncStorage
      applyLanguageChange(language);
    } catch (error) {
      console.error("Error saving selected language to AsyncStorage:", error);
    }
  };

  const applyLanguageChange = (language) => {
    // Apply language change to the app based on the selected language
    // For example, you might have a function to update the app's language settings
    // Replace the following line with your actual logic
    console.log("Applying language change to:", language);
  };

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
                onPress={() => handleLanguageChange("english")}
                style={[
                  styles.languageOption,
                  {
                    backgroundColor:
                      selectedLanguage === "english" ? "#F19220" : "#F4F7FA",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.languageText,
                    {
                      color: selectedLanguage === "english" ? "#fff" : "#000",
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
                        selectedLanguage === "english" ? "#F19220" : "#ccc",
                    },
                  ]}
                >
                  {selectedLanguage === "english" && (
                    <Text style={styles.selectSymbol}>✓</Text>
                  )}
                </View>
              </Pressable>
            </View>
            <View style={styles.languageViewContainer}>
              <Pressable
                onPress={() => handleLanguageChange("arabic")}
                style={[
                  styles.languageOption,
                  {
                    backgroundColor:
                      selectedLanguage === "arabic" ? "#F19220" : "#F4F7FA",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.languageText,
                    {
                      color: selectedLanguage === "arabic" ? "#fff" : "#000",
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
                        selectedLanguage === "arabic" ? "#F19220" : "#ccc",
                    },
                  ]}
                >
                  {selectedLanguage === "arabic" && (
                    <Text style={styles.selectSymbol}>✓</Text>
                  )}
                </View>
              </Pressable>
            </View>
            <TouchableOpacity
              onPress={() => {
                saveSelectedLanguage(selectedLanguage);
                closeModal();
              }}
              style={styles.getStartedContainer}
            >
              <Text style={styles.getStartedText}>Continue</Text>
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
