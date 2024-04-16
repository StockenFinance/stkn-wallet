import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated, Pressable } from "react-native";
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
});
