import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import CheckBox from "react-native-check-box";
import { styles } from "./styles";
import BackIcon from "../../SvgIcon/BackIcon";
import AlertIcon from "../../SvgIcon/AlertIcon";

const BackupPhrase = ({ navigation, route }) => {
  const { mnemonic } = route.params;
  const mnemonicWords = mnemonic.split(" ");
  const [isChecked, setIsChecked] = useState(false);
  const [randomIndexes, setRandomIndexes] = useState([]);

  const getRandomIndexes = () => {
    const allIndexes = Array.from(
      { length: mnemonicWords.length },
      (_, i) => i
    );
    const shuffledIndexes = allIndexes.sort(() => Math.random() - 0.5);
    setRandomIndexes(shuffledIndexes.slice(0, 4));
  };

  // Call getRandomIndexes when the component mounts to generate random indexes
  useEffect(() => {
    getRandomIndexes();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.walletText}>Backup Phrase</Text>
      </View>
      <View style={styles.recoveryPharseTextContainer}>
        <Text style={styles.recoveryPhraseText}> Your recovery phrase</Text>

        <Text style={styles.subText}>
          Write down or copy these words in the right order and save them
          somewhere safe.
        </Text>
      </View>
      <View style={styles.securityMessageContainer}>
        <AlertIcon style={styles.alertImage} />
        <Text style={styles.securityText}>
          Never share recovery phrase with anyone, store it securely!
        </Text>
      </View>
      <View style={styles.securityPhraseContainer}>
        <View style={styles.securityPhraseTextContainer}>
          <View>
            {mnemonicWords.slice(0, 6).map((word, index) => (
              <View style={styles.namesTextContainer} key={index}>
                <Text style={styles.countingText}>{index + 1}</Text>
                <Text style={styles.namesText}>{word}</Text>
              </View>
            ))}
          </View>
          <View>
            {mnemonicWords.slice(6).map((word, index) => (
              <View style={styles.namesTextContainer} key={index}>
                <Text style={styles.countingText}>{index + 7}</Text>
                <Text style={styles.namesText}>{word}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.termsConsentContainer}>
        <CheckBox
          isChecked={isChecked}
          onClick={() => setIsChecked(!isChecked)}
          checkedCheckBoxColor="#F19220"
          style={styles.checkBox}
        />
        <Text style={styles.consentText}>
          I understand that if i loose my recovery words, I will not be able to
          access my wallet
        </Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ConfirmBackupPhrase", {
            mnemonicWords,
            randomIndexes,
          })
        }
        style={[
          styles.importButton,
          isChecked ? styles.importButtonEnabled : styles.importButtonDisabled,
        ]}
        disabled={!isChecked}
      >
        <Text
          style={[
            styles.importText,
            isChecked ? styles.importTextEnabled : styles.importTextDisabled,
          ]}
        >
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BackupPhrase;
