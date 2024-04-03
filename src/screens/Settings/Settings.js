import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { styles } from "./styles";
import RightArrowIcon from "../../SvgIcon/RightArrowIcon";
import WalletIcon from "../../SvgIcon/WalletIcon";
import KeyIcon from "../../SvgIcon/KeyIcon";
import WalletConnectIcon from "../../SvgIcon/WalletConnectIcon";
import LanguageIcon from "../../SvgIcon/LanguageIcon";
import LockIcon from "../../SvgIcon/LockIcon";
import RecoveryPhraseIcon from "../../SvgIcon/RecoveryPhraseIcon";
import CustomTokenIcon from "../../SvgIcon/CustomTokenIcon";

const Settings = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Image
          source={require("../../assets/images/backIcon.png")}
          style={styles.backIcon}
        /> */}
        <Text style={styles.walletText}>Settings</Text>
      </View>
      <View style={styles.createWalletView}>
        <View style={styles.swapImageContainer}>
          <WalletIcon color={"white"} />
        </View>
        <View style={styles.divider}></View>
        <Text style={styles.createWalletText}>Wallets Management</Text>
        <RightArrowIcon style={styles.forwardIcon} />
      </View>
      <View style={[styles.createWalletView, { marginTop: "2%" }]}>
        <View style={styles.swapImageContainer}>
          <Text style={styles.dollarText}>$</Text>
        </View>
        <View style={styles.divider}></View>
        <Text style={styles.createWalletText}>Set Currency</Text>
        <Text style={styles.currencyText}>USD</Text>
      </View>
      <View style={[styles.createWalletView, { marginTop: "2%" }]}>
        <View style={styles.swapImageContainer}>
          <LanguageIcon style={styles.languageImage} />
        </View>
        <View style={styles.divider}></View>
        <Text style={styles.createWalletText}>Language</Text>
        <Text style={[styles.currencyText, { marginLeft: "38%" }]}>EN</Text>
      </View>
      <View style={[styles.createWalletView, { marginTop: "2%" }]}>
        <View style={styles.swapImageContainer}>
          <WalletConnectIcon style={styles.image} />
        </View>
        <View style={styles.divider}></View>
        <Text style={styles.createWalletText}>Wallet Connect</Text>

        <RightArrowIcon style={styles.forwardIcon} />
      </View>
      <View style={[styles.createWalletView, { marginTop: "2%" }]}>
        <View style={styles.swapImageContainer}>
          <CustomTokenIcon />
        </View>
        <View style={styles.divider}></View>
        <Text style={styles.createWalletText}>Custom Tokens</Text>

        <RightArrowIcon style={styles.forwardIcon} />
      </View>
      <View style={[styles.createWalletView, { marginTop: "2%" }]}>
        <View style={styles.swapImageContainer}>
          <LockIcon />
        </View>
        <View style={styles.divider}></View>
        <Text style={styles.createWalletText}>Passcode & Face ID</Text>

        <RightArrowIcon style={styles.forwardIcon} />
      </View>
      <View style={[styles.createWalletView, { marginTop: "2%" }]}>
        <View style={styles.swapImageContainer}>
          <RecoveryPhraseIcon />
        </View>
        <View style={styles.divider}></View>
        <Text style={styles.createWalletText}>View Recovery Phrase</Text>

        <RightArrowIcon style={styles.forwardIcon} />
      </View>
      <View style={[styles.createWalletView, { marginTop: "2%" }]}>
        <View style={styles.swapImageContainer}>
          <KeyIcon />
        </View>
        <View style={styles.divider}></View>
        <Text style={styles.createWalletText}>View Private Key</Text>

        <RightArrowIcon style={styles.forwardIcon} />
      </View>
    </View>
  );
};

export default Settings;
