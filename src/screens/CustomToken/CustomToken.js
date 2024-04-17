import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EnglishTranslation from "../../components/englishTranslation";
import ArabicTranslation from "../../components/arabicTranslations";
import { tokenDetail } from "../../utils/helper";
import PasteIcon from "../../SvgIcon/PasteIcon";
import BackIcon from "../../SvgIcon/BackIcon";
import { styles } from "./style";

const CustomToken = ({ navigation }) => {
  const [tokenNumber, setTokenNumber] = useState("");
  const [selectedChain, setSelectedChain] = useState("");
  const [toggleLanguage, setToggleLanguage] = useState(null);

  const [tokenDetails, setTokenDetails] = useState({
    name: "",
    decimals: "",
    symbol: "",
    balance: "",
    price: "",
  });

  useEffect(() => {
    retrieveSelectedLanguage();
  }, []);

  const retrieveSelectedLanguage = async () => {
    try {
      const language = await AsyncStorage.getItem("selectedLanguage");
      if (language !== null) {
        console.log("Retrieved language:", language);
        let bool = language === "english" ? true : false;
        setToggleLanguage(bool);
      } else {
        console.log("No language saved in AsyncStorage");
        setToggleLanguage(true);
      }
    } catch (error) {
      console.error("Error retrieving language from AsyncStorage:", error);
    }
  };

  const handleInputChange = async (text) => {
    setTokenNumber(text);
    if (text.trim() !== "") {
      try {
        const res = await tokenDetail(text);
        if (res.success) {
          const { tokenName, decimals, symbol, balance } = res.success;
          console.log("Balance test::::", tokenName, decimals, symbol, balance);
          fetchCryptoPrice(symbol).then((usdPrice) => {
            console.log("UES ReS:::", usdPrice);
            // setCryptoPrice(usdPrice);
            setTokenDetails({
              name: tokenName,
              decimals: decimals,
              symbol: symbol,
              balance: balance,
              price: usdPrice?.USD,
            });
          });
        } else {
          setTokenDetails({
            name: "",
            decimals: "",
            symbol: "",
            balance: "",
            price: "",
          });
        }
      } catch (error) {
        console.error("Error fetching token details:", error);
        setTokenDetails({
          name: "",
          decimals: "",
          symbol: "",
          balance: "",
          price: "",
        });
      }
    } else {
      setTokenDetails({
        name: "",
        decimals: "",
        symbol: "",
        balance: "",
        price: "",
      });
    }
  };

  const handlePaste = async () => {
    const clipboardContent = await Clipboard.getString();
    console.log("clipb", clipboardContent);
    setTokenNumber(clipboardContent);
    handleInputChange(clipboardContent);
  };

  const handleChainSelect = (chain) => {
    setSelectedChain(chain);
    // Perform actions based on the selected chain
  };

  const fetchCryptoPrice = async (symbol) => {
    try {
      const response = await fetch(
        `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD`,
        {
          method: "GET",
          headers: {
            authorization:
              "Apikey e57b6c192b0fbff2e8d9b70d69c431241cafb59da93761a188ab02bd1591c729",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      console.log("Crypto price data in USD Test:", data);

      return data;
    } catch (error) {
      console.error("Error fetching crypto price:", error);
    }
  };

  const isButtonDisabled =
    tokenNumber.trim() === "" ||
    tokenDetails.name.trim() === "" ||
    (!tokenDetails.decimals && tokenDetails.decimals !== 0) ||
    tokenDetails.symbol.trim() === "" ||
    selectedChain.trim() === "";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>

        <Text style={styles.heading}>
          {toggleLanguage
            ? EnglishTranslation.addCustomToken
            : ArabicTranslation.addCustomToken}
        </Text>
      </View>

      <View style={styles.tokenDetailsContainer}>
        <Text style={styles.label}>
          {" "}
          {toggleLanguage
            ? EnglishTranslation.enterToken
            : ArabicTranslation.enterToken}
        </Text>
        <TextInput
          placeholderTextColor={"#7483A1"}
          style={[styles.input]}
          placeholder={toggleLanguage ? "Enter Token" : "أدخل الرمز المميز"}
          value={tokenNumber}
          onChangeText={(text) => handleInputChange(text)}
        />
        <TouchableOpacity style={styles.pasteIcon} onPress={handlePaste}>
          <PasteIcon style={styles.pasteIconImage} />
        </TouchableOpacity>
      </View>

      <View style={styles.tokenDetailsContainer}>
        <Text style={styles.label}>
          {toggleLanguage ? EnglishTranslation.name : ArabicTranslation.name}
        </Text>
        <TextInput
          style={styles.detailInput}
          value={tokenDetails.name}
          editable={false}
        />
        <Text style={styles.label}>
          {toggleLanguage
            ? EnglishTranslation.symbol
            : ArabicTranslation.symbol}
        </Text>
        <TextInput
          style={styles.detailInput}
          value={tokenDetails.symbol}
          editable={false}
        />
        <Text style={styles.label}>
          {toggleLanguage
            ? EnglishTranslation.decimal
            : ArabicTranslation.decimal}
        </Text>
        <TextInput
          style={styles.detailInput}
          value={tokenDetails.decimals.toString()}
          editable={false}
        />
      </View>

      <TouchableOpacity
        style={[styles.addButton, isButtonDisabled && styles.disabledButton]}
        disabled={isButtonDisabled}
        onPress={() => {
          // Handle add custom token action
        }}
      >
        <Text style={styles.addButtonText}>
          {toggleLanguage
            ? EnglishTranslation.importToken
            : ArabicTranslation.importToken}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomToken;
