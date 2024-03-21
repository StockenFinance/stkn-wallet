import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { styles } from "../src/Dashboard/styles";

const CurrencyDetailsCard = ({ item, isLast }) => {
  const [containerHeight, setContainerHeight] = useState(95);

  const handleContainerClick = () => {
    setContainerHeight(containerHeight === 95 ? 170 : 95);
  };

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
                backgroundColor: "#F2A13F",
                marginTop: containerHeight === 95 ? "-12%" : "-38%",
                marginLeft: "8%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image source={require("../src/assets/images/bitcoin.png")} />
            </View>

            <View style={{ marginLeft: "8%", marginTop: "-12%" }}>
              <Text
                style={[
                  styles.coinNameText,
                  { bottom: containerHeight === 95 ? null : "100%" },
                ]}
              >
                {item.coinName}
              </Text>
              <Text
                style={[
                  styles.coinNameSubText,
                  { bottom: containerHeight === 95 ? null : "100%" },
                ]}
              >
                {item.coinNameSubText}
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
              {" "}
              {item.priceText}
            </Text>
            <Text
              style={[
                styles.priceSubText,
                { bottom: containerHeight === 95 ? null : "23%" },
              ]}
            >
              {item.priceSubText}
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
          {item.balance}
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
