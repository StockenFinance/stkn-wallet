import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import SwapCurrencyModal from "../../components/SwapCurrencyModal/index";
import { ethers } from "ethers";
import {
  erc20Instance,
  provider,
  decryptWalletFromJson,
} from "../../utils/helper";
import Erc20Contract from "../../contracts/Erc20";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

const SendScreen = ({ placeholder, value, route }) => {
  const { t, i18n } = useTranslation();

  const { selectedSymbol, tokens } = route?.params;
  const [swapCurrencyModalVisible, setSwapCurrencyModalVisible] =
    useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [selectedToken, setSelectedToken] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const [inputValue, setInputValue] = useState({
    to: "",
    from: "",
  });
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("");

  const handleTokenSelect = () => {
    setSelectedToken(token);
    setSwapCurrencyModalVisible(false);
    console.log("Selected Token:", token);
  };

  const onChangeText = (text, inputType) => {
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      [inputType]: text,
    }));
  };

  console.log("check token:::", token);

  const SendMoney = async () => {
    try {
      const encryptedWallet = await AsyncStorage.getItem("encryptedWallet");
      console.log("get encrypted wallet:::::", encryptedWallet);

      const walletWithoutProvider = decryptWalletFromJson(encryptedWallet);
      const wallet = walletWithoutProvider.connect(provider);
      console.log("get encrypted wallet>>>>", wallet);
      handleTokenSelect();
      console.log("Amount:", amount);
      console.log("Selected Token:", selectedToken);
      if (!amount || !selectedToken) {
        console.error("Amount and Token are required.");
        return;
      }

      if (selectedToken.type === "ETH") {
        console.log("if >>>>>>>>>>>", wallet, amount);

        const erc20Prov = new Erc20Contract(selectedToken.address, wallet);

        const amountToSend = ethers.parseUnits(amount, selectedToken.decimals);
        console.log("ERC20:::", erc20Prov);
        console.log("check wallet data::::", wallet);

        const tx = await erc20Prov
          .transfer("0xdAC17F958D2ee523a2206206994597C13D831ec7", amountToSend)
          .then((data) => {
            console.log("Txn details on success: ", data);
          })
          .catch((err) => {
            console.error(err);
          });
        console.log("ERC20 Transaction details:", tx);
      } else {
        console.log(">>>>>>>>>>>", wallet, amount);
        wallet
          .sendTransaction({
            to: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
            value: ethers.parseUnits(amount, 18),
          })
          .then((data) => {
            console.log("Ether Transaction details:", data);
          })
          .catch((err) => {
            console.error("Error sending Ether transaction:", err);
          });
      }
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  };

  const handleSend = () => {
    console.log("Sending amount:", amount, "Token:", token);
    onClose();
  };
  useEffect(() => {
    setAmount("");
    setToken("");
  }, []);

  useEffect(() => {
    if (token) {
      setSelectedToken(token);
    }
  }, [token]);

  const isButtonDisabled = amount.trim() === "" || token.trim() === "";

  useEffect(() => {
    // Retrieve the selected language from AsyncStorage on component mount
    AsyncStorage.getItem("selectedLanguage").then((language) => {
      if (language) {
        setSelectedLanguage(language);
        i18n.changeLanguage(language);
      }
    });
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <View style={styles.allNetworksView}>
            <View style={styles.coinImageContainer}>
              <Image
                source={require("../../assets/images/ethereum.png")}
                style={styles.coinImage}
              />
            </View>
            <Text style={styles.allNetworksText}>Ethereum</Text>
            <Image
              source={require("../../assets/images/dropdown.png")}
              style={styles.dropdownImage}
            />
          </View>
        </View>
        <View style={styles.parentView}>
          <Text style={styles.headerText}>{t("wantToSend")}</Text>
          <View style={styles.coinDetailsParent}>
            <View
              style={[
                styles.allNetworksView,
                { marginLeft: "5%", marginTop: "5%" },
              ]}
            >
              <View style={[styles.coinImageContainer, { width: 40 }]}>
                <Image
                  source={require("../../assets/images/ethereum.png")}
                  style={styles.coinImage}
                />
              </View>

              <TouchableOpacity
                onPress={() => setSwapCurrencyModalVisible(true)}
              >
                <Text
                  style={[
                    styles.allNetworksText,
                    { fontSize: 23, fontWeight: "400" },
                  ]}
                >
                  {selectedSymbol}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSwapCurrencyModalVisible(true)}
              >
                <Image
                  source={require("../../assets/images/dropdown.png")}
                  style={[
                    styles.dropdownImage,
                    { marginLeft: "-1%", marginTop: "4%" },
                  ]}
                />
              </TouchableOpacity>
              <SwapCurrencyModal
                transparent={true}
                isVisible={swapCurrencyModalVisible}
                onClose={() => setSwapCurrencyModalVisible(false)}
                // onSelect={handleCurrencySelect}
                value={selectedCurrency}
                tokens={tokens}
                onSelect={handleTokenSelect}
              />
            </View>

            <Text style={styles.balanceText}>You have 0 Ethereum</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholderTextColor={"grey"}
              placeholder={"0.00"}
              onChangeText={setAmount}
              value={amount}
              style={styles.input}
            />
            <Text style={styles.usdPrice}>$0.00</Text>
          </View>
          <View style={styles.amountRangeView}>
            <Text style={styles.amountRangeText}>{t("min")}</Text>
            <Text style={styles.amountRangeText}>{t("half")}</Text>
            <Text style={styles.amountRangeText}>{t("max")}</Text>
          </View>
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <View style={styles.swapImageContainer}>
              <Image
                source={require("../../assets/images/Send.png")}
                style={styles.image}
                resizeMode="contain"
              />
            </View>

            <View style={styles.divider} />
          </View>

          <Text style={styles.headerText}>{t("to")}</Text>

          <View style={styles.inputContainer}>
            <TextInput
              placeholderTextColor={"grey"}
              placeholder={"Address or Domain"}
              onChangeText={setToken}
              value={token}
              style={styles.input}
            />
          </View>
          <View style={styles.currencyConvertView}>
            <Text style={styles.currencyConverterText}>
              {t("transactionApi")}
            </Text>
          </View>
        </View>
        {/* <View style={styles.importButton}> */}
        <TouchableOpacity
          onPress={SendMoney}
          style={[styles.doneButton, isButtonDisabled && styles.disabledButton]}
          disabled={isButtonDisabled}
        >
          <Text
            style={[styles.importText, isButtonDisabled && styles.disabledText]}
          >
            {t("send")}
          </Text>
        </TouchableOpacity>
        {/* </View> */}
      </ScrollView>
    </View>
  );
};

export default SendScreen;
