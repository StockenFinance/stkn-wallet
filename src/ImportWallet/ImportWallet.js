import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import CustomTextInput from "../../components/CustomText";
import { TouchableOpacity } from "react-native-gesture-handler";
import Clipboard from "@react-native-clipboard/clipboard";
import { ethers } from "ethers";
import "react-native-get-random-values";

const ImportWallet = ({ navigation }) => {
  const [text, setText] = useState("");
  const handleChangeText = (newText) => {
    setText(newText);
  };

  const handleOnImport = () => {
    const wallet = ethers.Wallet.fromPhrase(text);
    console.log("check import::::", wallet);
    if (wallet) {
      navigation.navigate("RecoveryPhraseConfirmation");
    } else {
      console.error("Warning: Recovery phrase does not match");
    }
  };

  const importButtonStyle = text
    ? styles.importButtonActive
    : styles.importButtonInactive;

  const handlePaste = async () => {
    const clipboardContent = await Clipboard.getString();
    setText(clipboardContent);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/images/backIcon.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <Text style={styles.walletText}>Import Wallet</Text>
        <Image
          source={require("../assets/images/scanner.png")}
          style={styles.scanIcon}
        />
      </View>
      {/* <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>Private Key/Recovery Phrase</Text>
      </View> */}
      <View style={styles.inputContainer}>
        <View
          style={{
            // flexDirection: "row",
            // justifyContent: "space-between",
            width: "85%",
            alignSelf: "center",
            marginBottom: "3%",
          }}
        >
          <Text style={styles.inputHeaderText}>
            Private Key/recovery Phrase
          </Text>
        </View>
        <View style={styles.EnterInputContainer}>
          <CustomTextInput
            placeholder="Private key or Recovery Phase"
            onChangeText={handleChangeText}
            value={text}
          />
          <TouchableOpacity style={styles.copyPasteIcon} onPress={handlePaste}>
            <Image
              source={require("../assets/images/paste.png")}
              style={styles.copyPasteImage}
            />
          </TouchableOpacity>
        </View>

        {/* <CustomTextInput
          placeholder="Enter your Secret Recovery Phase"
          onChangeText={handleChangeText}
          value={text}
        /> */}
      </View>
      <TouchableOpacity
        style={[styles.importButton, importButtonStyle]}
        onPress={
          importButtonStyle === styles.importButtonActive
            ? handleOnImport
            : null
        }
        disabled={importButtonStyle !== styles.importButtonActive}
      >
        <Text style={[styles.importText, importButtonStyle]}>Import</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImportWallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    alignSelf: "center",
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "11%",
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
  },
  scanIcon: {
    width: 25,
    height: 25,
  },
  headerTextContainer: {
    marginTop: "10%",
    alignItems: "center",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#253452",
  },
  inputHeaderText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#253452",
  },

  inputContainer: {
    marginTop: "10%",
  },
  EnterInputContainer: {
    width: "87%",
    height: 550,
    backgroundColor: "#D5DFEB",
    alignSelf: "center",
    borderRadius: 15,
  },
  importButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
    width: "85%",
    height: 50,
    alignSelf: "center",
    borderRadius: 15,
    backgroundColor: "#D5DFEB",
  },
  importText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#979797",
  },
  importButtonActive: {
    backgroundColor: "#F19220", // Change this to the desired active color
    color: "#ffffff",
  },
  importButtonInactive: {
    backgroundColor: "#D5DFEB", // Default background color
  },
  copyPasteIcon: {
    position: "absolute",
    marginTop: "53%",
    right: 13,
  },
  copyPasteImage: {
    width: 30,
    height: 30,
  },
});
