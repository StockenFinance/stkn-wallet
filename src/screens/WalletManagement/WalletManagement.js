import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WalletList from "./WalletList";
import BackIcon from "../../SvgIcon/BackIcon";
import { useSelector } from "react-redux";

const WalletManagement = ({ navigation }) => {
  const [wallets, setWallets] = useState([]);
  const { recoveryModal } = useSelector((state) => state.counter);
  const scrollY = new Animated.Value(0);

  useEffect(() => {
    const retrieveWallets = async () => {
      try {
        const serializedWallets = await AsyncStorage.getItem(`wallets`);
        if (serializedWallets !== null) {
          const parsedWallets = JSON.parse(serializedWallets);
          setWallets(parsedWallets);
        }
      } catch (error) {
        console.error("Error retrieving wallets:", error);
      }
    };
    retrieveWallets();
  }, []);

  console.log("walltes", wallets);

  return (
    <View style={{ marginTop: 30, flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.heading}>My wallets</Text>
      </View>
      {console.log("recoveryMOdal", recoveryModal)}
      {!recoveryModal ? (
        <Animated.ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          <View>
            {wallets?.map((wallet, index) => {
              return (
                <WalletList
                  key={index}
                  wallet={wallet}
                  walletNumber={index + 1}
                />
              );
            }) || "Please add your wallet"}
          </View>
        </Animated.ScrollView>
      ) : (
        <View>
          {wallets?.map((wallet, index) => {
            return (
              <WalletList
                key={index}
                wallet={wallet}
                walletNumber={index + 1}
              />
            );
          }) || "Please add your wallet"}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    marginLeft: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 110,
    color: "black",
  },
});

export default WalletManagement;
