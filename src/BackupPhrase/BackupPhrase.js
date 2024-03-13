import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import CheckBox from "react-native-check-box";

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
          <View style={styles.namesTextRow}>
            {mnemonicWords.slice(0, 6).map((word, index) => (
              <View style={styles.namesTextContainer} key={index}>
                <Text style={styles.countingText}>{index + 1}</Text>
                <Text style={styles.namesText}>{word}</Text>
              </View>
            ))}
          </View>
          <View style={styles.namesTextRow}>
            {mnemonicWords.slice(6).map((word, index) => (
              <View style={styles.namesTextContainer} key={index}>
                <Text style={styles.countingText}>{index + 7}</Text>
                <Text style={styles.namesText}>{word}</Text>
              </View>
            ))}
          </View>
          {/* <View> */}
          {/* <View style={{ flexDirection: "row" }}>
              <Text style={styles.countingText}>1</Text>
              <Text style={styles.namesText}>animal</Text>
            </View>
            <View style={{ flexDirection: "row", marginVertical: "10%" }}>
              <Text style={styles.countingText}>2</Text>
              <Text style={styles.namesText}>history</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.countingText}>3</Text>
              <Text style={styles.namesText}>animal</Text>
            </View>
            <View style={{ flexDirection: "row", marginVertical: "10%" }}>
              <Text style={styles.countingText}>4</Text>
              <Text style={styles.namesText}>history</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.countingText}>5</Text>
              <Text style={styles.namesText}>animal</Text>
            </View>
            <View style={{ flexDirection: "row", marginVertical: "10%" }}>
              <Text style={styles.countingText}>6</Text>
              <Text style={styles.namesText}>history</Text>
            </View>
          </View>
          <View>
            <View style={{ flexDirection: "row", marginLeft: "20%" }}>
              <Text style={styles.countingText}>7</Text>
              <Text style={styles.namesText}>animal</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginLeft: "20%",
                marginVertical: "7%",
              }}
            >
              <Text style={styles.countingText}>8</Text>
              <Text style={styles.namesText}>history</Text>
            </View>
            <View style={{ flexDirection: "row", marginLeft: "20%" }}>
              <Text style={styles.countingText}>9</Text>
              <Text style={styles.namesText}>animal</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginLeft: "18%",
                marginVertical: "6%",
              }}
            >
              <Text style={styles.countingText}>10</Text>
              <Text style={[styles.namesText, { marginLeft: "-5%" }]}>
                history
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginLeft: "18%" }}>
              <Text style={styles.countingText}>11</Text>
              <Text style={[styles.namesText, { marginLeft: "-5%" }]}>
                animal
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginLeft: "18%",
                marginVertical: "10%",
              }}
            >
              <Text style={styles.countingText}>12</Text>
              <Text style={[styles.namesText, { marginLeft: "-5%" }]}>
                history
              </Text>
            </View>
          </View> */}
        </View>
      </View>
      <View style={styles.termsConsentContainer}>
        <CheckBox
          isChecked={isChecked}
          onClick={() => setIsChecked(!isChecked)}
          checkedCheckBoxColor="##F19220"
          style={styles.checkBox}
        />
        <Text style={styles.consentText}>
          I undestand that if i loose my recovery words, I will not be able to
          access my wallet
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("ConfirmBackupPhrase")}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "5%",
    marginLeft: "-8%",
  },
  backIcon: {
    width: 25,
    height: 25,
  },
  walletText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#253452",
    marginTop: "-1%",
    marginLeft: "-10%",
  },
  recoveryPharseTextContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "7%",
    width: "80%",
    alignSelf: "center",
  },
  recoveryPhraseText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#253452",
  },
  subText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#9F9FA0",
    textAlign: "center",
    width: "115%",
    marginTop: "4%",
  },
  securityMessageContainer: {
    alignItems: "center",
    alignSelf: "center",
    width: "88%",
    borderWidth: 1,
    borderColor: "#F3AB1D",
    borderRadius: 15,
    height: "12%",
    marginTop: "7%",
    backgroundColor: "#F4F7FA",
  },
  alertImage: {
    width: 38,
    height: 40,
    marginTop: "2%",
  },
  securityText: {
    fontSize: 13,
    fontWeight: "400",
    color: "#000000",
    textAlign: "center",
    width: "85%",
  },
  securityPhraseContainer: {
    alignSelf: "center",
    width: "87%",
    height: "38.5%",
    borderRadius: 15,
    marginTop: "10%",
    backgroundColor: "#F4F7FA",
  },
  securityPhraseTextContainer: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    justifyContent: "space-between",
    marginTop: "3%",
  },
  countingText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#B7BECD",
    marginHorizontal: "8%",
  },
  namesText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#253452",
  },
  termsConsentContainer: {
    flexDirection: "row",
    width: "85%",
    alignSelf: "center",
    marginTop: "13%",
    marginLeft: "5%",
  },
  checkBox: {
    alignSelf: "center",
    marginLeft: "-3%",
    marginHorizontal: "3%",
  },
  consentText: {
    fontSize: 13,
    fontWeight: "400",
    color: "#9F9FA0",
    width: "95%",
  },
  importButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
    width: "85%",
    height: "6.5%",
    alignSelf: "center",
    borderRadius: 15,
    backgroundColor: "#D5DFEB",
  },
  importText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#979797",
  },
  importButtonEnabled: {
    backgroundColor: "#F19220", // Change the background color when button is enabled
  },
  importTextEnabled: {
    color: "#FFFFFF", // Change the text color when button is enabled
  },
  namesTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
});
