import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../src/Dashboard/styles";
import { fetchDynamicDetailsOfToken, provider } from "../src/utils/helper";
import { ethers } from "ethers";

const CurrencyDetailsCard = ({ item, isLast }) => {
  const [containerHeight, setContainerHeight] = useState(95);
  const [userEtherBalance, setUserEtherBalance] = useState(0);
  const [cryptoPrice, setCryptoPrice] = useState({});

  const handleContainerClick = () => {
    setContainerHeight(containerHeight === 95 ? 170 : 95);
  };

  const getUserBalance = async (userAddress) => {
    const result = await provider.getBalance(userAddress);
    const balance = ethers.formatEther(result);
    console.log("Balance: ", balance);
    setUserEtherBalance(balance);
    console.log("Balance: ", userEtherBalance);
    return balance;
  };
  useEffect(() => {
    getUserBalance("0x28C6c06298d514Db089934071355E5743bf21d60");
    fetchDynamicDetailsOfToken("0xdAC17F958D2ee523a2206206994597C13D831ec7");
  }, [userEtherBalance]);

  function formatBalance(balance, decimals) {
    return ethers.formatUnits(balance, parseInt(decimals, 10));
  }

  // Dynamically require the image based on item.symbol
  const getImageSource = (symbol) => {
    switch (symbol) {
      case "ETH":
        return require("../src/assets/images/ETH.png");
      case "USDT":
        return require("../src/assets/images/usdt.png");
      // Add cases for other symbols as needed
      default:
        return require("../src/assets/images/ETH.png"); // Default image
    }
  };

  console.log("item:::", item);
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
              {/* <Image source={require("../src/assets/images/ETH.png")} /> */}
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
              {/* {item.balance} */}
              {/* {parseFloat(userEtherBalance).toFixed(6)} */}
              {/* {parseFloat(item.decimals).toFixed(2)} */}
              {item.symbol === "ETH"
                ? parseFloat(userEtherBalance).toFixed(6)
                : formatBalance(item.balance, item.decimals)}
            </Text>
            <Text
              style={[
                styles.priceSubText,
                { bottom: containerHeight === 95 ? null : "23%" },
              ]}
            >
              {item.decimals}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "70%",
            borderWidth: 0.5,
            borderColor: "#344567",
            alignSelf: "center",
            marginTop: containerHeight === 95 ? "-8%" : "-28%",
            marginLeft: "9%",
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
                <Image
                  source={require("../src/assets/images/send.png")}
                  style={{}}
                />
              </View>

              <Text
                style={{
                  color: "#344567",
                  fontSize: 8,
                  fontWeight: "600",
                  alignSelf: "center",
                }}
              >
                Send
              </Text>
            </View>

            <View>
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
                <Image
                  source={require("../src/assets/images/send.png")}
                  style={{}}
                />
              </View>

              <Text
                style={{
                  color: "#344567",
                  fontSize: 8,
                  fontWeight: "600",
                  alignSelf: "center",
                }}
              >
                Receive
              </Text>
            </View>
            <View>
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
                <Image
                  source={require("../src/assets/images/send.png")}
                  style={{}}
                />
              </View>

              <Text
                style={{
                  color: "#344567",
                  fontSize: 8,
                  fontWeight: "600",
                  alignSelf: "center",
                }}
              >
                Swap
              </Text>
            </View>
            <View>
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
                <Image
                  source={require("../src/assets/images/Chart.png")}
                  style={{ width: 18, height: 18 }}
                />
              </View>

              <Text
                style={{
                  color: "#344567",
                  fontSize: 8,
                  fontWeight: "600",
                  alignSelf: "center",
                }}
              >
                Chart
              </Text>
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CurrencyDetailsCard;
