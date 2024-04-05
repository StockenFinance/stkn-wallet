import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Modal from "react-native-modal";

const BuyCurrancyModal = ({
  isVisible,
  onClose,
  selectedCurrency,
  value,
  onSelect,
}) => {
  const [fiatCurrencies, setFiatCurrencies] = useState([]);
  const [cryptoCurrencies, setCryptoCurrencies] = useState([]);

  useEffect(() => {
    makeAPICall();
  }, []);

  const makeAPICall = async () => {
    try {
      const response = await fetch("https://api.moonpay.com/v3/currencies");
      const data = await response.json();

      const fiat = data.filter((currency) => currency.type === "fiat");
      const crypto = data.filter((currency) => currency.type === "crypto");

      setFiatCurrencies(fiat);
      setCryptoCurrencies(crypto);
    } catch (error) {
      console.error("Error fetching currencies: ", error);
    }
  };

  const handleChainSelect = (chain) => {
    onSelect(chain);
    onClose();
  };

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
        <FlatList
          showsVerticalScrollIndicator={false}
          data={[...fiatCurrencies, ...cryptoCurrencies]}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleChainSelect(item.name)}>
              <Text style={styles.chainText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.modalSeparator} />}
        />
      </View>
      {selectedCurrency && (
        <Text style={styles.selectedText}>Selected Chain: {value}</Text>
      )}
    </Modal>
  );
};

export default BuyCurrancyModal;

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
});
