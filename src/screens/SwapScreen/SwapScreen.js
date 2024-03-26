import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React from "react";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  coinDetailsParent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  allNetworksView: {
    flexDirection: "row",
    marginTop: "10%",
    marginLeft: "10%",
    alignItems: "center",
  },
  allNetworksImage: {
    width: 15,
    height: 16,
    marginHorizontal: "2%",
  },
  allNetworksText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#253452",
    marginHorizontal: "2%",
  },
  dropdownImage: {
    width: 20,
    height: 20,
    marginTop: "2%",
  },
  coinImageContainer: {
    width: 33,
    height: 35,
    backgroundColor: "#5C80E7",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  coinImage: {
    width: 15,
    height: 22,
  },
  parentView: {
    width: "87%",
    height: 551,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#808BA0",
    alignSelf: "center",
    marginTop: "2%",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#253452",
    textAlign: "center",
    marginTop: "8%",
  },
  balanceText: {
    color: "#9299A8",
    fontSize: 11,
    fontWeight: "600",
    marginTop: "8%",
    marginRight: "3%",
  },
  inputContainer: {
    marginTop: "5%",
    width: 305,
    height: 67,
    alignSelf: "center",
    borderRadius: 15,
    backgroundColor: "rgba(244, 247, 250, 1)",
    marginBottom: 10,
    alignItems: "flex-start",
  },
  input: {
    height: 50,
    fontSize: 23,
    fontWeight: "400",
    paddingHorizontal: 8,
    marginTop: "3%",
    color: "#253452",
  },
  amountRangeView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "80%",
    alignSelf: "center",
  },
  amountRangeText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#A5ACBC",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "87%",
    alignSelf: "center",
    marginTop: "5%",
  },
  divider: {
    flex: 1,
    height: 1.5,
    backgroundColor: "#808BA0",
  },
  swapImageContainer: {
    width: 45,
    height: 40,
    borderRadius: 15,
    backgroundColor: "#F2A13F",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "3%",
  },
  image: {
    width: 24,
    height: 24,
    marginHorizontal: 10,
  },
  currencyConvertView: {
    width: 198,
    height: 78,
    alignSelf: "center",
    alignItems: "center",
    marginTop: "1%",
  },
  currencyConverterText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#7483A1",
    marginTop: "2%",
  },
  importButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "7%",
    width: "87%",
    height: 55,
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "#F4F7FA",
    marginBottom: "3%",
  },
  importText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#979797",
  },
  alertMessage: {
    fontSize: 12,
    fontWeight: "600",
    color: "#253452",
  },
  languageButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 105,
    height: 40,
    backgroundColor: "#F19220",
    borderRadius: 50,
    marginHorizontal: "2%",
  },
  englishText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
  },
});
