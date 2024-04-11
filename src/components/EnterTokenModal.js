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
import { tokenDetail } from "../utils/helper";
import { ethers } from "ethers";
import PasteIcon from "../SvgIcon/PasteIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EnglishTranslation from "./englishTranslation";
import ArabicTranslation from "./arabicTranslations";

const EnterTokenModal = ({ isVisible, onClose, modalValues }) => {
  const [tokenNumber, setTokenNumber] = useState("");
  const [toggleLanguage, setToggleLanguage] = useState(null);

  const [tokenDetails, setTokenDetails] = useState({
    name: "",
    decimals: "",
    symbol: "",
    balance: "",
    price: "",
  });

  const handleOverlayPress = (event) => {
    if (event?.target === event?.currentTarget) {
      setTokenNumber("");
      modalValues(tokenDetails);
      setTokenDetails({ name: "", decimals: "", symbol: "", balance: "" });
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

  // const handleInputChange = useCallback(async (clipboardContent) => {
  //   console.log("first", tokenNumber);
  //   console.log("clipboardContent", clipboardContent);
  //   let res = await tokenDetail(clipboardContent);
  //   console.log("res", res);

  //   if (res.success) {
  //     const { tokenName, decimals, symbol } = res.success;
  //     setTokenDetails({ name: tokenName, decimals: decimals, symbol: symbol });
  //   }
  // });

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

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handleOverlayPress}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.HeaderText}>
              {toggleLanguage
                ? EnglishTranslation.enterToken
                : ArabicTranslation.enterToken}
            </Text>

            <View style={styles.TokenInputContainer}>
              <TextInput
                placeholderTextColor={"#7483A1"}
                style={styles.input}
                placeholder={
                  toggleLanguage ? "Enter Token" : "أدخل الرمز المميز"
                }
                value={tokenNumber}
                onChangeText={(text) => {
                  setTokenNumber(text);
                  handleInputChange(text);
                }}
              />
            </View>

            {/* Read-only TextInputs */}
            <View style={styles.readOnlyInputsContainer}>
              <Text
                style={{
                  color: "black",
                  textAlign: "center",
                  marginTop: "-3%",
                  fontWeight: "900",
                }}
              >
                {toggleLanguage
                  ? EnglishTranslation.name
                  : ArabicTranslation.name}
              </Text>
              <TextInput
                style={styles.readOnlyInput}
                value={tokenDetails.name}
                editable={false}
              />
              <Text
                style={{
                  color: "black",
                  textAlign: "center",
                  fontWeight: "900",
                }}
              >
                {toggleLanguage
                  ? EnglishTranslation.symbol
                  : ArabicTranslation.symbol}
              </Text>
              <TextInput
                style={styles.readOnlyInput}
                value={tokenDetails.symbol}
                editable={false}
              />
              <Text
                style={{
                  color: "black",
                  textAlign: "center",
                  fontWeight: "900",
                }}
              >
                {toggleLanguage
                  ? EnglishTranslation.decimal
                  : ArabicTranslation.decimal}
              </Text>
              <TextInput
                style={styles.readOnlyInput}
                value={tokenDetails.decimals.toString()}
                editable={false}
              />
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
                <Text style={styles.doneButtonText}>
                  {toggleLanguage
                    ? EnglishTranslation.importToken
                    : ArabicTranslation.importToken}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "73%",
    height: 420,
    backgroundColor: "white",
    padding: "5%",
    borderRadius: 12,
    alignItems: "center",
    marginTop: "10%",
  },
  HeaderText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#494949",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: "13%",
  },
  doneButton: {
    width: "55%",
    height: 45,
    borderColor: "#ffffff",
    borderWidth: 0.5,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F19220",
    marginTop: "-15%",
  },
  doneButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
  },
  TokenInputContainer: {
    marginRight: "35%",
    width: "70%",
    marginTop: "8%",
  },
  input: {
    width: 220,
    height: 50,
    borderColor: "#E9E9E9",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    paddingVertical: 8,
    marginRight: 10,
    color: "black",
  },
  readOnlyInputsContainer: {
    // flexDirection: "row",
    margin: 20,
    // alignSelf: "center",
  },
  readOnlyInput: {
    width: 120,
    height: 45,
    borderColor: "#E9E9E9",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    color: "black",
    marginVertical: "2%",
    marginHorizontal: "2%",
    textAlign: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  copyPasteIcon: {
    position: "absolute",
    marginTop: "30%",
    right: 15,
  },
  copyPasteImage: {
    width: 25,
    height: 25,
  },
});

export default EnterTokenModal;
