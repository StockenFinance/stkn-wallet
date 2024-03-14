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

const ConfirmBackupPhrase = ({
  placeholder,
  onChangeText,
  value,
  navigation,
}) => {
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
              <Text style={styles.countingText}>1</Text>
              <Text style={styles.namesText}>history</Text>
            </View>
            <View style={{ flexDirection: "row", marginVertical: "10%" }}>
              <Text style={styles.countingText}>2</Text>
              <Text style={styles.namesText}>novel</Text>
            </View>
          </View>
          <View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={"grey"}
                placeholder={placeholder}
                onChangeText={onChangeText}
                value={value}
                style={styles.input}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholderTextColor={"grey"}
                placeholder={placeholder}
                onChangeText={onChangeText}
                value={value}
                style={styles.input}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.languageButtonContainer}>
        <View style={styles.languageButton}>
          <Text style={styles.englishText}>choice</Text>
        </View>
        <View style={styles.languageButton}>
          <Text style={[styles.englishText]}>much</Text>
        </View>
        <View style={styles.languageButton}>
          <Text style={[styles.englishText]}>animal</Text>
        </View>
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
