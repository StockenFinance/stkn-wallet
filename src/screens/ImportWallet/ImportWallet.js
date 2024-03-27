import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import CustomTextInput from "../../components/CustomText";
import { TouchableOpacity } from "react-native-gesture-handler";
import Clipboard from "@react-native-clipboard/clipboard";
// import DocumentScanner from "react-native-document-scanner";
import { ethers } from "ethers";
import "react-native-get-random-values";
import { styles } from "./styles";

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
            source={require("../../assets/images/backIcon.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <Text style={styles.walletText}>Import Wallet</Text>
        <Image
          source={require("../../assets/images/scanner.png")}
          style={styles.scanIcon}
        />
      </View>
      <View style={styles.inputContainer}>
        <View
          style={{
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
              source={require("../../assets/images/paste.png")}
              style={styles.copyPasteImage}
            />
          </TouchableOpacity>
        </View>
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
