import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { styles } from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNewWallet, provider, wallet } from "../../utils/helper";
import ImportIcon from "../../SvgIcon/ImportIcon";
import CreateIcon from "../../SvgIcon/CreateIcon";
import HomeLogoIcon from "../../SvgIcon/HomeLogoIcon";
import { saveWalletAddress } from "../../redux/actions/walletActions";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { addWalletAtReduxStore } from "../../redux/reducer/allWalletStore";
import { Utils } from "../../utils/LocalStorage";
import { addWalletCard } from "../../redux/reducer/walletCardSlice";
import { ethers } from "ethers";
import {
  addCardItem,
  updateCardItem,
} from "../../redux/reducer/currencyCardSlice";

const storeWalletAddress = async (walletAddress, wallet) => {
  try {
    const shortenedAddress =
      walletAddress.slice(0, 6) + walletAddress.slice(-6);
    await AsyncStorage.setItem("walletAddress", shortenedAddress);
    await AsyncStorage.setItem("walletObject", JSON.stringify(wallet));
  } catch (error) {
    console.error("Error storing wallet address:", error);
  }
};

const storeFullWalletAddress = async (fullWalletAddress) => {
  try {
    await AsyncStorage.setItem("fullWalletAddress", fullWalletAddress);
    console.log(
      "Full wallet address stored on create wallet:",
      fullWalletAddress
    );
  } catch (error) {
    console.error("Error storing full wallet address:", error);
  }
};

const CreateWallet = ({ navigation, route }) => {
  const { t, i18n } = useTranslation();
  const allWallets = useSelector((state) => state.walletStore.allWallets);

  const [loading, setLoading] = useState(false);
  const [generatedWalletAddress, setGeneratedWalletAddress] = useState("");
  const [walletStore, setWalletStore] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [balance, setBalance] = useState({ eth: 0.0, matic: 0.0 });

  const [ethPrice, setEthPrice] = useState(null);
  const [maticPrice, setMaticPrice] = useState(null);
  const currencyCardData = useSelector(
    (state) => state.currencyCardData.currencyCardData[0]
  );
  console.log("currencyCardData ---------Trenty", currencyCardData);
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

  const dispatch = useDispatch();
  const updatePricesAndBalances = useCallback(() => {
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
        cardIndex: 0,
        newItems: defaultObject,
      })
    );
  }, [balance, maticPrice, ethPrice]);

  const createWallet = () => {
    setLoading(true);
    const { wallet, mnemonic, encryptedWallet } = createNewWallet();
    const phrase = wallet;

    // AsyncStorage.setItem("encryptedWallet", encryptedWallet).catch((err) => {
    //   console.log("Error while setting encrypted wallet: ", err);
    // });

    const shortenedAddress =
      wallet.address.slice(0, 6) + wallet.address.slice(-6);
    setGeneratedWalletAddress(shortenedAddress);
    dispatch(saveWalletAddress(wallet.address));

    storeFullWalletAddress(wallet.address);
    storePrivateKey(wallet.privateKey, 0);

    // dispatch(addWalletAtReduxStore(wallet));
    setWalletStore(wallet);

    // setCardDATAMethod(shortenedAddress);
    navigation.replace("BackupPhrase", {
      walletData: wallet,
      mnemonic,
      selectedLanguage: selectedLanguage,
    });
    setLoading(false);
    updatePricesAndBalances();
  };

  useEffect(() => {
    storeWalletAddress(generatedWalletAddress, walletStore);
    storeFullWalletAddress(walletStore.address);
  }, [generatedWalletAddress, walletStore]);

  useEffect(() => {
    AsyncStorage.getItem("selectedLanguage").then((language) => {
      if (language) {
        setSelectedLanguage(language);
        i18n.changeLanguage(language);
      }
    });
  }, []);

  const storePrivateKey = async (privateKey, index) => {
    try {
      // await AsyncStorage.setItem("privateKey", privateKey);
      let privateKeys = await AsyncStorage.getItem("privateKeys");
      privateKeys = privateKeys ? JSON.parse(privateKeys) : [];

      privateKeys[index] = privateKey;
      await AsyncStorage.setItem("privateKeys", JSON.stringify(privateKeys));
      console.log("Private key stored on create wallet:", privateKey);
    } catch (error) {
      console.error("Error storing private key:", error);
    }
  };

  const getBalance = async () => {
    let balanceEth = await provider("Ethereum").getBalance(walletStore.address);
    let balancePoly = await provider("Polygon").getBalance(walletStore.address);
    console.log("balance from  Balllore", balanceEth, balancePoly);
  };

  useEffect(() => {
    console.log("walletStore", walletStore.address);
    getBalance();
  }, [walletStore]);

  return (
    <View style={styles.container}>
      <HomeLogoIcon style={styles.image} />
      <TouchableOpacity
        style={styles.createWalletView}
        onPress={() => {
          setLoading(true);
          setTimeout(() => {
            createWallet();
          }, 100);
        }}
      >
        <CreateIcon style={styles.createWalletImage} />
        <View style={styles.divider}></View>
        <Text style={styles.createWalletText}>{t("createNewWallet")}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.createWalletView, { marginTop: "5%" }]}
        onPress={() =>
          navigation.navigate("ImportWallet", {
            selectedLanguage: selectedLanguage,
            index: 0,
          })
        }
      >
        <ImportIcon
          style={[styles.createWalletImage, { marginLeft: "10.9%" }]}
        />
        <View style={styles.divider}></View>
        <View style={{ marginLeft: "3%" }}>
          <Text
            style={[
              styles.createWalletText,
              { left: selectedLanguage === "arabic" ? "-25%" : null },
            ]}
          >
            {t("importWallet")}
          </Text>
          <Text
            style={[
              styles.subText,
              { left: selectedLanguage === "arabic" ? "-12%" : null },
            ]}
          >
            {t("privateKeyText")}
          </Text>
        </View>
      </TouchableOpacity>
      {loading && (
        <ActivityIndicator style={styles.loader} size="large" color="#F19220" />
      )}
    </View>
  );
};

export default CreateWallet;
