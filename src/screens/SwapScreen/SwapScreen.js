import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React from "react";
import { styles } from "./styles";

const SwapScreen = ({ placeholder, onChangeText, value }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <View style={styles.allNetworksView}>
            <View style={styles.coinImageContainer}>
              <Image
                source={require("../../assets/images/ethereum.png")}
                style={styles.coinImage}
              />
            </View>
            <Text style={styles.allNetworksText}>Ethereum</Text>
            <Image
              source={require("../../assets/images/dropdown.png")}
              style={styles.dropdownImage}
            />
          </View>
        </View>
        <View style={styles.parentView}>
          <Text style={styles.headerText}>I want to Swap</Text>
          <View style={styles.coinDetailsParent}>
            <View
              style={[
                styles.allNetworksView,
                { marginLeft: "5%", marginTop: "5%" },
              ]}
            >
              <View style={[styles.coinImageContainer, { width: 40 }]}>
                <Image
                  source={require("../../assets/images/ethereum.png")}
                  style={styles.coinImage}
                />
              </View>
              <Text
                style={[
                  styles.allNetworksText,
                  { fontSize: 23, fontWeight: "400" },
                ]}
              >
                ETH
              </Text>
              <Image
                source={require("../../assets/images/dropdown.png")}
                style={[
                  styles.dropdownImage,
                  { marginLeft: "-1%", marginTop: "4%" },
                ]}
              />
            </View>

            <Text style={styles.balanceText}>You have 0 Ethereum</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              caretColor="red"
              placeholderTextColor={"grey"}
              placeholder={placeholder}
              onChangeText={onChangeText}
              value={value}
              style={styles.input}
            />
          </View>
          <View style={styles.amountRangeView}>
            <Text style={styles.amountRangeText}>MIN</Text>
            <Text style={styles.amountRangeText}>HALF</Text>
            <Text style={styles.amountRangeText}>MAX</Text>
          </View>
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <View style={styles.swapImageContainer}>
              <Image
                source={require("../../assets/images/swap.png")}
                style={styles.image}
                resizeMode="contain"
              />
            </View>

            <View style={styles.divider} />
          </View>

          <Text style={styles.headerText}>I want to Get</Text>
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
                  { fontSize: 23, fontWeight: "400" },
                ]}
              >
                USDT
              </Text>
              <Image
                source={require("../../assets/images/dropdown.png")}
                style={[
                  styles.dropdownImage,
                  { marginLeft: "-1%", marginTop: "4%" },
                ]}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              caretColor="red"
              placeholderTextColor={"grey"}
              placeholder={placeholder}
              onChangeText={onChangeText}
              value={value}
              style={styles.input}
            />
          </View>
          <View style={styles.currencyConvertView}>
            <Text style={styles.currencyConverterText}>
              1 ETH = 2,947.7868 USDC
            </Text>
            <Text
              numberOfLines={2}
              style={[
                styles.currencyConverterText,
                { textAlign: "center", width: "120%", marginTop: "-1%" },
              ]}
            >
              Swap services are available through third-party API providers
            </Text>
          </View>
        </View>
        {/* <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            marginLeft: "5%",
            marginTop: "5%",
            width: "89%",
          }}
        >
          <View>
            <Text style={styles.alertMessage}>
              {" "}
              There's no ETH in your wallet.
            </Text>
            <Text style={styles.alertMessage}>
              {" "}
              Deposit or but ETH , then try again
            </Text>
          </View>
          <View style={styles.languageButton}>
            <Text style={styles.englishText}>Buy ETH</Text>
          </View>
        </View> */}
        <View style={styles.importButton}>
          <Text style={styles.importText}>Confirm</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default SwapScreen;
