import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { styles } from "./styles";
import ChainSelectionModal from "../../components/ChainSelectionModal";
import axios from "axios";
import SwapCurrencyModal from "../../components/SwapCurrencyModal";

const SwapScreen = ({}) => {
  const [chainSelectionModalVisible, setChainSelectionModalVisible] =
    useState(false);
  const [selectedChain, setSelectedChain] = useState(null);
  const [swapCurrencyModalVisible, setSwapCurrencyModalVisible] =
    useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  const [inputValue, setInputValue] = useState({
    to: "",
    from: "",
  });

  const handleChainSelect = (chain) => {
    setSelectedChain(chain);
    setChainSelectionModalVisible(false);
  };

  const handleCurrencySelect = (chain) => {
    setSelectedCurrency(chain);
    setSwapCurrencyModalVisible(false);
  };

  const handleChangeText = (text) => {
    setInputValue((prevState) => ({
      ...prevState,
      from: text,
    }));
    httpCall(text);
  };

  async function httpCall(text) {
    const url = "https://api.1inch.dev/swap/v6.0/1/quote";

    const config = {
      headers: {
        Authorization: "Bearer BAJDKr3ufrEEEoqXT7HFJoNCUss9AIX9",
      },
      params: {
        src: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        dst: "0x111111111117dc0aa78b770fa6a738034120c302",
        amount: "5",
      },
    };

    try {
      const response = await axios.get(url, config);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <View style={styles.allNetworksView}>
            <View>
              <Image
                source={require("../../assets/images/allNetwork.png")}
                style={styles.allNetworksImage}
              />
            </View>
            <TouchableOpacity
              onPress={() => setChainSelectionModalVisible(true)}
            >
              <Text style={styles.allNetworksText}>
                {" "}
                {selectedChain ? selectedChain : "All Networks"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setChainSelectionModalVisible(true)}
            >
              <Image
                source={require("../../assets/images/dropdown.png")}
                style={styles.dropdownImage}
              />
              <ChainSelectionModal
                transparent={true}
                isVisible={chainSelectionModalVisible}
                onClose={() => setChainSelectionModalVisible(false)}
                onSelect={handleChainSelect}
                value={selectedChain}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.parentView}>
          <Text style={styles.headerText}>I want to Swap</Text>
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
                  {selectedCurrency ? selectedCurrency : "All Networks"}
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
                onSelect={handleCurrencySelect}
                value={selectedCurrency}
              />
            </View>

            <Text style={styles.balanceText}>You have 0 Ethereum</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholderTextColor={"grey"}
              placeholder={"0.00"}
              onChangeText={(text) => handleChangeText(text)}
              value={inputValue.from}
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
                source={require("../../assets/images/swap.png")}
                style={styles.image}
                resizeMode="contain"
              />
            </View>

            <View style={styles.divider} />
          </View>

          <Text style={styles.headerText}>I want to Get</Text>
          <View style={styles.coinDetailsParent}>
            <View
              style={[
                styles.allNetworksView,
                { marginLeft: "5%", marginTop: "5%" },
              ]}
            >
              <View
                style={[
                  styles.coinImageContainer,
                  { width: 40, backgroundColor: "#449393" },
                ]}
              >
                <Image
                  source={require("../../assets/images/usdt.png")}
                  style={{ width: 24, height: 20 }}
                />
              </View>
              <Text
                style={[
                  styles.allNetworksText,
                  { fontSize: 23, fontWeight: "400" },
                ]}
              >
                USDT
              </Text>
              <Image
                source={require("../../assets/images/dropdown.png")}
                style={[
                  styles.dropdownImage,
                  { marginLeft: "-1%", marginTop: "4%" },
                ]}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholderTextColor={"grey"}
              placeholder={"0.00"}
              // onChangeText={onChangeText}
              value={inputValue.to}
              style={styles.input}
              editable={false}
            />
            <Text style={styles.usdPrice}>$0.00</Text>
          </View>
          <View style={styles.currencyConvertView}>
            <Text style={styles.currencyConverterText}>
              1 ETH = 2,947.7868 USDC
            </Text>
            <Text
              numberOfLines={2}
              style={[
                styles.currencyConverterText,
                { textAlign: "center", width: "120%", marginTop: "-1%" },
              ]}
            >
              Swap services are available through third-party API providers
            </Text>
          </View>
        </View>
        {/* <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            marginLeft: "5%",
            marginTop: "5%",
            width: "89%",
          }}
        >
          <View>
            <Text style={styles.alertMessage}>
              {" "}
              There's no ETH in your wallet.
            </Text>
            <Text style={styles.alertMessage}>
              {" "}
              Deposit or but ETH , then try again
            </Text>
          </View>
          <View style={styles.languageButton}>
            <Text style={styles.englishText}>Buy ETH</Text>
          </View>
        </View> */}
        <TouchableOpacity style={styles.importButton}>
          <Text style={styles.importText}>Confirm</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SwapScreen;
