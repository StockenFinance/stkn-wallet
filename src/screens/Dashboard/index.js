import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import LinearGradient from "react-native-linear-gradient";
import CustomModal from "../../components/CustomModal/index";
import { styles } from "./styles";
import CurrencyDetailsCard from "../../components/CurrencyDetailsCard";
import EnterTokenModal from "../../components/EnterTokenModal/index";
import AllNetworksModal from "../../components/AllNetWorksModal/index";
import { ethers } from "ethers";
import Erc20Contract from "../../contracts/Erc20";
import { tokenDetail } from "../../utils/helper";
import { fetchCryptoData } from "../../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AllNetworkIcon from "../../SvgIcon/AllNetworkIcon";
import DropDownIcon from "../../SvgIcon/DropDownIcon";
import { createNewWallet, provider } from "../../utils/helper";
import EnglishTranslation from "../../components/englishTranslation";
import ArabicTranslation from "../../components/arabicTranslations";
import { useTranslation } from "react-i18next";
import ChainSelectionModal from "../../components/ChainSelectionModal";
import ModalDotIcon from "../../SvgIcon/ModalDotIcon";
import { setCurrentChain } from "../../redux/reducer/chainReducer";
import { useDispatch } from "react-redux";
import ReceiveScannerIcon from "../../SvgIcon/ReceiveScannerIcon";
import PlusIcon from "../../SvgIcon/PluseIcon";
import WalletImageSvg from "../../SvgIcon/WalletImageSvg";

