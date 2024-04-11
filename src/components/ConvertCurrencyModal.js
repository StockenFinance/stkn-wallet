import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  tokenList,
} from "react-native";
import axios from "axios";

import Modal from "react-native-modal";

const ConvertCurrencyModal = ({
  isVisible,
  onClose,
  selectedCurrency,
  value,
  onSelect,
}) => {
  const [tokenList, setTokenList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.1inch.dev/token/v1.2/1/token-list`,
          {
            headers: {
              Authorization: "Bearer BAJDKr3ufrEEEoqXT7HFJoNCUss9AIX9",
            },
          }
        );
        setTokenList(response.data.tokens);
        console.log("Token list fetched successfully:", response.data.tokens);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (isVisible) {
      setLoading(true);
      fetchData();
    }
  }, [isVisible]);

  const handleChainSelect = (chain) => {
    onSelect(chain);
    onClose();
  };
  // const chains = [
  //   { id: 1, symbol: "BTC" },
  //   { id: 2, symbol: "ETH" },
  //   { id: 3, symbol: "USDT" },
  //   { id: 4, symbol: "BNB" },
  //   { id: 5, symbol: "DAI" },
  //   { id: 6, symbol: "MKR" },
  //   { id: 7, symbol: "VEN" },
  //   { id: 8, symbol: "FTM" },
  //   { id: 9, symbol: "APE" },
  // ];
  return (
    <Modal
      animationType="none"
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropOpacity={0}
      style={styles.modalContainer}
      isVisible={isVisible}
      onBackdropPress={onClose}
    >
      <View style={styles.modalContent}>
        {/* <FlatList
          showsVerticalScrollIndicator={false}
          data={chains}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleChainSelect(item.symbol)}>
              <Text style={styles.chainText}>{item.symbol}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.modalSeparator} />}
        /> */}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={tokenList}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleChainSelect(item.symbol)}>
              <View style={styles.tokenItem}>
                <Image
                  source={{ uri: item.logoURI }}
                  style={styles.tokenLogo}
                />
                <View style={styles.tokenDetails}>
                  {/* <Text style={styles.tokenName}>{item.name}</Text> */}
                  <Text style={styles.tokenSymbol}>{item.symbol}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.address}
          ItemSeparatorComponent={() => <View style={styles.tokenSeparator} />}
        />
      </View>
      {selectedCurrency && (
        <Text style={styles.selectedText}>Selected Chain: {value}</Text>
      )}
    </Modal>
  );
};

export default ConvertCurrencyModal;

const styles = StyleSheet.create({
  modalContent: {
    width: "60%",
    height: "20%",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    alignSelf: "center",
    position: "absolute",
    top: "55%",
    left: "10%",
    borderWidth: 1,
    borderColor: "#253452",
    overflow: "hidden",
  },
  modalSeparator: {
    height: 1,
    backgroundColor: "gray",
    marginVertical: 5,
  },
  modalContainer: {
    justifyContent: "flex-end",
    margin: 0,
  },
  chainText: {
    color: "#253452",
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center",
    marginVertical: "2%",
    marginRight: "5%",
  },
  selectedText: {
    alignSelf: "center",
    marginTop: 10,
    color: "#253452",
    fontSize: 16,
    fontWeight: "bold",
  },
  tokenItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: "2%",
  },
  tokenLogo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: "3%",
  },
  tokenDetails: {
    flex: 1,
    marginLeft: 10,
  },
  // tokenName: {
  //   fontSize: 16,
  //   fontWeight: "bold",
  //   color: "red",
  // },
  tokenSymbol: {
    fontSize: 16,
    color: "#253452",
    fontWeight: "800",
  },
  tokenSeparator: {
    height: 1,
    backgroundColor: "lightgray",
    marginVertical: 5,
  },
});
