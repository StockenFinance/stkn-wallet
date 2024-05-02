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
import { provider } from "../../utils/helper";

const WalletManagement = ({ navigation }) => {
  const allWallets = useSelector((state) => state.walletStore.allWallets);
  const [balance, setBalance] = useState({ eth: 0.0, matic: 0.0 });
  const walletAddress = useSelector((state) => state.wallet.walletAddress);
  const walletCardData = useSelector(
    (state) => state.walletcards.walletCardData
  );

  console.log("walletCardData status", walletCardData);
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
  const [ethPrice, setEthPrice] = useState(null);
  const [maticPrice, setMaticPrice] = useState(null);
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // Define the cryptocurrencies you want to get the prices for
        const cryptos = ["ethereum", "matic-network"];

        // Define the CoinGecko API endpoint for getting the price data
        const apiUrl = "https://api.coingecko.com/api/v3/simple/price";

        // Define the parameters for the API request
        const params = {
          ids: cryptos.join(","),
          vs_currencies: "usd", // Get prices in USD
        };

        // Make the API request
        const response = await fetch(
          `${apiUrl}?${new URLSearchParams(params)}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("data for market price", data);

        // Extract the prices for each cryptocurrency
        setEthPrice(data["ethereum"]["usd"]);
        setMaticPrice(data["matic-network"]["usd"]);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchPrices();
  }, []);

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
        balance: balance?.eth,
        decimals: "0",
        price: ethPrice,
        chain: "Ethereum",
      },
      {
        symbol: "MATIC",
        name: "Polygon",
        balance: balance?.matic,
        decimals: "0",
        price: maticPrice,
        chain: "Polygon",
      },
    ];
    dispatch(
      addCardItem({
        cardIndex: allWallets.length - 1,
        newItems: defaultObject,
      })
    );
  }, [allWallets, balance]);

  // useEffect(() => {
  //   dispatch(setMyTabHide(true));
  // }, []);

  useEffect(() => {
    dispatch(setMyTabHide(true));
    return () => {
      dispatch(setMyTabHide(false));
    };
  }, []);

  const getBalance = async () => {
    let balanceEth = await provider("Ethereum").getBalance(walletAddress);
    let balancePoly = await provider("Polygon").getBalance(walletAddress);
    setBalance({
      eth: balanceEth,
      matic: balancePoly,
    });

    console.log("balance from  Balllore and wallet", balanceEth, balancePoly);
  };

  useEffect(() => {
    getBalance();
  }, [walletAddress]);

  return (
    <View style={{ marginTop: 30, flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
            // dispatch(setMyTabHide(false));
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
              {walletCardData?.map((wallet, index) => (
                <WalletList
                  key={index}
                  wallet={wallet.newWalletAddress} // Accessing newWalletAddress object
                  walletNumber={index + 1}
                  index={index}
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
