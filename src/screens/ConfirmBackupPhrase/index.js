import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { styles } from "./styles";
import BackIcon from "../../SvgIcon/BackIcon";
import ArabicTranslation from "../../components/arabicTranslations";
import EnglishTranslation from "../../components/englishTranslation";
import { Utils } from "../../utils/LocalStorage";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ConfirmBackupPhrase = ({ navigation, route }) => {
  const { t, i18n } = useTranslation();

  selectedLanguage === "arabic" ? ArabicTranslation : EnglishTranslation;

  const [isChoose, setIsChoose] = useState([]);
  const [randomIndicess, setRandomIndicess] = useState([]);
  const [questionNumber, setQuestionNumber] = useState([]);
  const [questionValue, setQuestionValue] = useState([]);
  const [toggleLanguage, setToggleLanguage] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const [selected, setSelected] = useState([
    {
      value: "",
      isSelected: false,
      isFocus: true,
      index: "",
    },
    {
      value: "",
      isSelected: false,
      isFocus: false,
      index: "",
    },
    {
      value: "",
      isSelected: false,
      isFocus: false,
      index: "",
    },
    {
      value: "",
      isSelected: false,
      isFocus: false,
      index: "",
    },
  ]);

  const { mnemonicWords, randomIndexes } = route.params;
  const generateRandomNumbers = () => {
    const randomNumbers = [];
    while (randomNumbers.length < 4) {
      const randomNumber = Math.floor(Math.random() * mnemonicWords.length);
      if (!randomNumbers.includes(randomNumber)) {
        randomNumbers.push(randomNumber);
      }
    }
    const selectedItems = randomNumbers.map((index) => mnemonicWords[index]);
    console.log("randomly selected items: ", selectedItems);
    console.log("randomly selected index: ", randomNumbers);
    setQuestionValue(selectedItems);
    setQuestionNumber(randomNumbers);

    return selectedItems;
  };

  useEffect(() => {
    generateRandomNumbers();
  }, []);

  useEffect(() => {
    const generateRandomIndices = () => {
      const indices = new Set();
      while (indices.size < 4) {
        const randomIndex = Math.floor(Math.random() * mnemonicWords.length);
        indices.add(randomIndex);
      }
      setRandomIndicess(Array.from(indices));
    };

    generateRandomIndices();
  }, []);
  const confirmInput = (index) => {
    return (
      <View
        style={[
          {
            borderRadius: 15,
            backgroundColor: "#ffffff",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <Text
          style={{
            padding: 10,
            textAlign: "left",
            fontWeight: "800",
            color: "#B7BECD",
          }}
        >
          {questionValue[index]}
        </Text>
      </View>
    );
  };

  const handleBoxPress = (value, index) => {
    setSelected((prevSelected) => {
      const updatedSelected = [...prevSelected];
      const currentIndex = updatedSelected.findIndex((item) => item.isFocus);
      const nextIndex = (currentIndex + 1) % updatedSelected.length; // Move to the next index circularly

      updatedSelected[currentIndex].isFocus = false; // Set isFocus to false for current index
      updatedSelected[currentIndex].isSelected = true; // Set isSelected to true for current index

      if (!updatedSelected.some((item) => item.value === value)) {
        updatedSelected[currentIndex].value = value; // Update value for current index if it doesn't exist already
      }
      updatedSelected[currentIndex].index = index;
      updatedSelected[nextIndex].isFocus = true; // Set isFocus to true for next index

      if (updatedSelected.every((item) => item.isSelected)) {
        // Check if all items are selected
        const questionNumberArray = questionNumber.map((item) => item);
        const selectedIndices = updatedSelected.map((item) => item.index);
        console.log("questionNumberArray:", questionNumberArray);
        console.log("selectedIndices:", selectedIndices);

        if (
          JSON.stringify(questionNumberArray) ===
          JSON.stringify(selectedIndices)
        ) {
          navigation.navigate("RecoveryPhraseConfirmation", {
            selectedLanguage: selectedLanguage,
          });
          // Alert.alert("You have completed the section!", "", [
          //   {
          //     text: "OK",
          //     onPress: () => navigation.navigate("RecoveryPhraseConfirmation"),
          //   },
          // ]);
        } else {
          Alert.alert("Incorrect phrases placement!", "", [
            { text: "OK", onPress: () => navigation.goBack() },
          ]);
        }
      }

      return updatedSelected;
    });
  };

  console.log("check indeces", randomIndicess);
  console.log("check :::::", mnemonicWords);

  useEffect(() => {
    // Retrieve the selected language from AsyncStorage on component mount
    AsyncStorage.getItem("selectedLanguage").then((language) => {
      if (language) {
        setSelectedLanguage(language);
        i18n.changeLanguage(language);
      }
    });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon style={styles.backIcon} />
        </TouchableOpacity>

        <Text style={styles.walletText}>{t("backupPhrase")}</Text>
      </View>
      <View style={styles.recoveryPharseTextContainer}>
        <Text style={styles.recoveryPhraseText}>{t("confirmPhraseText")}</Text>

        <Text style={styles.subText}>{t("assurityText")}</Text>
      </View>

      <View style={styles.securityPhraseContainer}>
        <View style={styles.securityPhraseTextContainer}>
          <View style={{ width: "50%" }}>
            {/* // 0 index section */}
            <View
              style={[
                selected[0].isFocus && {
                  borderWidth: 0.4,
                  borderRadius: 15,
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                },
                { flexDirection: "row" },
              ]}
            >
              <Text style={styles.countingText}>{questionNumber[0] + 1} </Text>
              {selected[0].isSelected && (
                <Text style={styles.countingText}>{selected[0].value}</Text>
              )}
            </View>

            {/* 1 index section  */}
            <View
              style={[
                selected[1].isFocus && {
                  borderWidth: 0.4,
                  borderRadius: 15,
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                },
                { flexDirection: "row", marginVertical: "10%" },
              ]}
            >
              <Text style={styles.countingText}>{questionNumber[1] + 1} </Text>
              {selected[1].isSelected && (
                <Text style={styles.countingText}>{selected[1].value}</Text>
              )}
            </View>
          </View>

          <View style={{ width: "45%" }}>
            {/* 2 index section  */}
            <View
              style={[
                selected[2].isFocus && {
                  borderWidth: 0.4,
                  borderRadius: 15,
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                },
                { flexDirection: "row" },
              ]}
            >
              <Text style={styles.countingText}>{questionNumber[2] + 1} </Text>
              {selected[2].isSelected && (
                <Text style={styles.countingText}>{selected[2].value}</Text>
              )}
            </View>

            {/* 3 index section  */}
            <View
              style={[
                selected[3].isFocus && {
                  borderWidth: 0.4,
                  borderRadius: 15,
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                },
                { flexDirection: "row", marginVertical: "10%", width: "100%" },
              ]}
            >
              <Text style={styles.countingText}>{questionNumber[3] + 1} </Text>
              {selected[3].isSelected && (
                <Text style={styles.countingText}>{selected[3].value}</Text>
              )}
            </View>
          </View>
        </View>
      </View>
      <View style={styles.phrasesSuggestionContainer}>
        <TouchableOpacity
          style={styles.choiceView}
          onPress={() => handleBoxPress(questionValue[0], questionNumber[0])}
        >
          <Text style={styles.choiceText}>{questionValue[0]}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.choiceView}
          onPress={() => handleBoxPress(questionValue[1], questionNumber[1])}
        >
          <Text style={styles.choiceText}>{questionValue[1]}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.choiceView}
          onPress={() => handleBoxPress(questionValue[2], questionNumber[2])}
        >
          <Text style={styles.choiceText}>{questionValue[2]}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.choiceView}
          onPress={() => handleBoxPress(questionValue[3], questionNumber[3])}
        >
          <Text style={styles.choiceText}>{questionValue[3]}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.importButton}>
        <View style={styles.alertContainer}>
          <View style={styles.alertView}>
            <Text style={styles.alertText}>!</Text>
          </View>
          <Text style={styles.importText}>
            {t("selectWordText")}
            {selected.findIndex((item) => item.isFocus) !== -1
              ? questionNumber[selected.findIndex((item) => item.isFocus)] + 1
              : ""}{" "}
            {t("listText")}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ConfirmBackupPhrase;
