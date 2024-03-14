import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import CheckBox from "react-native-check-box";
import { styles } from "./styles";

const BackupPhrase = ({ navigation, route }) => {
  const { mnemonic } = route.params;
  const mnemonicWords = mnemonic.split(" ");
  const [isChecked, setIsChecked] = useState(false);

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
        <Text style={styles.recoveryPhraseText}> Your Recovery Phrase</Text>

        <Text style={styles.subText}>
          Write down or copy these words in the right order and save them
          somewhere safe.
        </Text>
      </View>
      <View style={styles.securityMessageContainer}>
        <Image
          source={require("../assets/images/alert.png")}
          style={styles.alertImage}
        />
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
          I undestand that if i loose my recovery words, I will not be able to
          access my wallet
        </Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ConfirmBackupPhrase", { mnemonicWords })
        }
        style={[
          styles.importButton,
          isChecked ? styles.importButtonEnabled : null,
        ]}
      >
        <Text
          style={[
            styles.importText,
            isChecked ? styles.importTextEnabled : null,
          ]}
        >
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BackupPhrase;
