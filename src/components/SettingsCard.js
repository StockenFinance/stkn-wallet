import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const SettingsCard = ({ imageSource, walletText, iconImage }) => {
  return (
    <View style={styles.container}>
      <View style={styles.createWalletView}>
        <View style={styles.swapImageContainer}>
          <Image
            source={imageSource}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.divider}></View>
        <Text style={styles.createWalletText}>{walletText}</Text>
        <Image source={iconImage} style={styles.forwardIcon} />
      </View>
    </View>
  );
};

export default SettingsCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  createWalletView: {
    flexDirection: "row",
    alignItems: "center",
    width: "93%",
    height: 53,
    marginTop: "10%",
    alignSelf: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#808BA0",
  },
  createWalletImage: {
    alignSelf: "center",
    width: 34,
    height: 34,
    marginLeft: "10%",
    marginHorizontal: "5%",
  },
  createWalletText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#233452",
    marginLeft: "7%",
  },
  divider: {
    height: "70%",
    width: 1,
    backgroundColor: "#000000",
  },
  forwardIcon: {
    width: 20,
    height: 20,
    right: 5,
    marginTop: "1%",
  },
  swapImageContainer: {
    width: 35,
    height: 35,
    borderRadius: 10,
    backgroundColor: "#F2A13F",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "5%",
    marginLeft: "5%",
  },
  image: {
    width: 19,
    height: 17,
    marginHorizontal: 10,
  },
});
