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
import ChainSelectionModal from "../../components/ChainSelectionModal";
import axios from "axios";
import SwapCurrencyModal from "../../components/SwapCurrencyModal/index";
import ConvertCurrencyModal from "../../components/ConvertCurrencyModal/ConvertCurrencyModal";
import AllNetworkIcon from "../../SvgIcon/AllNetworkIcon";
import DropDownIcon from "../../SvgIcon/DropDownIcon";
import SwapIcon from "../../SvgIcon/SwapIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EnglishTranslation from "../../components/englishTranslation";
import ArabicTranslation from "../../components/arabicTranslations";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const SwapScreen = ({ route, tokenList }) => {
  const { t, i18n } = useTranslation();

  const walletIndex = route?.params?.walletIndex
    ? route?.params?.walletIndex
    : 0;
  const itemIndex = route?.params?.itemIndex ? route?.params?.itemIndex : 0;

  const currencyCardData = useSelector(
    (state) => state.currencyCardData.currencyCardData[walletIndex][itemIndex]
  );

  const [chainSelectionModalVisible, setChainSelectionModalVisible] =
    useState(false);
  const [selectedChain, setSelectedChain] = useState(null);
  const [swapCurrencyModalVisible, setSwapCurrencyModalVisible] =
    useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(
    currencyCardData?.symbol
  );

  const [convertCurrencyModalVisible, setConvertCurrencyModalVisible] =
    useState(false);
  const [convertedCurrency, setConvertedCurrency] = useState(null);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [toggleLanguage, setToggleLanguage] = useState(null);
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const [inputValue, setInputValue] = useState({
    to: "",
    from: "",
  });

  const handleChainSelect = (chain) => {
    setSelectedChain(chain);
    setChainSelectionModalVisible(false);
  };

  const handleConvertCurrencySelect = (chain) => {
    setConvertedCurrency(chain);
    setConvertCurrencyModalVisible(false);
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
    const calculatedPriceResult = text * 2.9477868;
    setCalculatedPrice(calculatedPriceResult);

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
    } catch (error) {
      console.error(error);
    }
  }

  console.log("selectedCurrency-----zumba", selectedCurrency);
  useEffect(() => {
    retrieveSelectedLanguage();
  }, []);

  const retrieveSelectedLanguage = async () => {
    try {
      const language = await AsyncStorage.getItem("selectedLanguage");
      if (language !== null) {
        let bool = language === "english" ? true : false;
        setToggleLanguage(bool);
      } else {
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

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <View style={styles.allNetworksView}>
            <View>
              <AllNetworkIcon style={styles.allNetworksImage} />
            </View>
            <TouchableOpacity
              onPress={() => setChainSelectionModalVisible(true)}
            >
              <Text style={styles.allNetworksText}>
                {" "}
                {selectedChain ? selectedChain : t("allNetworkText")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setChainSelectionModalVisible(true)}
            >
              <DropDownIcon style={styles.dropdownImage} />
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
          <Text style={styles.headerText}>{t("wantToSwap")}</Text>
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
                    { fontSize: 23, fontWeight: "400", marginLeft: 8 },
                  ]}
                >
                  {selectedCurrency}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSwapCurrencyModalVisible(true)}
              >
                <DropDownIcon
                  style={[
                    styles.dropdownImage,
                    { marginLeft: "-1%", marginTop: "4%" },
                  ]}
                />
              </TouchableOpacity>
              <SwapCurrencyModal
                isVisible={swapCurrencyModalVisible}
                onClose={() => setSwapCurrencyModalVisible(false)}
                value={selectedCurrency}
                onPress={(value) => setSelectedCurrency(value)}
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
            <Text
              style={[
                styles.amountRangeText,
                {
                  fontSize: !toggleLanguage ? 14 : 10,
                  fontWeight: !toggleLanguage ? "900" : "600",
                },
              ]}
            >
              {t("min")}
            </Text>
            <Text
              style={[
                styles.amountRangeText,
                {
                  fontSize: !toggleLanguage ? 14 : 10,
                  fontWeight: !toggleLanguage ? "900" : "600",
                },
              ]}
            >
              {t("half")}
            </Text>
            <Text
              style={[
                styles.amountRangeText,
                {
                  fontSize: !toggleLanguage ? 14 : 10,
                  fontWeight: !toggleLanguage ? "900" : "600",
                },
              ]}
            >
              {t("max")}
            </Text>
          </View>
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <View style={styles.swapImageContainer}>
              <SwapIcon color={"white"} />
            </View>

            <View style={styles.divider} />
          </View>

          <Text style={styles.headerText}>{t("wantToGet")}</Text>
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
              <TouchableOpacity
                onPress={() => setConvertCurrencyModalVisible(true)}
              >
                <Text
                  style={[
                    styles.allNetworksText,
                    { fontSize: 23, fontWeight: "400", marginLeft: 8 },
                  ]}
                >
                  {convertedCurrency ? convertedCurrency : "USDT"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setConvertCurrencyModalVisible(true)}
              >
                <DropDownIcon
                  style={[
                    styles.dropdownImage,
                    { marginLeft: "-1%", marginTop: "4%" },
                  ]}
                />
              </TouchableOpacity>
              <ConvertCurrencyModal
                transparent={true}
                isVisible={convertCurrencyModalVisible}
                onClose={() => setConvertCurrencyModalVisible(false)}
                onSelect={handleConvertCurrencySelect}
                value={convertedCurrency}
                selectedCurrency={selectedCurrency}
                tokenList={tokenList}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholderTextColor={"grey"}
              placeholder={calculatedPrice.toFixed(2)}
              onChangeText={(text) => handleChangeText(text)}
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
              {t("swapServicesMessage")}
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
          <Text style={styles.importText}>{t("confirm")}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SwapScreen;
