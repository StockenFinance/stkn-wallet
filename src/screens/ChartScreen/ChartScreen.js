import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { styles } from "./styles";

const ChartScreen = () => {
  const [selectedTime, setSelectedTime] = useState(null);

  const handleRangePress = (range) => {
    setSelectedTime(range);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/backIcon.png")}
          style={styles.backIcon}
        />
        <View style={{ flexDirection: "row" }}>
          <View style={styles.swapImageContainer}>
            <Image
              source={require("../../assets/images/bitcoin.png")}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.walletText}>Bitcoin</Text>
        </View>

        <Image
          source={require("../../assets/images/options.png")}
          style={styles.scanIcon}
        />
      </View>
      <View style={styles.rangeSelectionView}>
        <TouchableOpacity onPress={() => handleRangePress("24H")}>
          <Text
            style={[
              styles.rangeText,
              {
                width: selectedTime === "24H" ? 60 : null,
                height: selectedTime === "24H" ? 34 : null,
                borderRadius: selectedTime === "24H" ? 12 : null,
                color: selectedTime === "24H" ? "#ffffff" : "#253452",
                padding: selectedTime === "24H" ? "2%" : null,
                textAlign: "center",
                backgroundColor:
                  selectedTime === "24H" ? "#F19220" : "transparent",
              },
            ]}
          >
            24H
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleRangePress("1W")}>
          <Text
            style={[
              styles.rangeText,
              {
                width: selectedTime === "1W" ? 60 : null,
                height: selectedTime === "1W" ? 34 : null,
                borderRadius: selectedTime === "1W" ? 12 : null,
                color: selectedTime === "1W" ? "#ffffff" : "#253452",
                padding: selectedTime === "1W" ? "2%" : null,
                textAlign: "center",
                backgroundColor:
                  selectedTime === "1W" ? "#F19220" : "transparent",
              },
            ]}
          >
            1W
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleRangePress("1M")}>
          <Text
            style={[
              styles.rangeText,
              {
                width: selectedTime === "1M" ? 60 : null,
                height: selectedTime === "1M" ? 34 : null,
                borderRadius: selectedTime === "1M" ? 12 : null,
                color: selectedTime === "1M" ? "#ffffff" : "#253452",
                padding: selectedTime === "1M" ? "2%" : null,
                textAlign: "center",
                backgroundColor:
                  selectedTime === "1M" ? "#F19220" : "transparent",
              },
            ]}
          >
            1M
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleRangePress("1Y")}>
          <Text
            style={[
              styles.rangeText,
              {
                width: selectedTime === "1Y" ? 60 : null,
                height: selectedTime === "1Y" ? 34 : null,
                borderRadius: selectedTime === "1Y" ? 12 : null,
                color: selectedTime === "1Y" ? "#ffffff" : "#253452",
                padding: selectedTime === "1Y" ? "2%" : null,
                textAlign: "center",
                backgroundColor:
                  selectedTime === "1Y" ? "#F19220" : "transparent",
              },
            ]}
          >
            1Y
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleRangePress("ALL")}>
          <Text
            style={[
              styles.rangeText,
              {
                width: selectedTime === "ALL" ? 60 : null,
                height: selectedTime === "ALL" ? 34 : null,
                borderRadius: selectedTime === "ALL" ? 12 : null,
                color: selectedTime === "ALL" ? "#ffffff" : "#253452",
                padding: selectedTime === "ALL" ? "2%" : null,
                textAlign: "center",
                backgroundColor:
                  selectedTime === "ALL" ? "#F19220" : "transparent",
              },
            ]}
          >
            ALL
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
      </View>
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.marketInfoText}>Market cap</Text>
          <Text style={styles.marketInfoSubtext}>$1.22T</Text>
        </View>
        <View>
          <Text style={styles.marketInfoText}>24h volume</Text>
          <Text style={styles.marketInfoSubtext}>$87.06B</Text>
        </View>
        <View>
          <Text style={styles.marketInfoText}>Popularity</Text>
          <Text style={styles.marketInfoSubtext}>#1</Text>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <View style={{ marginLeft: "5%", marginTop: "5%" }}>
          <Text style={styles.marketInfoSubtext}>Description</Text>
          <Text style={styles.marketInfoText}>
            Bitcoin (BTC) is the original cryptocurrency built on blockchain
            technology. Created in 2009 by an anonymous developer with the
            pseudonym Satoshi Nakamoto, Bitcoin remains the most widely accepted
            and traded cryptocurrency today. Like the cryptocurrencies that
            followed it, Bitcoin was conceived to create a decentralized digital
            asset that has no need for a central authority or single
            administrator. A global team of developers continues to work on the
            improvement of Bitcoin.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ChartScreen;
