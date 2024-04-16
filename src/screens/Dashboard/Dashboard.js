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
import AllNetworkIcon from "../../SvgIcon/AllNetworkIcon";
import DropDownIcon from "../../SvgIcon/DropDownIcon";
import TimerIcon from "../../SvgIcon/TimerIcon";
import ModalDotIcon from "../../SvgIcon/ModalDotIcon";
import WalletImageSvg from "../../SvgIcon/WalletImageSvg";
import { createNewWallet, provider } from "../../utils/helper";
import EnglishTranslation from "../../components/englishTranslation";
import ArabicTranslation from "../../components/arabicTranslations";
import PlusIcon from "../../SvgIcon/PluseIcon";
import ReceiveScannerIcon from "../../SvgIcon/ReceiveScannerIcon";

const Dashboard = ({ navigation }) => {
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [allNetworksModalVisible, setAllNetworksModalVisible] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isTokenDetailsModalVisible, setIsTokenDetailsModalVisible] =
    useState(false);
  const [tokenInput, setTokenInput] = useState("");
  const [totalBalance, setTotalBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [generatedWalletAddress, setGeneratedWalletAddress] = useState("");
  const [walletStore, setWalletStore] = useState("");
  const [toggleLanguage, setToggleLanguage] = useState(null);

  const [newAccount, setNewAccount] = useState([
    {
      newWalletAddress: "",
      newWalletBalance: "",
    },
  ]);

  const [cardData, setCardData] = useState([
    {
      symbol: "ETH",
      name: "Ether",
      balance: "0.00",
      decimals: "0",
      price: "3547.41",
    },
  ]);

  console.log("wallet addresss>>>>", walletAddress);

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

  const addTokenBtn = async (value) => {
    // Store updated tokens in AsyncStorage
    storeTokens([...cardData, value]);
    toggleEnterTokenModal();
    if (
      value.name.trim() === "" ||
      // value.decimals.trim() === "" ||
      value.symbol.trim() === ""
    ) {
      alert("Value contains empty fields. Not adding to array.");
      // alert("value is alrady exist we can not allow to import same value");
      // setCardData((prevData) => [...prevData, value]);

      calculateTotalBalance();
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
    const newBalance = totalBalance + parseFloat(value.price);
    setTotalBalance(newBalance);
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
      <CurrencyDetailsCard item={item} navigation={navigation} />
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

  const storeTokens = async (tokens) => {
    try {
      const serializedTokens = JSON.stringify(tokens, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      );
      await AsyncStorage.setItem("importedTokens", serializedTokens);
      console.log("Tokens stored successfully.", serializedTokens);
    } catch (error) {
      console.error("Error storing tokens:", error);
    }
  };

  // Function to retrieve tokens from AsyncStorage
  const retrieveTokens = async () => {
    try {
      const serializedTokens = await AsyncStorage.getItem("importedTokens");
      if (serializedTokens !== null) {
        const tokens = JSON.parse(serializedTokens);
        console.log("Tokens retrieved successfully:", tokens);
        return tokens;
      } else {
        console.log("No tokens found in storage.");
        return [];
      }
    } catch (error) {
      console.error("Error retrieving tokens:", error);
      return [];
    }
  };

  // Call retrieveTokens on app load to get stored tokens
  useEffect(() => {
    retrieveTokens().then((tokens) => {
      if (tokens.length > 0) {
        setCardData(tokens);
      }
    });
  }, []);

  useEffect(() => {
    const fetchWalletAddress = async () => {
      try {
        const walletAddress = await AsyncStorage.getItem("walletAddress");
        console.log("local storage >>>", walletAddress);
        if (walletAddress) {
          setNewAccount((prevAccount) => {
            return [
              {
                ...prevAccount[0], // Keep other properties unchanged
                newWalletAddress: walletAddress,
              },
              ...prevAccount.slice(1), // Keep other accounts unchanged
            ];
          });
        }
      } catch (error) {
        console.error(
          "Error fetching wallet address from AsyncStorage:",
          error
        );
      }
    };

    fetchWalletAddress();
  }, []);

  const createWallet = () => {
    setLoading(true);
    const { wallet, mnemonic } = createNewWallet();
    const phrase = ethers.Wallet.fromPhrase(mnemonic);

    console.log("Phrase wallet: ", JSON.stringify(phrase, null, 2));
    console.log("Phrase wallet: ", phrase?.privateKey);
    console.log("Wallet: ", JSON.stringify(wallet, null, 2));
    console.log("New Wallet Address:", wallet.address);
    console.log("Private Key:", wallet.privateKey);
    console.log("Generated Mnemonic:", mnemonic);
    const shortenedAddress =
      wallet.address.slice(0, 6) + wallet.address.slice(-6);
    setGeneratedWalletAddress(shortenedAddress);
    setWalletStore(wallet);
    setNewAccount((prevAccount) => [
      ...prevAccount,
      {
        newWalletAddress: shortenedAddress,
        newWalletBalance: "", // You can set the initial balance here if needed
      },
    ]);
    console.log("walet response?????", wallet);
  };

  // const storeWalletAddress = async (walletAddress, wallet) => {
  //   try {
  //     const shortenedAddress =
  //       walletAddress.slice(0, 6) + walletAddress.slice(-6);
  //     // await AsyncStorage.clear();
  //     await AsyncStorage.setItem("walletAddress", shortenedAddress);

  //     console.log("wallet address stored on Dashboard:::", walletAddress);

  //     await AsyncStorage.setItem("walletObject", JSON.stringify(wallet));
  //     console.log("wallet  stored:::", wallet);
  //   } catch (error) {
  //     console.error("Error storing wallet address:", error);
  //   }
  // };

  // useEffect(() => {
  //   storeWalletAddress(generatedWalletAddress, walletStore);
  // }, [generatedWalletAddress, walletStore]);

  console.log("new wallet account>>>>>>", newAccount);

  useEffect(() => {
    retrieveSelectedLanguage();
    checkAsyncStorageStatus();
  }, []);

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
  const checkAsyncStorageStatus = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      console.log("All AsyncStorage Keys:", allKeys);

      // Loop through all keys and get their corresponding values
      for (const key of allKeys) {
        const value = await AsyncStorage.getItem(key);
        console.log(`Value for key"${key}":`, value);
      }
    } catch (error) {
      console.error("Error checking AsyncStorage status:", error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.allNetworksView}>
          <AllNetworkIcon style={styles.allNetworksImage} />
          <TouchableOpacity onPress={() => setAllNetworksModalVisible(true)}>
            <Text style={styles.allNetworksText}>
              {toggleLanguage
                ? EnglishTranslation.allNetworkText
                : ArabicTranslation.allNetrworkText}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setAllNetworksModalVisible(true)}>
            <DropDownIcon style={styles.dropdownImage} />
            <AllNetworksModal
              transparent={true}
              isVisible={allNetworksModalVisible}
              onClose={() => setAllNetworksModalVisible(false)}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.timerImage}>
          <TouchableOpacity onPress={() => createWallet()}>
            <Text
              style={{
                color: "#253452",
                fontSize: 14,
                fontWeight: "600",
                left: "15%",
              }}
            >
              {toggleLanguage
                ? EnglishTranslation.addNewWallet
                : ArabicTranslation.addNewWallet}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {newAccount.map((item) => {
            return (
              <>
                <LinearGradient
                  colors={["#F19220", "#BE6800"]}
                  start={{ x: -0.2, y: 0.1 }}
                  end={{ x: 1, y: 0 }}
                  style={[
                    styles.wallet,
                    {
                      borderRadius: 10,
                      overflow: "hidden",
                    },
                  ]}
                >
                  <View style={styles.walletContentContainer}>
                    <View>
                      <Text style={styles.walletName}>
                        {toggleLanguage
                          ? EnglishTranslation.wallet
                          : ArabicTranslation.wallet}
                      </Text>
                      <Text style={styles.walletCode}>
                        {item?.newWalletAddress}
                      </Text>
                    </View>
                  </View>

                  <WalletImageSvg style={styles.walletImage} />

                  <Text
                    style={[
                      styles.receiveText,
                      { right: !toggleLanguage ? 25 : 10 },
                    ]}
                  >
                    {toggleLanguage
                      ? EnglishTranslation.receive
                      : ArabicTranslation.receive}
                  </Text>
                  <ReceiveScannerIcon
                    color={"white"}
                    style={{ position: "absolute", top: 27, right: 18 }}
                  />
                  <View style={styles.walletBalanceContainer}>
                    <View>
                      <Text style={styles.yourBalanceText}>
                        {toggleLanguage
                          ? EnglishTranslation.yourBalance
                          : ArabicTranslation.yourBalance}
                      </Text>
                      <Text style={styles.balanceText}>
                        ${totalBalance.toFixed(2)}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                      <View style={styles.modalIconContainer}>
                        <ModalDotIcon style={styles.modalDotImage} />
                        <CustomModal
                          transparent={true}
                          isVisible={modalVisible}
                          onClose={() => setModalVisible(false)}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </>
            );
          })}
        </ScrollView>
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
        <PlusIcon style={styles.plusImage} />
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
