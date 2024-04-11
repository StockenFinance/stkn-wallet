import React, { useState, useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import { Picker, PickerIOS } from "@react-native-picker/picker";

const Example = () => {
  const [fiatCurrency, setFiatCurrency] = useState("");
  const [cryptoCurrency, setCryptoCurrency] = useState("");
  const [fiatAmount, setFiatAmount] = useState("");
  const [cryptoAmount, setCryptoAmount] = useState("");
  const [quoteData, setQuoteData] = useState(null);
  const API_KEY = "pk_live_gCcjfuq2Kqof33l1p4iGPpeZGpwFY1";

  // Fetch quote data and handle changes
  useEffect(() => {
    const fetchQuoteData = async () => {
      try {
        const response = await fetch(
          `https://api.moonpay.com/v3/currencies/${cryptoCurrency}/buy_quote?apiKey=${API_KEY}&baseCurrencyAmount=${fiatAmount}&baseCurrencyCode=${fiatCurrency}&fixed=true&areFeesIncluded=true&quoteType=principal`
        );
        const data = await response.json();
        setQuoteData(data);
      } catch (error) {
        console.error("Error fetching quote data:", error);
      }
    };

    if (fiatAmount && fiatCurrency && cryptoCurrency) {
      fetchQuoteData();
    }
  }, [fiatCurrency, cryptoCurrency, fiatAmount]);

  // Update cryptoAmount when quoteData changes
  useEffect(() => {
    if (quoteData) {
      setCryptoAmount(quoteData.totalPayAmount);
    }
  }, [quoteData]);

  return (
    <View>
      <Text>Select Fiat Currency:</Text>
      <Picker
        selectedValue={fiatCurrency}
        onValueChange={(itemValue) => setFiatCurrency(itemValue)}
      >
        {/* Populate options with fiat currencies */}
      </Picker>

      <Text>Enter Fiat Amount:</Text>
      <TextInput
        value={fiatAmount}
        onChangeText={(text) => setFiatAmount(text)}
        keyboardType="numeric"
      />

      <Text>Select Crypto Currency:</Text>
      <Picker
        selectedValue={cryptoCurrency}
        onValueChange={(itemValue) => setCryptoCurrency(itemValue)}
      >
        {/* Populate options with crypto currencies */}
      </Picker>

      <Text>Crypto Amount:</Text>
      <Text>{cryptoAmount}</Text>
    </View>
  );
};

export default Example;
