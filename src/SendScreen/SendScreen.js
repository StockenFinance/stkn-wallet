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

const SendScreen = ({ placeholder, onChangeText, value }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <View style={styles.allNetworksView}>
            <View style={styles.coinImageContainer}>
              <Image
                source={require("../assets/images/ethereum.png")}
                style={styles.coinImage}
              />
            </View>
            <Text style={styles.allNetworksText}>Ethereum</Text>
            <Image
              source={require("../assets/images/dropdown.png")}
              style={styles.dropdownImage}
            />
          </View>
        </View>
        <View style={styles.parentView}>
          <Text style={styles.headerText}>I want to Send</Text>
          <View style={styles.coinDetailsParent}>
            <View
              style={[
                styles.allNetworksView,
                { marginLeft: "5%", marginTop: "5%" },
              ]}
            >
              <View style={[styles.coinImageContainer, { width: 40 }]}>
                <Image
                  source={require("../assets/images/ethereum.png")}
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
                source={require("../assets/images/dropdown.png")}
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
                source={require("../assets/images/Send.png")}
                style={styles.image}
                resizeMode="contain"
              />
            </View>

            <View style={styles.divider} />
          </View>

          <Text style={styles.headerText}>To</Text>

          <View style={styles.inputContainer}>
            <TextInput
              caretColor="red"
              placeholderTextColor={"grey"}
              placeholder={"Address or Domain"}
              onChangeText={onChangeText}
              value={value}
              style={styles.input}
            />
          </View>
          <View style={styles.currencyConvertView}>
            <Text style={styles.currencyConverterText}>
              Transactions are irreversible Make sure you are on the right
              network and sending the right amount to the right address
            </Text>
          </View>
        </View>
        <View style={styles.importButton}>
          <Text style={styles.importText}>Send</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default SendScreen;
