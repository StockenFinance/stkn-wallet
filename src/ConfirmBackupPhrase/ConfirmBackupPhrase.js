import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { styles } from "./styles";

const ConfirmBackupPhrase = ({ navigation, route }) => {
  const { mnemonicWords } = route.params;
  const generateRandomNumbers = () => {
    const randomNumbers = new Set(); // Using Set to ensure uniqueness
    while (randomNumbers.size < 4) {
      const randomNumber = Math.floor(Math.random() * 12) + 1;
      randomNumbers.add(randomNumber);
    }
    return Array.from(randomNumbers); // Convert Set back to array
  };

  // Generate random numbers
  const randomNumbers = generateRandomNumbers();

  const getRandomIndices = (length, count) => {
    const indices = new Set();
    while (indices.size < count) {
      const randomIndex = Math.floor(Math.random() * length);
      indices.add(randomIndex);
    }
    return Array.from(indices);
  };

  // Get random indices
  const randomIndices = getRandomIndices(mnemonicWords.length, 3);
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
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.countingText}>{randomNumbers[0]}</Text>
            </View>
            <View style={{ flexDirection: "row", marginVertical: "10%" }}>
              <Text style={styles.countingText}>{randomNumbers[1]}</Text>
            </View>
          </View>
          <View>
            <View>
              <Text style={[styles.countingText, { marginRight: "27%" }]}>
                {randomNumbers[2]}
              </Text>
            </View>
            <View>
              <Text style={[styles.countingText, { marginTop: "7%" }]}>
                {randomNumbers[3]}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.phrasesSuggestionContainer}>
        {randomIndices.map((index) => (
          <TouchableOpacity key={index} style={styles.choiceView}>
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
