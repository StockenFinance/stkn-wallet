import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import LinearGradient from "react-native-linear-gradient";
import CustomModal from "../../components/customModal";
import { styles } from "./styles";
import { currencyData } from "../../components/coinDetailsData";
import CurrencyDetailsCard from "../../components/CurrencyDetailsCard";
import EnterTokenModal from "../../components/EnterTokenModal";
import AllNetworksModal from "../../components/AllNetworksModal";
import { ethers } from "ethers";
import Erc20Contract from "../../contracts/Erc20";
import { tokenDetail } from "../../utils/helper";
import { fetchCryptoData } from "../../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Dashboard = () => {
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [allNetworksModalVisible, setAllNetworksModalVisible] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isTokenDetailsModalVisible, setIsTokenDetailsModalVisible] =
    useState(false);
  const [tokenInput, setTokenInput] = useState("");
  const [totalBalance, setTotalBalance] = useState(0);

  const [cardData, setCardData] = useState([
    {
      symbol: "ETH",
      name: "Ether",
      balance: "0.00",
      decimals: "0",
      price: "3547.41",
    },
  ]);

  const retrieveWalletAddress = async () => {
    try {
      const walletAddress = await AsyncStorage.getItem("walletAddress");
      console.log("wallet address fetched::", walletAddress);
      return walletAddress;
    } catch (error) {
      console.error("Error retrieving wallet address:", error);
      return null;
    }
  };

  useEffect(() => {
    retrieveWalletAddress().then((address) => {
      if (address) {
        setWalletAddress(address);
      } else {
        console.log("Wallet address not found.");
      }
    });
    calculateTotalBalance();
  }, []);

  const calculateTotalBalance = () => {
    let sum = 0;
    cardData.forEach((item) => {
      sum += parseFloat(item.price);
    });
    setTotalBalance(sum);
  };

  const addTokenBtn = (value) => {
    toggleEnterTokenModal();
    if (
      value.name.trim() === "" ||
      // value.decimals.trim() === "" ||
      value.symbol.trim() === ""
    ) {
      alert("Value contains empty fields. Not adding to array.");
      // alert("value is alrady exist we can not allow to import same value");
      // setCardData((prevData) => [...prevData, value]);

      calculateTotalBalance(); // Recalculate total balance after adding a new token
      return;
    }

    const formattedValue = {
      ...value,
      decimals: parseFloat(value.decimals).toFixed(0),
    };

    const isDuplicate = cardData.some((item) => isEqual(item, formattedValue));

    if (isDuplicate) {
      alert("Value already exists in cardData. Not adding to array.");
      return;
    }

    console.log("token input value", formattedValue);
    setCardData((prevData) => [...prevData, formattedValue]);
  };

  function isEqual(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      const val1 = obj1[key];
      const val2 = obj2[key];

      if (typeof val1 === "object" && typeof val2 === "object") {
        if (!isEqual(val1, val2)) {
          return false;
        }
      } else if (val1 !== val2) {
        return false;
      }
    }

    return true;
  }
  const toggleEnterTokenModal = () => {
    setIsTokenDetailsModalVisible(!isTokenDetailsModalVisible);
  };

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(contentOffsetX / 335);
    setActiveDotIndex(pageIndex);
  };

  const renderItem = ({ item, index }) => (
    <View style={{ marginBottom: index === cardData.length - 1 ? "10%" : 0 }}>
      <CurrencyDetailsCard item={item} />
    </View>
  );

  useEffect(() => {
    async function testIntegration() {
      const provider = new ethers.JsonRpcProvider(
        "https://mainnet.infura.io/v3/c5a9eaae75b04ad78aeb479a275fa884"
      );
      const erc20Prov = new Erc20Contract(
        "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        provider
      );

      console.log(
        "Test function:",
        await erc20Prov.balanceOf("0x28C6c06298d514Db089934071355E5743bf21d60"),
        await erc20Prov.symbol(),
        await erc20Prov.name(),
        await erc20Prov.decimals()
      );
      console.log(" erc20Prov.symbol()");
      console.log("provider.getSigner()", provider.getSigner());
      provider
        .getBlockNumber()
        .then((blockNumber) => {
          console.log("Current block number:", blockNumber);
        })
        .catch((err) => {
          console.error("Error fetching block number:", err);
        });
    }
    testIntegration()
      .then((blockNumber) => {
        console.log("main", blockNumber);
      })
      .catch((err) => {
        console.error("main error:", err);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.allNetworksView}>
          <Image
            source={require("../../assets/images/allNetwork.png")}
            style={styles.allNetworksImage}
          />
          <TouchableOpacity onPress={() => setAllNetworksModalVisible(true)}>
            <Text style={styles.allNetworksText}>All Networks</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setAllNetworksModalVisible(true)}>
            <Image
              source={require("../../assets/images/dropdown.png")}
              style={styles.dropdownImage}
            />
            <AllNetworksModal
              transparent={true}
              isVisible={allNetworksModalVisible}
              onClose={() => setAllNetworksModalVisible(false)}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.timerImage}>
          <Image source={require("../../assets/images/timer.png")} />
        </View>
      </View>
      <View>
        <LinearGradient
          colors={["#F19220", "#BE6800"]}
          start={{ x: -0.2, y: 0.1 }}
          end={{ x: 1, y: 0 }}
          style={[styles.wallet, { borderRadius: 10, overflow: "hidden" }]}
        >
          <View style={styles.walletContentContainer}>
            <View>
              <Text style={styles.walletName}>Wallet</Text>
              <Text style={styles.walletCode}>{walletAddress} </Text>
            </View>
          </View>

          <Image
            source={require("../../assets/images/walletImage.png")}
            style={styles.walletImage}
          />

          <Text style={styles.receiveText}>Receive</Text>
          <Image
            source={require("../../assets/images/receiveScanner.png")}
            style={{ position: "absolute", top: 27, right: 18 }}
          />
          <View style={styles.walletBalanceContainer}>
            <View>
              <Text style={styles.yourBalanceText}>Your balance</Text>
              <Text style={styles.balanceText}>${totalBalance.toFixed(2)}</Text>
            </View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <View style={styles.modalIconContainer}>
                <Image
                  source={require("../../assets/images/modalDot.png")}
                  style={styles.modalDotImage}
                />

                <CustomModal
                  transparent={true}
                  isVisible={modalVisible}
                  onClose={() => setModalVisible(false)}
                />
              </View>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
      <View style={{ flex: 0.8 }}>
        <FlatList
          data={cardData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
      </View>
      <TouchableOpacity
        style={{ alignItems: "flex-end" }}
        onPress={toggleEnterTokenModal}
        // onPress={handleFetchData}
      >
        <Image
          source={require("../../assets/images/plus.png")}
          style={styles.plusImage}
        />
      </TouchableOpacity>
      <EnterTokenModal
        value={tokenInput}
        modalValues={(value) => addTokenBtn(value)}
        onChangeText={(text) => setTokenInput(text)}
        // onPress={() => handleToken()}
        isVisible={isTokenDetailsModalVisible}
        onClose={toggleEnterTokenModal}
      />
    </View>
  );
};

export default Dashboard;