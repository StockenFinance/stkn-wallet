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
import { setMyTabHide } from "../../redux/reducer/CounterSlice";
import { addCardItem } from "../../redux/reducer/currencyCardSlice";

const WalletManagement = ({ navigation }) => {
  const allWallets = useSelector((state) => state.walletStore.allWallets);

  console.log("allWallets====at=====walletManagement", allWallets);

  const recoveryModal = useSelector(
    (store) => store.walletRecover.recoveryModal
  );

  const dispatch = useDispatch();

  const scrollY = new Animated.Value(0);

  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading indicator

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

  useEffect(() => {
    let defaultObject = [
      {
        symbol: "ETH",
        name: "Ether",
        balance: "0.00",
        decimals: "0",
        price: "3305.41",
        chain: "Ethereum",
      },
      {
        symbol: "MATIC",
        name: "Polygon",
        balance: "0.00",
        decimals: "0",
        price: "0.74",
        chain: "Polygon",
      },
    ];
    dispatch(
      addCardItem({
        cardIndex: allWallets.length - 1,
        newItems: defaultObject,
      })
    );
  }, [allWallets]);
  useEffect(() => {
    dispatch(setMyTabHide(true));
  }, []);

  return (
    <View style={{ marginTop: 30, flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
            dispatch(setMyTabHide(false));
          }}
        >
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.heading}>{t("myWallet")}</Text>
      </View>

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
          <>
            <View>
              {allWallets?.map((wallet, index) => (
                <WalletList
                  key={index}
                  wallet={wallet}
                  walletNumber={index + 1}
                />
              )) || <Text>Please add your wallet</Text>}
            </View>
            <TouchableOpacity
              onPress={() => setStatus(true)}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                // marginTop: "5%",
                marginBottom: "5%",
              }}
            >
              <Text
                style={{ fontWeight: "bold", color: "#039D00", fontSize: 20 }}
              >
                <Text>+</Text> {t("addWallet")}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Animated.ScrollView>

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
