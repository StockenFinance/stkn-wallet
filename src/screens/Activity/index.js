import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { styles } from "./styles";

const Activity = () => {
  const getTextColor = (text) => {
    return text.includes("+")
      ? "#039D00"
      : text.includes("-")
      ? "#F12020"
      : "black";
  };
  const data = [
    {
      key: "1",
      image: require("../assets/images/bitcoin.png"),
      status: "Receive",
      currency: "USDT",
      currencyInitials: "ETH",
      amount: "+4521.10",
    },
    {
      key: "2",
      image: require("../assets/images/bitcoin.png"),
      status: "Send",
      currency: "USDT",
      currencyInitials: "ETH",
      amount: "-3921.10",
    },
    {
      key: "3",
      image: require("../assets/images/bitcoin.png"),
      status: "Send",
      currency: "USDT",
      currencyInitials: "ETH",
      amount: "-3921.10",
    },
    {
      key: "4",
      image: require("../assets/images/bitcoin.png"),
      status: "Receive",
      currency: "USDT",
      currencyInitials: "ETH",
      amount: "+3921.10",
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <View style={styles.currencyContainer}>
        <View style={{ flexDirection: "row", marginVertical: "3%" }}>
          <View
            style={{
              height: 35,
              width: 1,
              backgroundColor: "#344567",
              alignSelf: "center",
              marginTop: "-14%",
            }}
          ></View>
          <View
            style={{
              width: 38,
              height: 36,
              borderRadius: 10,
              backgroundColor: "#F2A13F",
              marginTop: "-15%",
              marginLeft: "8%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image source={item.image} />
          </View>

          <View style={{ marginLeft: "8%", marginTop: "-15%" }}>
            <Text style={styles.coinNameSubText}>{item.status}</Text>

            <Text style={styles.coinNameText}>{item.currency}</Text>
          </View>
        </View>
        <View style={{ marginRight: "5%", marginTop: "-5%" }}>
          <Text
            style={[styles.priceText, { color: getTextColor(item.amount) }]}
          >
            {item.amount}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.backIconImage}>
          <Image source={require("../assets/images/backIcon.png")} />
        </View>
        <View style={styles.allNetworksView}>
          <Image
            source={require("../assets/images/allNetwork.png")}
            style={styles.allNetworksImage}
          />
          <Text style={styles.allNetworksText}>All Networks</Text>
          <Image
            source={require("../assets/images/dropdown.png")}
            style={styles.dropdownImage}
          />
        </View>
      </View>
      <View style={styles.activityContainer}>
        <Text style={styles.activityText}>Activity</Text>
        <View
          style={{ marginLeft: "3%", flexDirection: "row", marginTop: "2%" }}
        >
          <Text style={styles.walletInfo}>Wallet 1</Text>
          <Text style={styles.walletId}> 0Wefsxc584sfg </Text>
          <Image
            source={require("../assets/images/dropdown.png")}
            style={[styles.dropdownImage, { marginTop: "1%" }]}
          />
        </View>
      </View>
      <Text style={styles.transactionDateText}>2 Mar 2024</Text>

      <View>
        <View style={styles.currencyContainer}>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                height: 35,
                width: 1,
                backgroundColor: "#344567",
                alignSelf: "center",
                marginTop: "-14%",
              }}
            ></View>
            <View
              style={{
                width: 38,
                height: 36,
                borderRadius: 10,
                backgroundColor: "#F2A13F",
                marginTop: "-15%",
                marginLeft: "8%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image source={require("../assets/images/bitcoin.png")} />
            </View>

            <View style={{ marginLeft: "8%", marginTop: "-15%" }}>
              <Text style={styles.coinNameSubText}>Send</Text>

              <Text style={styles.coinNameText}>BTC</Text>
            </View>
          </View>
          <View style={{ marginRight: "5%", marginTop: "-5%" }}>
            <Text style={styles.priceText}>-11,524.10</Text>
          </View>
        </View>
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
        </View>
      </View>
      <Text style={styles.transactionDateText}>17 Feb 2024</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

export default Activity;
