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
import SwapCurrencyModal from "../../components/SwapCurrencyModal";
import { ethers } from "ethers";
import { erc20Instance, provider, wallet } from "../../utils/helper";
import Erc20Contract from "../../contracts/Erc20";

const SendScreen = ({ placeholder, value, route }) => {
  const { selectedSymbol, tokens } = route?.params;
  const [swapCurrencyModalVisible, setSwapCurrencyModalVisible] =
    useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [selectedToken, setSelectedToken] = useState(null);
  const [inputValue, setInputValue] = useState({
    to: "",
    from: "",
  });
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("");

  const handleTokenSelect = (token) => {
    setSelectedToken(token);
    setSwapCurrencyModalVisible(false);
  };

  const onChangeText = (text, inputType) => {
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      [inputType]: text,
    }));
  };

  const SendMoney = async () => {
    try {
      if (!amount) {
        console.error("Amount is required.");
        return;
      }

      if ("0xdAC17F958D2ee523a2206206994597C13D831ec7") {
        const erc20Prov = new Erc20Contract(
          "0xdAC17F958D2ee523a2206206994597C13D831ec7",
          wallet
        );

        const amountToSend = ethers.parseUnits(amount, 18);
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

  const isButtonDisabled = amount.trim() === "" || token.trim() === "";
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
          <Text style={styles.headerText}>I want to Send</Text>
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
            <Text style={styles.amountRangeText}>MIN</Text>
            <Text style={styles.amountRangeText}>HALF</Text>
            <Text style={styles.amountRangeText}>MAX</Text>
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

          <Text style={styles.headerText}>To</Text>

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
              Transactions are irreversible Make sure you are on the right
              network and sending the right amount to the right address
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
            Send
          </Text>
        </TouchableOpacity>
        {/* </View> */}
      </ScrollView>
    </View>
  );
};

export default SendScreen;