const Dashboard = ({ navigation }) => {
  const { t, i18n } = useTranslation();

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [wallets, setWallets] = useState([]);
  const [fullWalletAddress, setFullWalletAddress] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [chainSelectionModalVisible, setChainSelectionModalVisible] =
    useState(false);
  const [selectedChain, setSelectedChain] = useState(null);
  const [calculatedBalance, setCalculatedBalance] = useState(0);
  const [calculatedAmount, setCalculatedAmount] = useState(0);
  const [chainStatus, setChainStatus] = useState("All Network");
  const [importTokenAddress, setImportTokenValue] = useState("");
  const dispatch = useDispatch();

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
      chain: "Ethereum",
    },
  ]);

  //full wallet address

  useEffect(() => {
    // Function to retrieve wallet address
    const retrieveWalletAddress = async () => {
      try {
        const walletAddress = await AsyncStorage.getItem("fullWalletAddress");
        console.log("wallet address fetched::", walletAddress);
        setFullWalletAddress(walletAddress); // Update state with fetched wallet address
      } catch (error) {
        console.error("Error retrieving wallet address:", error);
      }
    };
    retrieveWalletAddress();
  }, []);

  const getStoredWalletObject = async () => {
    try {
      const walletObject = await AsyncStorage.getItem("walletObject");
      if (walletObject !== null) {
        // Wallet object retrieved successfully
        const firstWallet = JSON.parse(walletObject);
        setWallets([firstWallet]);
      } else {
        // Handle case when wallet object is not found in AsyncStorage
      }
    } catch (error) {
      console.error("Error retrieving wallet object:", error);
      // Handle error
    }
  };

  useEffect(() => {
    getStoredWalletObject();
  }, []);

  console.log("Walltes------>>>>>>>_____>>>>>", wallets);

  const shortenEthereumAddress = (address) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

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
      // alert("Value contains empty fields. Not adding to array.");
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

  const renderItem = ({ item, index }) => {
    const isLastItem = index === cardData.length - 1;
    return (
      <>
        <View
          style={{ marginBottom: index === cardData.length - 1 ? "10%" : 0 }}
        >
          <CurrencyDetailsCard
            item={item}
            navigation={navigation}
            onCalculateAmount={handleCalculateAmount}
            importAddress={importTokenAddress}
          />
        </View>
        {isLastItem && (
          <TouchableOpacity
            style={styles.imoprtTokenView}
            // onPress={() => console.log("Button pressed for:", item.title)}
            onPress={toggleEnterTokenModal}
          >
            <Text style={styles.importTokenText}>Import New Token</Text>
          </TouchableOpacity>
        )}
      </>
    );
  };

  useEffect(() => {
    async function testIntegration() {
      const provider = new ethers.JsonRpcProvider(
        // "https://sepolia.infura.io/v3/c5a9eaae75b04ad78aeb479a275fa884"
        // "https://mainnet.infura.io/v3/c5a9eaae75b04ad78aeb479a275fa884"
        "https://polygon-mainnet.infura.io/v3/c5a9eaae75b04ad78aeb479a275fa884"
      );
      const erc20Prov = new Erc20Contract(
        "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        provider
      );

      console.group("check provider :::::", provider);

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

  useEffect(() => {
    // Function to retrieve wallet data from AsyncStorage
    const retrieveWallets = async () => {
      try {
        const serializedWallets = await AsyncStorage.getItem("wallets");
        if (serializedWallets !== null) {
          const parsedWallets = JSON.parse(serializedWallets);
          setWallets(parsedWallets);
        }
      } catch (error) {
        console.error("Error retrieving wallets:", error);
      }
    };

    // Call retrieveWallets on component mount
    retrieveWallets();
  }, []);

  // Function to add a new wallet
  const addWallet = (newWallet) => {
    setWallets((prevWallets) => [...prevWallets, newWallet]);
    // Store updated wallets in AsyncStorage
    storeWallets([...wallets, newWallet]);
  };

  // Function to store wallets in AsyncStorage
  const storeWallets = async (walletData) => {
    try {
      const serializedWallets = JSON.stringify(walletData);
      await AsyncStorage.setItem("wallets", serializedWallets);
      console.log("Wallets stored successfully.");
    } catch (error) {
      console.error("Error storing wallets:", error);
    }
  };

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
    addWallet(wallet);
  };

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

  const renderDotIndicator = () => {
    // const startIndex = Math.max(0, activeIndex - 2); // Ensure the startIndex is not negative
    // const endIndex = Math.min(newAccount.length - 1, startIndex + 4);
    //slice(startIndex, endIndex + 1).
    return newAccount.map((dot, index) => {
      return (
        <View
          key={index}
          style={{
            backgroundColor: index === activeIndex ? "#E08416" : "#D9D9D9",
            width: 6,
            height: 6,
            borderRadius: 5,
            marginHorizontal: 5,
            marginVertical: 5,
            gap: 10,
          }}
        ></View>
      );
    });
  };

  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    // Retrieve the selected language from AsyncStorage on component mount
    AsyncStorage.getItem("selectedLanguage").then((language) => {
      if (language) {
        setSelectedLanguage(language);
        i18n.changeLanguage(language);
      }
    });
  }, []);

  const handleChainSelect = (chain) => {
    console.log("dispatcher chain", chain);
    console.log("dispatcher card data", cardData);
    setSelectedChain(chain);
    dispatch(setCurrentChain(chain));
    // const filterData = cardData.filter((item) => item.chain === chain);
    // setCardData(filterData.length > 0 ? filterData : cardData);

    const filterData = cardData.filter((item) => item.chain === chain);
    setCardData(filterData.length > 0 ? filterData : cardData);
    setChainSelectionModalVisible(false);
  };

  const handleCalculateAmount = (amount) => {
    setCalculatedAmount(amount);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.allNetworksView}>
          <AllNetworkIcon style={styles.allNetworksImage} />
          <TouchableOpacity onPress={() => setChainSelectionModalVisible(true)}>
            <Text style={styles.allNetworksText}>
              {selectedChain ? selectedChain : t("allNetworkText")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setChainSelectionModalVisible(true)}>
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
              {t("addNewWallet")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          onScroll={(event) => {
            const contentOffsetX = event.nativeEvent.contentOffset.x;
            const index = Math.round(contentOffsetX / screenWidth); // Round to the nearest integer
            setActiveIndex(index);
          }}
        >
          {newAccount.map((item, index) => {
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
                      <Text style={styles.walletName}>{t("wallet")}</Text>
                      <Text style={styles.walletCode}>
                        {/* {item?.newWalletAddress} */}
                        {shortenEthereumAddress(fullWalletAddress)}
                      </Text>
                    </View>
                  </View>

                  <Image
                    source={require("../../assets/images/walletImage.png")}
                    style={styles.walletImage}
                  />
                  <View style={{ marginTop: "-12%" }}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("ReceiveScreen")}
                    >
                      <Text
                        style={[
                          styles.receiveText,
                          { right: !toggleLanguage ? 25 : 10 },
                        ]}
                      >
                        {t("receive")}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("ReceiveScreen")}
                    >
                      <Image
                        source={require("../../assets/images/receiveScanner.png")}
                        style={{
                          position: "absolute",
                          top: 3,
                          right: 18,
                        }}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.walletBalanceContainer}>
                    <View>
                      <Text style={styles.yourBalanceText}>
                        {t("yourBalance")}
                      </Text>
                      <Text style={styles.balanceText}>
                        ${calculatedAmount}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                      <View style={styles.modalIconContainer}>
                        <ModalDotIcon style={styles.modalDotImage} />
                        <CustomModal
                          transparent={true}
                          isVisible={modalVisible}
                          onClose={() => setModalVisible(false)}
                          walletAddress={fullWalletAddress}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </>
            );
          })}
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          {renderDotIndicator()}
        </View>
      </View>

      <View style={{ flex: 0.8 }}>
        <FlatList
          // ListFooterComponent={}
          data={cardData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
      </View>

      <TouchableOpacity
        style={{ alignItems: "flex-end" }}
        // onPress={toggleEnterTokenModal}
        // onPress={handleFetchData}
      >
        {/* <Image
          source={require("../../assets/images/plus.png")}
          style={styles.plusImage}
        /> */}
      </TouchableOpacity>
      <EnterTokenModal
        importTokenAddress={(tokenValue) => {
          alert("selected modal value");
          setImportTokenValue(tokenValue);
          console.log("selected token address", tokenValue);
        }}
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
