import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { styles } from "./styles";

const ConfirmBackupPhrase = ({ navigation, route }) => {
  const [isChoose, setIsChoose] = useState([]);
  const inputRefs = useRef([]);

  const { mnemonicWords } = route.params;
  const generateRandomNumbers = () => {
    const randomNumbers = new Set();
    while (randomNumbers.size < 4) {
      const randomNumber = Math.floor(Math.random() * 12) + 1;
      randomNumbers.add(randomNumber);
    }
    const num = Array.from(randomNumbers);
    setIsChoose(num);
    return num;
  };
  useEffect(() => {
    const randomNumbers = generateRandomNumbers();
  }, []);

  const getRandomIndices = (length, count) => {
    const indices = new Set();
    while (indices.size < count) {
      const randomIndex = Math.floor(Math.random() * length);
      indices.add(randomIndex);
    }
    return Array.from(indices);
  };
  const randomIndices = getRandomIndices(mnemonicWords.length, 3);

  const confirmInput = useCallback(
    (index) => {
      console.log(index, "CHOOSE", isChoose, !Number(isChoose[index]));
      if (!Number(isChoose[index])) {
        return <Text style={styles.countingText}>{isChoose[index]}</Text>;
      } else {
        return (
          <View
            style={[
              {
                borderRadius: 15,
                backgroundColor: "#ffffff",
                width: "100%",
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
              {isChoose[index]}
            </Text>
          </View>
        );
      }
    },
    [isChoose]
  );

  const handleBoxPress = (index) => {
    let updatedValues = [...isChoose];
    console.log(isChoose, "ISChoose", index);
    let final = [];
    for (let i = 0; i < updatedValues.length; i++) {
      if (typeof updatedValues[i] === "number") {
        final.push(updatedValues[i] + " " + mnemonicWords[index]);
        break;
      }
      final.push(Number(updatedValues[i]));
    }
    for (let i = 0; i < updatedValues.length; i++) {
      console.log(i);

      if (final.length - 1 >= i) {
        continue;
      }
      final.push(Number(updatedValues[i]));
    }
    // let final = updatedValues.map((val, idx) => {
    //   console.log(val, idx, updatedValues[idx], typeof updatedValues[idx]);

    //   return Number(val);
    // });
    console.log(final, "Updated Value");
    setIsChoose(final);
  };

  // const handleBoxPress = (index) => {
  //   let updatedValues = [...isChoose];
  //   let final = updatedValues.map((val, idx) => {
  //     if (idx === index) {
  //       return mnemonicWords[index];
  //     } else {
  //       return val;
  //     }
  //   });
  //   setIsChoose(final);
  // };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/images/backIcon.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <Text style={styles.walletText}>Backup Phrase</Text>
      </View>
      <View style={styles.recoveryPharseTextContainer}>
        <Text style={styles.recoveryPhraseText}>
          {" "}
          Confirm your Recovery Phrase
        </Text>

        <Text style={styles.subText}>
          To be sure you backed up your recovery phrase correctly, please enter
          its words in the fields below in the right order
        </Text>
      </View>

      <View style={styles.securityPhraseContainer}>
        <View style={styles.securityPhraseTextContainer}>
          <View style={{ width: "50%" }}>
            <View style={{ flexDirection: "row" }}>
              {/* <Text style={styles.countingText}>{randomNumbers[0]}</Text> */}
              {confirmInput(0)}
            </View>
            <View
              style={{
                flexDirection: "row",
                marginVertical: "10%",
              }}
            >
              {/* <Text style={styles.countingText}>{isChoose[1]}</Text> */}
              {confirmInput(1)}
            </View>
          </View>
          <View style={{ width: "45%" }}>
            <View>{confirmInput(2)}</View>
            <View
              style={{
                marginVertical: "10%",
                width: "100%",
              }}
            >
              {confirmInput(3)}
            </View>
          </View>
        </View>
      </View>
      <View style={styles.phrasesSuggestionContainer}>
        {randomIndices.map((index) => (
          <TouchableOpacity
            key={index}
            style={styles.choiceView}
            onPress={() => handleBoxPress(index)}
          >
            <Text style={styles.choiceText}>{mnemonicWords[index]}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.importButton}>
        <View style={styles.alertContainer}>
          <View style={styles.alertView}>
            <Text style={styles.alertText}>!</Text>
          </View>
          <Text style={styles.importText}>
            Please select word #6 from the list
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ConfirmBackupPhrase;
