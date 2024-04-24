import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WalletList from "./WalletList";
import BackIcon from "../../SvgIcon/BackIcon";
import AddWalletModal from "../../components/AddWalletModal";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const WalletManagement = ({ navigation }) => {
  const allWallets = useSelector((state) => state.walletStore.allWallets);

  console.log("allWallets====at=====walletManagement", allWallets);

  const recoveryModal = useSelector(
    (store) => store.walletRecover.recoveryModal
  );

  const scrollY = new Animated.Value(0);

  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(true); // State for loading indicator

  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    AsyncStorage.getItem("selectedLanguage").then((language) => {
      if (language) {
        setSelectedLanguage(language);
        i18n.changeLanguage(language);
      }
    });
  }, []);

  return (
    <View style={{ marginTop: 30, flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.heading}>{t("myWallet")}</Text>
      </View>
      {!recoveryModal ? (
        <Animated.ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          {loading ? (
            <ActivityIndicator
              styl={{ marginTop: 50 }}
              size="large"
              color="#F2A13F"
            />
          ) : (
            <View>
              {allWallets?.map((wallet, index) => (
                <WalletList
                  key={index}
                  wallet={wallet}
                  walletNumber={index + 1}
                />
              )) || <Text>Please add your wallet</Text>}
            </View>
          )}
        </Animated.ScrollView>
      ) : (
        <View>
          {allWallets?.map((wallet, index) => (
            <WalletList key={index} wallet={wallet} walletNumber={index + 1} />
          )) || <Text>Please add your wallet</Text>}
        </View>
      )}
      <TouchableOpacity
        onPress={() => setStatus(true)}
        style={{ position: "absolute", top: 400, left: 120 }}
      >
        <Text style={{ fontWeight: "bold", color: "#039D00", fontSize: 20 }}>
          <Text>+</Text> {t("addWallet")}
        </Text>
      </TouchableOpacity>
      {status && (
        <AddWalletModal setStatus={setStatus} navigation={navigation} />
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
