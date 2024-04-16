import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated, Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LanguageChangeModal = ({ setStatus }) => {
  const slide = React.useRef(new Animated.Value(300)).current;

  const [selectedLanguage, setSelectedLanguage] = useState("english");

  const handleLanguageChange = async (language) => {
    setSelectedLanguage(language);
    await saveSelectedLanguage(language);
  };

  const saveSelectedLanguage = async (language) => {
    try {
      await AsyncStorage.setItem("selectedLanguage", language);
      console.log("Selected language saved successfully:", language);
      // alert("value added ");
    } catch (error) {
      console.error("Error saving selected language to AsyncStorage:", error);
    }
  };

  const toggleLanguage = async () => {
    if (selectedLanguage === "english") {
      setSelectedLanguage("arabic");
      await saveSelectedLanguage("arabic");
    } else {
      setSelectedLanguage("english");
      await saveSelectedLanguage("english");
    }
  };

  useEffect(() => {
    // Retrieve the selected language from AsyncStorage on component mount
    AsyncStorage.getItem("selectedLanguage").then((language) => {
      if (language) {
        setSelectedLanguage(language);
        toggleLanguage();
      }
    });
  }, []);

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
                fontSize: 20,
                fontWeight: "700",
                padding: 10,
                color: "black",
              }}
            >
              Select Language
            </Text>
            <View style={styles.languageViewContainer}>
              <TouchableOpacity
                onPress={() => handleLanguageChange("english")}
                style={[
                  styles.languageButton,
                  {
                    backgroundColor:
                      selectedLanguage === "english" ? "#F19220" : "#F4F7FA",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.englishText,
                    {
                      color:
                        selectedLanguage === "english" ? "#ffffff" : "#000000",
                    },
                  ]}
                >
                  English
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleLanguageChange("arabic")}
                style={[
                  styles.languageButton,
                  {
                    backgroundColor:
                      selectedLanguage === "arabic" ? "#F19220" : "#F4F7FA",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.englishText,
                    {
                      color:
                        selectedLanguage === "arabic" ? "#ffffff" : "#000000",
                      fontSize: 21,
                      marginBottom: "5%",
                    },
                  ]}
                >
                  عربي
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={closeModal}
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

  selectLanhg: {
    display: "flex",
    justifyContent: "space-between",
  },

  getStartedContainer: {
    width: 335,
    height: 55,
    borderRadius: 10,
    backgroundColor: "#F19220",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "30%",
  },
  getStartedText: {
    fontSize: 21,
    fontWeight: "700",
    color: "#ffffff",
  },
  termsConsentContainer: {
    flexDirection: "row",
    width: "85%",
    alignSelf: "center",
    marginTop: "10%",
    gap: 230,
    marginLeft: 50,
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
  languageButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 50,
    backgroundColor: "#F19220",
    borderRadius: 5,
    marginHorizontal: "10%",
  },

  languageViewContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginHorizontal: "20%",
    marginTop: "10%",
  },
});
