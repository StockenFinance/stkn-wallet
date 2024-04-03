import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { styles } from "./styles";
import DropDownIcon from "../../SvgIcon/DropDownIcon";
import DebitCardIcon from "../../SvgIcon/DebitCardIcon";

const BuyScreen = () => {
  const [selectedRange, setSelectedRange] = useState(null);

  const handleRangePress = (range) => {
    setSelectedRange(range);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buySellButtonView}>
        <View style={styles.languageButton}>
          <Text style={styles.englishText}>Buy</Text>
        </View>
        <View
          style={[
            styles.languageButton,
            {
              backgroundColor: "#F4F7FA",
            },
          ]}
        >
          <Text style={[styles.englishText, { color: "#253452" }]}>Sell</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.parentView}>
          <Text style={styles.headerText}>I have</Text>
          <View style={styles.coinDetailsParent}>
            <View
              style={[
                styles.allNetworksView,
                { marginLeft: "5%", marginTop: "5%" },
              ]}
            >
              <Image
                source={require("../../assets/images/USD.png")}
                style={styles.coinImage}
              />
              <Text
                style={[
                  styles.allNetworksText,
                  { fontSize: 23, fontWeight: "400", marginLeft: 10 },
                ]}
              >
                USD
              </Text>

              <DropDownIcon
                style={[
                  styles.dropdownImage,
                  { marginLeft: "-1%", marginTop: "4%" },
                ]}
              />
            </View>

            <Text style={styles.balanceText}>500</Text>
          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
          </View>

          <Text style={styles.headerText}>I want</Text>
          <View style={styles.coinDetailsParent}>
            <View
              style={[
                styles.allNetworksView,
                { marginLeft: "5%", marginTop: "5%" },
              ]}
            >
              <View
                style={[
                  styles.coinImageContainer,
                  { width: 40, backgroundColor: "#449393" },
                ]}
              >
                <Image
                  source={require("../../assets/images/usdt.png")}
                  style={{ width: 24, height: 20 }}
                />
              </View>
              <Text
                style={[
                  styles.allNetworksText,
                  { fontSize: 23, fontWeight: "400", marginLeft: 10 },
                ]}
              >
                USDT
              </Text>
              <DropDownIcon
                style={[
                  styles.dropdownImage,
                  { marginLeft: "-1%", marginTop: "4%" },
                ]}
              />
            </View>

            <Text style={styles.balanceText}>497.5</Text>
          </View>
          <View style={styles.rangeSelectionView}>
            <TouchableOpacity onPress={() => handleRangePress("$150")}>
              <Text
                style={[
                  styles.rangeText,
                  {
                    width: selectedRange === "$150" ? 60 : null,
                    height: selectedRange === "$150" ? 34 : null,
                    borderRadius: selectedRange === "$150" ? 12 : null,
                    color: selectedRange === "$150" ? "#ffffff" : "#253452",
                    padding: selectedRange === "$150" ? "2%" : null,
                    textAlign: "center",
                    backgroundColor:
                      selectedRange === "$150" ? "#F19220" : "transparent",
                  },
                ]}
              >
                $150
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRangePress("$500")}>
              <Text
                style={[
                  styles.rangeText,
                  {
                    width: selectedRange === "$500" ? 60 : null,
                    height: selectedRange === "$500" ? 34 : null,
                    borderRadius: selectedRange === "$500" ? 12 : null,
                    color: selectedRange === "$500" ? "#ffffff" : "#253452",
                    padding: selectedRange === "$500" ? "2%" : null,
                    textAlign: "center",
                    backgroundColor:
                      selectedRange === "$500" ? "#F19220" : "transparent",
                  },
                ]}
              >
                $500
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRangePress("MAX")}>
              <Text
                style={[
                  styles.rangeText,
                  {
                    width: selectedRange === "MAX" ? 60 : null,
                    height: selectedRange === "MAX" ? 34 : null,
                    borderRadius: selectedRange === "MAX" ? 12 : null,
                    color: selectedRange === "MAX" ? "#ffffff" : "#253452",
                    padding: selectedRange === "MAX" ? "2%" : null,
                    textAlign: "center",
                    backgroundColor:
                      selectedRange === "MAX" ? "#F19220" : "transparent",
                  },
                ]}
              >
                MAX
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.paymentMethodText}>Payment Method</Text>
        <View style={styles.createWalletView}>
          <View style={styles.swapImageContainer}>
            <DebitCardIcon style={styles.image} />
          </View>
          <View style={styles.divider}></View>
          <Text style={styles.createWalletText}>Debit Card</Text>

          <DropDownIcon style={styles.forwardIcon} />
        </View>
        <Text style={styles.paymentMethod}>Fulfilled by Moonpay</Text>
        <View style={styles.importButton}>
          <Text style={styles.importText}>Continue</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default BuyScreen;
