import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import DropDownIcon from "../../SvgIcon/DropDownIcon";
import DebitCardIcon from "../../SvgIcon/DebitCardIcon";
import ConvertCurrencyModal from "../../components/ConvertCurrencyModal/ConvertCurrencyModal";
import BuyCurrancyModal from "../../components/BuyCurrencyModal/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EnglishTranslation from "../../components/englishTranslation";
import ArabicTranslation from "../../components/arabicTranslations";
import MoonPayBuy from "../../components/MoonPayBuy";
import Disclaimer from "../../components/Disclaimer";
import { useTranslation } from "react-i18next";

const BuyScreen = () => {
  const { t, i18n } = useTranslation();

  const [selectedRange, setSelectedRange] = useState(null);
  const [toggleLanguage, setToggleLanguage] = useState(null);

  const [fiatModalVisible, setFiatModalVisible] = useState(false);
  const [cryptoModalVisible, setCryptoModalVisible] = useState(false);
  const [selectedCryptoCurrency, setSelectedCryptoCurrency] = useState("usdt");
  const [selectedFiatCurrency, setSelectedFiatCurrency] = useState("usd");
  const [fiatCurrencies, setFiatCurrencies] = useState([]);
  const [cryptoCurrencies, setCryptoCurrencies] = useState([]);
  const [fiatAmount, setFiatAmount] = useState("100");
  const [cryptoAmount, setCryptoAmount] = useState("");
  const [quoteData, setQuoteData] = useState(null);
  const [status, setStatus] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const openFiatModal = () => {
    setFiatModalVisible(true);
  };

  const closeFiatModal = () => {
    setFiatModalVisible(false);
  };

  const openCryptoModal = () => {
    setCryptoModalVisible(true);
  };

  const closeCryptoModal = () => {
    setCryptoModalVisible(false);
  };

  const handleFiatCurrencySelect = (currency) => {
    setSelectedFiatCurrency(currency);
    closeFiatModal(); // Close fiat modal after selection
  };

  const handleCryptoCurrencySelect = (currency) => {
    setSelectedCryptoCurrency(currency);
    closeCryptoModal();
  };
  const handleRangePress = (range) => {
    setSelectedRange(range);
  };

  const API_KEY = "pk_live_gCcjfuq2Kqof33l1p4iGPpeZGpwFY1";

  useEffect(() => {
    const makeAPICall = async () => {
      try {
        const response = await fetch("https://api.moonpay.com/v3/currencies");
        const data = await response.json();

        const fiat = data.filter((currency) => currency.type === "fiat");
        setFiatCurrencies(fiat);
        const crypto = data.filter((currency) => currency.type === "crypto");
        setCryptoCurrencies(crypto);
      } catch (error) {
        console.error("Error fetching currencies: ", error);
        retrieveSelectedLanguage();
      }
    };

    makeAPICall();
  }, []);

  useEffect(() => {
    const fetchQuoteData = async () => {
      try {
        const response = await fetch(
          `https://api.moonpay.com/v3/currencies/${selectedCryptoCurrency}/buy_quote?apiKey=${API_KEY}&baseCurrencyAmount=${fiatAmount}&baseCurrencyCode=${selectedFiatCurrency}&fixed=true&areFeesIncluded=false&quoteType=principal`
        );
        const data = await response.json();
        setQuoteData(data);
        setCryptoAmount(data?.quoteCurrencyAmount);
      } catch (error) {
        console.error("Error fetching quote data:", error);
      }
    };

    if (fiatAmount && selectedFiatCurrency && selectedFiatCurrency) {
      fetchQuoteData();
    }
  }, [selectedFiatCurrency, selectedFiatCurrency, fiatAmount]);

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

  return (
    <View style={styles.container}>
      <View style={styles.buySellButtonView}>
        <View style={styles.languageButton}>
          <Text style={styles.englishText}>
            {t("buy")}

            {/* {toggleLanguage ? EnglishTranslation.buy : ArabicTranslation.buy} */}
          </Text>
        </View>
        <View
          style={[
            styles.languageButton,
            {
              backgroundColor: "#F4F7FA",
            },
          ]}
        >
          <Text style={[styles.englishText, { color: "#253452" }]}>
            {t("sell")}

            {/* {toggleLanguage ? EnglishTranslation.sell : ArabicTranslation.sell} */}
          </Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.parentView}>
          <Text style={styles.headerText}>
            {t("iHave")}

            {/* {toggleLanguage
              ? EnglishTranslation.iHave
              : ArabicTranslation.iHave} */}
          </Text>
          <View style={styles.coinDetailsParent}>
            <View
              style={[
                styles.allNetworksView,
                { marginLeft: "5%", marginTop: "5%" },
              ]}
            >
              <Image
                source={require("../../assets/images/USD.png")}
                style={styles.coinImage}
              />
              <TouchableOpacity onPress={openFiatModal}>
                <Text
                  style={[
                    styles.allNetworksText,
                    {
                      fontSize: 23,
                      fontWeight: "400",
                      marginLeft: 10,
                      textTransform: "uppercase",
                    },
                  ]}
                >
                  {selectedFiatCurrency}
                </Text>
              </TouchableOpacity>
              <BuyCurrancyModal
                isVisible={fiatModalVisible}
                onClose={closeFiatModal}
                value={selectedFiatCurrency}
                onSelect={handleFiatCurrencySelect}
                data={fiatCurrencies}
                modalHeight={"50%"}
              />

              <DropDownIcon
                style={[
                  styles.dropdownImage,
                  { marginLeft: "-1%", marginTop: "4%" },
                ]}
              />
            </View>

            <TextInput
              value={fiatAmount}
              onChangeText={(text) => setFiatAmount(text)}
              keyboardType="numeric"
              style={styles.balanceText}
            />
          </View>

          {/* <View style={styles.dividerContainer}>
            <View style={styles.divider} />
          </View> */}
          <View style={styles.dividerContainer}></View>

          <Text style={styles.headerText}>
            {/* {" "}
            {toggleLanguage
              ? EnglishTranslation.iWant
              : ArabicTranslation.iWant} */}
            {t("iWant")}
          </Text>
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
              <TouchableOpacity onPress={openCryptoModal}>
                <Text
                  style={[
                    styles.allNetworksText,
                    {
                      fontSize: 23,
                      fontWeight: "400",
                      marginLeft: 10,
                      textTransform: "uppercase",
                    },
                  ]}
                >
                  {selectedCryptoCurrency}
                </Text>
              </TouchableOpacity>
              <BuyCurrancyModal
                isVisible={cryptoModalVisible}
                onClose={closeCryptoModal}
                value={selectedCryptoCurrency}
                onSelect={handleCryptoCurrencySelect}
                data={cryptoCurrencies}
                top={100}
              />
              <DropDownIcon
                style={[
                  styles.dropdownImage,
                  { marginLeft: "-1%", marginTop: "4%" },
                ]}
              />
            </View>

            <Text style={styles.balanceText}>{cryptoAmount}</Text>
          </View>
          <View style={styles.rangeSelectionView}>
            <TouchableOpacity onPress={() => handleRangePress("$150")}>
              <Text
                style={[
                  styles.rangeText,
                  {
                    width: selectedRange === "$150" ? 60 : null,
                    height: selectedRange === "$150" ? 34 : null,
                    borderRadius: selectedRange === "$150" ? 12 : null,
                    color: selectedRange === "$150" ? "#ffffff" : "#253452",
                    padding: selectedRange === "$150" ? "2%" : null,
                    textAlign: "center",
                    backgroundColor:
                      selectedRange === "$150" ? "#F19220" : "transparent",
                  },
                ]}
              >
                $150
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRangePress("$500")}>
              <Text
                style={[
                  styles.rangeText,
                  {
                    width: selectedRange === "$500" ? 60 : null,
                    height: selectedRange === "$500" ? 34 : null,
                    borderRadius: selectedRange === "$500" ? 12 : null,
                    color: selectedRange === "$500" ? "#ffffff" : "#253452",
                    padding: selectedRange === "$500" ? "2%" : null,
                    textAlign: "center",
                    backgroundColor:
                      selectedRange === "$500" ? "#F19220" : "transparent",
                  },
                ]}
              >
                $500
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRangePress("MAX")}>
              <Text
                style={[
                  styles.rangeText,
                  {
                    width: selectedRange === "MAX" ? 60 : null,
                    height: selectedRange === "MAX" ? 34 : null,
                    borderRadius: selectedRange === "MAX" ? 12 : null,
                    color: selectedRange === "MAX" ? "#ffffff" : "#253452",
                    padding: selectedRange === "MAX" ? "2%" : null,
                    textAlign: "center",
                    backgroundColor:
                      selectedRange === "MAX" ? "#F19220" : "transparent",
                  },
                ]}
              >
                {/* {toggleLanguage
                  ? EnglishTranslation.max
                  : ArabicTranslation.max} */}
                {t("max")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={[styles.paymentMethodText]}>
          {/* {toggleLanguage
            ? EnglishTranslation.paymentMethod
            : ArabicTranslation.paymentMethod} */}
          {t("paymentMethod")}
        </Text>
        <TouchableOpacity
          onPress={() => setStatus(true)}
          style={styles.createWalletView}
        >
          <Text
            style={[styles.createWalletText, { textTransform: "uppercase" }]}
          >
            {/* {toggleLanguage ? EnglishTranslation.buy : ArabicTranslation.buy} */}
            {t("buy")}

            {/* {selectedCryptoCurrency} */}
          </Text>
        </TouchableOpacity>
        <Text
          style={[
            styles.paymentMethod,
            // { right: !toggleLanguage ? "10%" : null },
          ]}
        >
          {/* {toggleLanguage
            ? EnglishTranslation.moonPay
            : ArabicTranslation.moonPay} */}
          {t("moonPay")}
        </Text>
        <View style={styles.importButton}>
          {/* <Text style={styles.importText}>
            {" "}
            {toggleLanguage
              ? EnglishTranslation.continueText
              : ArabicTranslation.continueText}
          </Text> */}
        </View>
        {status && <Disclaimer setStatus={setStatus} />}
      </ScrollView>
    </View>
  );
};

export default BuyScreen;
