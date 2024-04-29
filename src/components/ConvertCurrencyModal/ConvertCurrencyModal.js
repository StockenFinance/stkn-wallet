import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  tokenList,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { styles } from "./styles";
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
        // console.log("Token list fetched successfully:", response.data.tokens);
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
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#F19220"
            style={styles.loader}
          />
        ) : (
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
                    <Text style={styles.tokenSymbol}>{item.symbol}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.address}
            ItemSeparatorComponent={() => (
              <View style={styles.tokenSeparator} />
            )}
          />
        )}
      </View>
      {selectedCurrency && (
        <Text style={styles.selectedText}>Selected Chain: {value}</Text>
      )}
    </Modal>
  );
};

export default ConvertCurrencyModal;
