import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import CustomTextInput from "../../components/CustomText";
import { TouchableOpacity } from "react-native-gesture-handler";
import Clipboard from "@react-native-clipboard/clipboard";
// import DocumentScanner from "react-native-document-scanner";
import { ethers } from "ethers";
import "react-native-get-random-values";
import { styles } from "./styles";
import ScanIcon from "../../SvgIcon/ScanIcon";
import BackIcon from "../../SvgIcon/BackIcon";
import PasteIcon from "../../SvgIcon/PasteIcon";

const ImportWallet = ({ navigation }) => {
  const [text, setText] = useState("");
  const handleChangeText = (newText) => {
    setText(newText);
  };

  const handleOnImport = () => {
    const wallet = ethers.Wallet?.fromPhrase(text);

    console.log("check import::::", wallet);
    if (wallet) {
      navigation.navigate("RecoveryPhraseConfirmation");
    } else {
      console.error("Warning: Recovery phrase does not match");
    }
  };

  const importButtonStyle =
    text.length > 12 ? styles.importButtonActive : styles.importButtonInactive;

  const handlePaste = async () => {
    const clipboardContent = await Clipboard.getString();
    setText(clipboardContent);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.walletText}>Import Wallet</Text>
        <TouchableOpacity onPress={() => navigation.navigate("QRScanner")}>
          <ScanIcon style={styles.scanIcon} />
        </TouchableOpacity>
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
            Private Key / Recovery Phrase
          </Text>
        </View>
        <View style={styles.EnterInputContainer}>
          <CustomTextInput
            placeholder="Private Key or Recovery Phrase"
            onChangeText={handleChangeText}
            value={text}
          />
          <TouchableOpacity style={styles.copyPasteIcon} onPress={handlePaste}>
            {/* <Image
              source={require("../../assets/images/paste.png")}
              style={styles.copyPasteImage}
            /> */}
            <PasteIcon style={styles.copyPasteImage} />
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
