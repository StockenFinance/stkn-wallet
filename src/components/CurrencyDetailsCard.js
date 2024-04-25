import { Text, View, TouchableOpacity, Image } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { styles } from "../screens/Dashboard/styles";
import { fetchDynamicDetailsOfToken, provider } from "../utils/helper";
import { ethers } from "ethers";
import SendModal from "./SendModal/index";
import ChartIcon from "../SvgIcon/ChartIcon";
import SwapIcon from "../SvgIcon/SwapIcon";
import SendIcon from "../SvgIcon/SendIcon";
import ReceiveScannerIcon from "../SvgIcon/ReceiveScannerIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { Utils } from "../utils/LocalStorage";
import { useSelector } from "react-redux";

const CurrencyDetailsCard = ({
  item,
  navigation,
  onCalculateAmount,
  importAddress,
}) => {
  const { t, i18n } = useTranslation();
  const walletCardData = useSelector(
    (state) => state.walletcards.walletCardData
  );

  console.log(
    "walletCardData from currency details file",
    walletCardData[0]?.newWalletAddress?.address
  );

  const [containerHeight, setContainerHeight] = useState(95);
  const [userEtherBalance, setUserEtherBalance] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [toggleLanguage, setToggleLanguage] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [tokenBalanceImported, setTokenBalanceImported] = useState();
  const currentChain = useSelector((state) => state.chain.currentChain);

  console.log("currenChain", currentChain);

  const handleContainerClick = () => {
    setContainerHeight(containerHeight === 95 ? 170 : 95);
  };

  const getUserBalance = async (userAddress) => {
    const result = await provider().getBalance(userAddress);
    const balance = ethers.formatEther(result);
    console.log("Balance: ", balance);
    setUserEtherBalance(balance);
    console.log("Balance: ", userEtherBalance);
    return balance;
  };
  useEffect(() => {
    Utils.getStoreData("fullWalletAddress").then((res) => {
      console.log("fullwalletaddress local storage", res);
      if (res !== null) {
        getUserBalance(res);
        tokenBalance(res);
      }
    });
  }, [userEtherBalance]);

  const tokenBalance = useCallback(async () => {
    const importAddress = await AsyncStorage.getItem("STOREDTOKEN");
    console.log("token address in currency details", importAddress);

    console.log(
      "walletCardData?.newWalletAddress?.address",
      walletCardData[0]?.newWalletAddress?.address
    );

    const fetchedTokenDetails = await fetchDynamicDetailsOfToken(
      "0xc2132D05D31c914a87C6611C10748AEb04B58e8F", //importAddres(tokenAddress)
      // "0x5Ec3A0c889CD52Fc0b482ED5F927c5a9b13EB141" //walletAddress (local storage)
      // "0x73f4faE4F28fe811EB77ddb63985C0b904aeb77f"

      walletCardData[0]?.newWalletAddress?.address
    );
    setTokenBalanceImported(fetchedTokenDetails);
  }, []);

  function formatBalance(balance, decimals) {
    return ethers.formatUnits(balance, parseInt(decimals, 10));
  }

  // Dynamically require the image based on item.symbol
  const getImageSource = (symbol) => {
    switch (symbol) {
      case "ETH":
        return require("../assets/images/ETH.png");
      case "USDT":
        return require("../assets/images/usdt.png");
      default:
        return require("../assets/images/ETH.png");
    }
  };

  console.log("item:::", item);

  useEffect(() => {
    retrieveSelectedLanguage();
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

  useEffect(() => {
    // Retrieve the selected language from AsyncStorage on component mount
    AsyncStorage.getItem("selectedLanguage").then((language) => {
      if (language) {
        setSelectedLanguage(language);
        i18n.changeLanguage(language);
      }
    });
  }, []);

  const calculateAmount = () => {
    let amount = 0;
    if (item.symbol === "ETH") {
      amount = parseFloat(item.price) * parseFloat(userEtherBalance);
    } else {
      amount = parseFloat(item.price) * parseFloat(tokenBalanceImported);
    }
    return amount.toFixed(2);
  };

  useEffect(() => {
    // Call onCalculateAmount whenever the calculated amount changes
    onCalculateAmount(calculateAmount());
  }, [calculateAmount]);

  console.log("check bal::::", tokenBalanceImported);

  return (
    <TouchableOpacity onPress={handleContainerClick}>
      <View>
        <View style={{ ...styles.currencyContainer, height: containerHeight }}>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                width: 33,
                height: 35,
                borderRadius: 10,
                backgroundColor: "#5C80E7",
                marginTop: containerHeight === 95 ? "-12%" : "-38%",
                marginLeft: "8%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* <Image source={require("../src/assets/images/ETH.png")} />  */}
              <Image source={getImageSource(item.symbol)} />
            </View>

            <View style={{ marginLeft: "8%", marginTop: "-12%" }}>
              <Text
                style={[
                  styles.coinNameText,
                  { bottom: containerHeight === 95 ? null : "100%" },
                ]}
              >
                {item.symbol}
              </Text>
              <Text
                style={[
                  styles.coinNameSubText,
                  { bottom: containerHeight === 95 ? null : "100%" },
                ]}
              >
                {item.name}
              </Text>
            </View>
          </View>
          <View style={{ marginRight: "5%", marginTop: "-5%" }}>
            <Text
              style={[
                styles.priceText,
                { bottom: containerHeight === 95 ? null : "22%" },
              ]}
            >
              {item.symbol === "ETH"
                ? parseFloat(userEtherBalance).toFixed(6)
                : tokenBalanceImported}
            </Text>
            <Text
              style={[
                styles.priceSubText,
                { bottom: containerHeight === 95 ? null : "23%" },
              ]}
            >
              ${calculateAmount()}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "70%",
            borderWidth: 0.3,
            borderColor: "#344567",
            alignSelf: "center",
            marginTop: containerHeight === 95 ? "-8%" : "-28%",
            marginLeft: "9%",
            opacity: 0.3,
          }}
        ></View>
        <Text
          style={{
            fontSize: 11,
            fontWeight: "700",
            color: "#7183A1",
            marginLeft: "20%",
          }}
        >
          ${item?.price}
        </Text>
      </View>
      {containerHeight === 170 && (
        <View style={styles.additionalContent}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "90%",
              alignSelf: "center",
            }}
          >
            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("SendScreen", {
                    selectedSymbol: item.symbol,
                  })
                }
              >
                <View
                  style={{
                    width: 35,
                    height: 32,
                    borderWidth: 1,
                    borderColor: "#808BA0",
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 11,
                    marginTop: "20%",
                  }}
                >
                  <SendIcon color={"#F19220"} />
                </View>

                <Text
                  style={{
                    color: "#344567",
                    fontSize: !toggleLanguage ? 9 : 8,
                    fontWeight: !toggleLanguage ? "900" : "600",
                    alignSelf: "center",
                  }}
                >
                  {t("send")}
                </Text>
              </TouchableOpacity>
              <SendModal
                visible={showModal}
                onClose={() => setShowModal(false)}
              />
            </View>

            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate("ReceiveScreen", {})}
              >
                <View
                  style={{
                    width: 35,
                    height: 32,
                    borderWidth: 1,
                    borderColor: "#808BA0",
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 11,
                    marginTop: "20%",
                  }}
                >
                  <ReceiveScannerIcon color={"#F19220"} />
                </View>

                <Text
                  style={{
                    color: "#344567",
                    fontSize: !toggleLanguage ? 9 : 8,
                    fontWeight: !toggleLanguage ? "900" : "600",
                    alignSelf: "center",
                  }}
                >
                  {t("receive")}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("SwapScreen", {
                    selectedSymbol: item.symbol,
                  })
                }
              >
                <View
                  style={{
                    width: 35,
                    height: 32,
                    borderWidth: 1,
                    borderColor: "#808BA0",
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 11,
                    marginTop: "20%",
                  }}
                >
                  <SwapIcon color={"#F19220"} />
                </View>

                <Text
                  style={{
                    color: "#344567",
                    fontSize: !toggleLanguage ? 9 : 8,
                    fontWeight: !toggleLanguage ? "900" : "600",
                    alignSelf: "center",
                  }}
                >
                  {t("swap")}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ChartScreen", {
                    name: item.name,
                  })
                }
              >
                <View
                  style={{
                    width: 35,
                    height: 32,
                    borderWidth: 1,
                    borderColor: "#808BA0",
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 11,
                    marginTop: "20%",
                  }}
                >
                  <ChartIcon style={{ width: 18, height: 18 }} />
                </View>

                <Text
                  style={{
                    color: "#344567",
                    fontSize: !toggleLanguage ? 9 : 8,
                    fontWeight: !toggleLanguage ? "900" : "600",
                    alignSelf: "center",
                  }}
                >
                  {t("chart")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CurrencyDetailsCard;
