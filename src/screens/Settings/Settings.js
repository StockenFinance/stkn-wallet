import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { styles } from "./styles";
import RightArrowIcon from "../../SvgIcon/RightArrowIcon";
import WalletIcon from "../../SvgIcon/WalletIcon";

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
          {/* <Image
            source={require("../../assets/images/settingsWallet.png")}
            style={styles.image}
            resizeMode="contain"
          /> */}
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
          <Image
            source={require("../../assets/images/language.png")}
            style={styles.languageImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.divider}></View>
        <Text style={styles.createWalletText}>Language</Text>
        <Text style={[styles.currencyText, { marginLeft: "38%" }]}>EN</Text>
      </View>
      <View style={[styles.createWalletView, { marginTop: "2%" }]}>
        <View style={styles.swapImageContainer}>
          <Image
            source={require("../../assets/images/walletConnect.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.divider}></View>
        <Text style={styles.createWalletText}>Wallet Connect</Text>

        <RightArrowIcon style={styles.forwardIcon} />
      </View>
      <View style={[styles.createWalletView, { marginTop: "2%" }]}>
        <View style={styles.swapImageContainer}>
          <Image
            source={require("../../assets/images/customTokens.png")}
            style={{ height: 29, width: 22 }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.divider}></View>
        <Text style={styles.createWalletText}>Custom Tokens</Text>

        <RightArrowIcon style={styles.forwardIcon} />
      </View>
      <View style={[styles.createWalletView, { marginTop: "2%" }]}>
        <View style={styles.swapImageContainer}>
          <Image
            source={require("../../assets/images/lock.png")}
            style={{ width: 22, height: 22 }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.divider}></View>
        <Text style={styles.createWalletText}>Passcode & Face ID</Text>

        <RightArrowIcon style={styles.forwardIcon} />
      </View>
      <View style={[styles.createWalletView, { marginTop: "2%" }]}>
        <View style={styles.swapImageContainer}>
          <Image
            source={require("../../assets/images/recoveryPhrase.png")}
            style={{ width: 22, height: 22 }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.divider}></View>
        <Text style={styles.createWalletText}>View Recovery Phrase</Text>

        <RightArrowIcon style={styles.forwardIcon} />
      </View>
      <View style={[styles.createWalletView, { marginTop: "2%" }]}>
        <View style={styles.swapImageContainer}>
          <Image
            source={require("../../assets/images/key.png")}
            style={{ width: 22, height: 25 }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.divider}></View>
        <Text style={styles.createWalletText}>View Private Key</Text>

        <RightArrowIcon style={styles.forwardIcon} />
      </View>
    </View>
  );
};

export default Settings;
