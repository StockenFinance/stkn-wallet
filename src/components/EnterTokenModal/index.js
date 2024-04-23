import React, { useState, useEffect, useCallback } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";
import { tokenDetail } from "../../utils/helper";
import { ethers } from "ethers";
import PasteIcon from "../../SvgIcon/PasteIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EnglishTranslation from "../englishTranslation";
import ArabicTranslation from "../arabicTranslations";
import { useTranslation } from "react-i18next";
import { styles } from "./styles";
import { Utils } from "../../utils/LocalStorage";
import { RadioButton } from "@react-native-paper/radio-button";

const EnterTokenModal = ({
  isVisible,
  onClose,
  modalValues,
  importTokenAddress,
}) => {
  const { t, i18n } = useTranslation();

  const [tokenNumber, setTokenNumber] = useState("");
  const [toggleLanguage, setToggleLanguage] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [storedTokens, setStoredTokens] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Ethereum");

  const [tokenDetails, setTokenDetails] = useState({
    name: "",
    decimals: "",
    symbol: "",
    balance: "",
    price: "",
    chain: "",
  });

  const handleOverlayPress = (event) => {
    if (event?.target === event?.currentTarget) {
      setTokenNumber("");
      modalValues(tokenDetails);
      setTokenDetails({
        name: "",
        decimals: "",
        symbol: "",
        balance: "",
        chain: "",
      });
      onClose();
    }
  };
  const handlePaste = async () => {
    const clipboardContent = await Clipboard.getString();
    console.log("clipb", clipboardContent);
    setTokenNumber(clipboardContent);
    handleInputChange(clipboardContent);
  };

  const isButtonDisabled =
    tokenNumber.trim() === "" ||
    tokenDetails.name.trim() === "" ||
    (!tokenDetails.decimals && tokenDetails.decimals !== 0) ||
    tokenDetails.symbol.trim() === "";
  const debounceAsync = (func, delay) => {
    let timeoutId;
    return (...args) => {
      return new Promise((resolve, reject) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(async () => {
          try {
            const result = await func(...args);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }, delay);
      });
    };
  };

  // const handleInputChange = async (text) => {
  //   setTokenNumber(text);
  //   if (text.trim() !== "") {
  //     try {
  //       const res = await tokenDetail(text);
  //       if (res.success) {
  //         const { tokenName, decimals, symbol, balance } = res.success;
  //         console.log("Balance test::::", tokenName, decimals, symbol, balance);
  //         fetchCryptoPrice(symbol).then((usdPrice) => {
  //           console.log("UES ReS:::", usdPrice);
  //           // setCryptoPrice(usdPrice);
  //           setTokenDetails({
  //             name: tokenName,
  //             decimals: decimals,
  //             symbol: symbol,
  //             balance: balance,
  //             price: usdPrice?.USD,
  //           });
  //         });
  //       } else {
  //         setTokenDetails({
  //           name: "",
  //           decimals: "",
  //           symbol: "",
  //           balance: "",
  //           price: "",
  //         });
  //       }
  //     } catch (error) {
  //       console.error("Error fetching token details:", error);
  //       setTokenDetails({
  //         name: "",
  //         decimals: "",
  //         symbol: "",
  //         balance: "",
  //         price: "",
  //       });
  //     }
  //   } else {
  //     setTokenDetails({
  //       name: "",
  //       decimals: "",
  //       symbol: "",
  //       balance: "",
  //       price: "",
  //     });
  //   }
  // };

  const handleInputChange = async (text) => {
    setTokenNumber(text);
    if (text.trim() !== "") {
      try {
        console.log("selectedOption before res", selectedOption);
        const res = await tokenDetail(text, selectedOption);
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
              chain: selectedOption,
            });
            // Add token address to storedTokens array
            setStoredTokens((prevTokens) => [...prevTokens, text]);
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

  const debouncedTokenDetail = debounceAsync(tokenDetail, 3000);

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

  useEffect(() => {
    // Retrieve the selected language from AsyncStorage on component mount
    AsyncStorage.getItem("selectedLanguage").then((language) => {
      if (language) {
        setSelectedLanguage(language);
        i18n.changeLanguage(language);
      }
    });
  }, []);

  useEffect(() => {
    if (storedTokens.length > 0) {
      Utils.setStoreData("STOREDTOKEN", storedTokens);
      console.log("success token::::", storedTokens);
    }
  }, [storedTokens]);

  console.log("check token import :::::", storedTokens);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    console.log("selected option", selectedOption);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handleOverlayPress}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.HeaderText}>{t("enterToken")}</Text>

            <View style={styles.TokenInputContainer}>
              <Text style={styles.contractAddressText}>
                {t("contractAddress")}
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholderTextColor={"#7483A1"}
                  style={styles.input}
                  placeholder={"0x..."}
                  value={tokenNumber}
                  onChangeText={(text) => {
                    setTokenNumber(text);
                    importTokenAddress(text);
                    handleInputChange(text);
                    setStoredTokens((pre) => {
                      return [...pre, text];
                    });
                  }}
                />
              </View>
            </View>

            {/* Read-only TextInputs */}
            <View style={styles.readOnlyInputsContainer}>
              <Text style={styles.nameText}>{t("name")}</Text>
              <TextInput
                style={styles.readOnlyInput}
                value={tokenDetails.name}
                editable={false}
              />
              <Text style={styles.symbolText}>{t("symbol")}</Text>
              <TextInput
                style={styles.readOnlyInput}
                value={tokenDetails.symbol}
                editable={false}
              />
              <Text style={styles.symbolText}>{t("decimal")}</Text>
              <TextInput
                style={styles.readOnlyInput}
                value={tokenDetails.decimals.toString()}
                editable={false}
              />
            </View>
            <Text
              style={{ marginTop: "-3%", color: "#000000", fontWeight: "800" }}
            >
              Select Chain
            </Text>
            <View style={styles.radioButtonContainer}>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  selectedOption === "Ethereum" && styles.radioButtonSelected,
                ]}
                onPress={() => handleOptionChange("Ethereum")}
              ></TouchableOpacity>
              <Text style={styles.radioText}>Ethereum</Text>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  selectedOption === "Polygon" && styles.radioButtonSelected,
                ]}
                onPress={() => handleOptionChange("Polygon")}
              ></TouchableOpacity>
              <Text style={styles.radioText}>Polygon</Text>
            </View>
            <TouchableOpacity
              style={styles.copyPasteIcon}
              onPress={handlePaste}
            >
              <PasteIcon style={styles.copyPasteImage} />
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.doneButton,
                  isButtonDisabled && styles.disabledButton,
                ]}
                disabled={isButtonDisabled}
                onPress={() => {
                  handleOverlayPress();
                }}
              >
                <Text style={styles.doneButtonText}>{t("importToken")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default EnterTokenModal;
