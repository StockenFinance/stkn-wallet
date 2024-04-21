import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Share,
} from "react-native";
import React, { useEffect, useState } from "react";
import BackIcon from "../../SvgIcon/BackIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QRCode from "react-native-qrcode-svg";
// import QRCode from "react-native-qrcode-generator";

const ReceiveScreen = ({ navigation }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [lastFourCharacters, setLastFourCharacters] = useState("");

  const getWalletAddress = async () => {
    try {
      const storedWalletAddress = await AsyncStorage.getItem(
        "fullWalletAddress"
      );
      console.log(
        "Wallet address retrieved successfully on receive:",
        storedWalletAddress
      );
      if (storedWalletAddress) {
        setWalletAddress(storedWalletAddress);
        setLastFourCharacters(storedWalletAddress.slice(-4));
      }
    } catch (error) {
      console.error("Error retrieving wallet address:", error);
    }
  };

  useEffect(() => {
    getWalletAddress();
  }, []);

  const shareLink = async (id) => {
    try {
      const result = await Share.share({
        message: `My wallet address: ${walletAddress}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared successfully
          console.log("Link shared successfully");
        } else {
          // Shared successfully
          console.log("Link shared successfully");
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed sharing
        console.log("Sharing dismissed");
      }
    } catch (error) {
      console.error("Error sharing link:", error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: "5%",
          marginTop: "5%",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "10%",
            height: 20,
            backgroundColor: "#F19220",
            borderRadius: 5,
            marginTop: "-3%",
          }}
        >
          <Text style={{ color: "#ffffff", fontSize: 12, textAlign: "center" }}>
            {lastFourCharacters}
          </Text>
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: "30%",
        }}
      >
        {/* <QRCode value={walletAddress} size={200} /> */}
        {/* <QRCode value={walletAddress} size={200} /> */}
        {/* <Image source={require("../../assets/images/QrScanner.png")} /> */}
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text
          numberOfLines={2}
          style={{
            marginTop: "5%",
            width: "60%",
            textAlign: "center",
            color: "#000000",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          {walletAddress}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          width: "87%",
          height: 50,

          alignSelf: "center",
          borderRadius: 15,
          marginTop: "50%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F19220",
        }}
        onPress={shareLink}
      >
        <Text style={{ fontSize: 16, fontWeight: "800", color: "#ffffff" }}>
          Share
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReceiveScreen;

const styles = StyleSheet.create({});
