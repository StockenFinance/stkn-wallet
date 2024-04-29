import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import ReceiveScannerIcon from "../../SvgIcon/ReceiveScannerIcon";
import PlusIcon from "../../SvgIcon/PluseIcon";
import WalletImageSvg from "../../SvgIcon/WalletImageSvg";
import { addWalletAtReduxStore } from "../../redux/reducer/allWalletStore";
import { Utils } from "../../utils/LocalStorage";
import { setMyTabHide } from "../../redux/reducer/CounterSlice";
import EmptyList from "../../components/EmptyList";
import { addCardItem } from "../../redux/reducer/currencyCardSlice";

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
  const [calculatedAmount, setCalculatedAmount] = useState(0);
  const [importTokenAddress, setImportTokenValue] = useState("");

  const dispatch = useDispatch();

  const [cardData, setCardData] = useState([]);
  const walletCardData = useSelector(
    (state) => state.walletcards.walletCardData
  );

  const currencyCardData = useSelector(
    (state) => state.currencyCardData.currencyCardData[activeIndex]
  );
  const currencyCardDataAll = useSelector(
    (state) => state.currencyCardData.currencyCardData
  );

  console.log("check wallet card data>>>>>", walletCardData);
  console.log("currency card data status", currencyCardDataAll);
  //full wallet address

  const currencyItemTotolPrice = () => {
    const subtotal = currencyCardData.reduce((total, item) => {
      const decimals = parseInt(item.decimals);
      return total + decimals;
    }, 0);

    return subtotal;
  };
  useEffect(() => {
    dispatch(setMyTabHide(false));
  }, []);

  useEffect(() => {
    calculateTotalBalance();
  }, [activeIndex]);
  const calculateTotalBalance = () => {
    let sum = 0;
    currencyCardData?.forEach((item) => {
      sum += parseFloat(item?.price);
    });
    setTotalBalance(sum);
  };

  const addTokenBtn = async (value) => {
    console.log("add token value status>>>", value);
    calculateTotalBalance();
    toggleEnterTokenModal();
    if (value.name.trim() === "" || value.symbol.trim() === "") {
      // alert("value is alrady exist we can not allow to import same value");
      return;
    }

    const formattedValue = {
      ...value,
      decimals: parseFloat(value.decimals).toFixed(0),
    };

    const isDuplicate = currencyCardData.some((item) =>
      isEqual(item, formattedValue)
    );

    if (isDuplicate) {
      alert("Value already exists in cardData. Not adding to array.");
      return;
    }
    dispatch(addCardItem({ cardIndex: activeIndex, newItems: value }));
    // setCardData((prevData) => [...prevData, formattedValue]);
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
          style={{
            marginBottom: index === cardData.length - 1 ? "10%" : 0,
          }}
        >
          <CurrencyDetailsCard
            item={item}
            index={index}
            walletIndex={activeIndex}
            navigation={navigation}
            onCalculateAmount={handleCalculateAmount}
            importAddress={importTokenAddress}
          />
        </View>
        {isLastItem && (
          <TouchableOpacity
            style={styles.imoprtTokenView}
            onPress={toggleEnterTokenModal}
          >
            <Text style={styles.importTokenText}>{t("importNewToken")}</Text>
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

      provider
        .getBlockNumber()
        .then((blockNumber) => {})
        .catch((err) => {
          console.error("Error fetching block number:", err);
        });
    }
    testIntegration()
      .then((blockNumber) => {})
      .catch((err) => {});
  }, []);

  // useEffect(() => {
  //   retrieveSelectedLanguage();
  // }, []);

  // const retrieveSelectedLanguage = async () => {
  //   try {
  //     const language = await AsyncStorage.getItem("selectedLanguage");
  //     if (language !== null) {
  //       // console.log("Retrieved language:", language);
  //       let bool = language === "english" ? true : false;
  //       setToggleLanguage(bool);
  //     } else {
  //       // console.log("No language saved in AsyncStorage");
  //       setToggleLanguage(true);
  //     }
  //   } catch (error) {
  //     console.error("Error retrieving language from AsyncStorage:", error);
  //   }
  // };

  const renderDotIndicator = () => {
    return walletCardData.map((dot, index) => {
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
    AsyncStorage.getItem("selectedLanguage").then((language) => {
      if (language) {
        setSelectedLanguage(language);
        i18n.changeLanguage(language);
      }
    });
  }, []);

  useEffect(() => {
    // Fetch and set initial card data
    setCardData(currencyCardData);
  }, [currencyCardData]);

  const getUserBalance = useCallback(async () => {
    const x = await tokenDetail(
      "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
      "Polygon"
    );
    console.log("rishabh wearing same black", x);
  }, []);

  useEffect(() => {
    getUserBalance();
  }, []);

  const handleChainSelect = useCallback(
    async (chain) => {
      setSelectedChain(chain);
      dispatch(setCurrentChain(chain));

      let filteredData = [];

      if (chain === "All Network") {
        filteredData = currencyCardData; // Show all data
      } else {
        filteredData = currencyCardData.filter((item) => item.chain === chain);
      }

      setCardData(filteredData);
      setChainSelectionModalVisible(false);
    },
    [currencyCardData, dispatch]
  );

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
              onSelect={(chain) => handleChainSelect(chain)}
              value={selectedChain}
            />
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
            const index = Math.round(contentOffsetX / screenWidth);
            console.log("index------ from active", index);
            setActiveIndex(index);
          }}
        >
          {/* wallet card data */}
          {walletCardData.map((item, index) => {
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
                      <Text style={styles.walletName}>{`${t("wallet")} ${
                        index + 1
                      }`}</Text>
                      <Text style={styles.walletCode}>
                        {item?.newWalletAddress?.address.slice(0, 6) +
                          "....." +
                          item?.newWalletAddress?.address.slice(-6)}
                        {/* {shortenEthereumAddress(fullWalletAddress)} */}
                      </Text>
                    </View>
                  </View>

                  <WalletImageSvg style={styles.walletImage} />
                  <View style={{ marginTop: "-12%" }}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("ReceiveScreen")}
                    >
                      <Text style={[styles.receiveText]}>{t("receive")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("ReceiveScreen")}
                    >
                      <ReceiveScannerIcon
                        color={"#fff"}
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
                        {index === 0 ? calculatedAmount : item.newWalletBalance}
                        {/* ${calculatedAmount} */}
                        {/* {item.newWalletBalance} */}
                        {/* {currencyItemTotolPrice()} */}
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
          ListEmptyComponent={<EmptyList index={activeIndex} />}
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
          // console.log("selected token address", tokenValue);
        }}
        value={tokenInput}
        modalValues={(value) => addTokenBtn(value)}
        onChangeText={(text) => setTokenInput(text)}
        // onPress={() => handleToken()}
        isVisible={isTokenDetailsModalVisible}
        onClose={toggleEnterTokenModal}
      />
      {loading && (
        <ActivityIndicator
          style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
          size="large"
          color="#F2A13F"
        />
      )}
    </View>
  );
};

export default Dashboard;
