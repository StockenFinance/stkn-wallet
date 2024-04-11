import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import HomeLogoIcon from "../../SvgIcon/HomeLogoIcon";
import EnglishTranslation from "../../components/englishTranslation";
import ArabicTranslation from "../../components/arabicTranslations";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Welcome = ({ navigation }) => {
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

  // const handleLanguageChange = (language) => {
  //   setSelectedLanguage(language);
  // };

  // selectedLanguage === "arabic" ? ArabicTranslation : EnglishTranslation;

  // console.log("language selected:::::", selectedLanguage);

  // const saveSelectedLanguage = async (language) => {
  //   try {
  //     await AsyncStorage.setItem("selectedLanguage", language);
  //     console.log("Selected language saved successfully:", language);
  //   } catch (error) {
  //     console.error("Error saving selected language to AsyncStorage:", error);
  //   }
  // };
  // const toggleLanguage = async () => {
  //   if (selectedLanguage === "english") {
  //     setSelectedLanguage("english");
  //     try {
  //       await AsyncStorage.setItem("changeLanguage", "true");
  //       console.log("Language changed to Arabic successfully.");
  //     } catch (error) {
  //       console.error("Error saving selected language to AsyncStorage:", error);
  //     }
  //     saveSelectedLanguage("arabic");
  //   } else {
  //     try {
  //       await AsyncStorage.setItem("changeLanguage", "false");
  //       console.log("Language changed to English successfully.");
  //     } catch (error) {
  //       console.error("Error saving selected language to AsyncStorage:", error);
  //     }
  //     setSelectedLanguage("english");
  //     saveSelectedLanguage("english");
  //   }
  // };

  // useEffect(() => {
  //   // Retrieve the selected language from AsyncStorage
  //   AsyncStorage.getItem("selectedLanguage").then((language) => {
  //     if (language) {
  //       setSelectedLanguage(language);
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   toggleLanguage();
  // }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageTextContainer}>
        <HomeLogoIcon style={styles.image} />
        <Text style={styles.welcomeText}>
          {" "}
          {selectedLanguage === "english"
            ? EnglishTranslation.welcome
            : ArabicTranslation.welcome}
        </Text>
        <Text style={styles.restoreWalletText}>
          {selectedLanguage === "english"
            ? EnglishTranslation.restoreWalletText
            : ArabicTranslation.restoreWalletText}
        </Text>
      </View>
      <View style={styles.languageViewContainer}>
        <Text style={styles.languageText}>Language</Text>
        <View style={[styles.languageButtonContainer, { marginLeft: "-5%" }]}>
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
                  color: selectedLanguage === "english" ? "#ffffff" : "#000000",
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
                  color: selectedLanguage === "arabic" ? "#ffffff" : "#000000",
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
          onPress={() =>
            navigation.navigate("CreateWallet", {
              selectedLanguage: selectedLanguage,
            })
          }
          style={styles.getStartedContainer}
        >
          <Text style={styles.getStartedText}>
            {selectedLanguage === "english"
              ? EnglishTranslation.getStarted
              : ArabicTranslation.getStarted}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;
