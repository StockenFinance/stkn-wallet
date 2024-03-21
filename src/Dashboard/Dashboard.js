import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import LinearGradient from "react-native-linear-gradient";
import CustomModal from "../../components/customModal";
import { styles } from "./styles";
import { currencyData } from "../../components/coinDetailsData";
import CurrencyDetailsCard from "../../components/CurrencyDetailsCard";
import EnterTokenModal from "../../components/EnterTokenModal";
import AllNetworksModal from "../../components/AllNetworksModal";
import { useContractRead } from "wagmi";
import { erc20ABI } from "wagmi";
import { ethers } from "ethers";
import Erc20Contract from "../contracts/Erc20";
import { tokenDetail } from "../utils/helper";

const Dashboard = () => {
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [allNetworksModalVisible, setAllNetworksModalVisible] = useState(false);
  const [apiResponse, setApiResponse] = useState([]);
  const [isTokenDetailsModalVisible, setIsTokenDetailsModalVisible] =
    useState(false);
  const [tokenInput, setTokenInput] = useState("");

  const toggleEnterTokenModal = () => {
    setIsTokenDetailsModalVisible(!isTokenDetailsModalVisible);
  };
  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(contentOffsetX / 335);
    setActiveDotIndex(pageIndex);
  };

  const renderItem = ({ item, index }) => (
    <View
      style={{ marginBottom: index === currencyData.length - 1 ? "10%" : 0 }}
    >
      <CurrencyDetailsCard item={item} />
    </View>
  );

  useEffect(() => {
    async function testIntegration() {
      const provider = new ethers.JsonRpcProvider(
        "https://mainnet.infura.io/v3/c5a9eaae75b04ad78aeb479a275fa884"
      );
      const erc20Prov = new Erc20Contract(
        "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        provider
      );

      console.log(
        "Test function:",

        await erc20Prov.balanceOf("0x28C6c06298d514Db089934071355E5743bf21d60"),
        await erc20Prov.symbol(),
        await erc20Prov.name(),
        await erc20Prov.decimals()
      );
      // console.log("erc20Prov", JSON.stringify(erc20Prov, null, 2));
      console.log(" erc20Prov.symbol()");
      console.log("provider.getSigner()", provider.getSigner());

      provider
        .getBlockNumber()
        .then((blockNumber) => {
          console.log("Current block number:", blockNumber);
        })
        .catch((err) => {
          console.error("Error fetching block number:", err);
        });
    }
    testIntegration()
      .then((blockNumber) => {
        console.log("main", blockNumber);
      })
      .catch((err) => {
        console.error("main error:", err);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.allNetworksView}>
          <Image
            source={require("../assets/images/allNetwork.png")}
            style={styles.allNetworksImage}
          />
          <TouchableOpacity onPress={() => setAllNetworksModalVisible(true)}>
            <Text style={styles.allNetworksText}>All Networks</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setAllNetworksModalVisible(true)}>
            <Image
              source={require("../assets/images/dropdown.png")}
              style={styles.dropdownImage}
            />
            <AllNetworksModal
              transparent={true}
              isVisible={allNetworksModalVisible}
              onClose={() => setAllNetworksModalVisible(false)}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.timerImage}>
          <Image source={require("../assets/images/timer.png")} />
        </View>
      </View>
      <View>
        {/* <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        > */}
        <LinearGradient
          colors={["#F19220", "#BE6800"]}
          start={{ x: -0.2, y: 0.1 }}
          end={{ x: 1, y: 0 }}
          style={[styles.wallet, { borderRadius: 10, overflow: "hidden" }]}
        >
          <View style={styles.walletContentContainer}>
            <View>
              <Text style={styles.walletName}>Wallet</Text>
              <Text style={styles.walletCode}>0Wefsxc584sfg </Text>
            </View>
          </View>

          <Image
            source={require("../assets/images/walletImage.png")}
            style={styles.walletImage}
          />

          <Text style={styles.receiveText}>Receive</Text>
          <Image
            source={require("../assets/images/receiveScanner.png")}
            style={{ position: "absolute", top: 27, right: 18 }}
          />
          <View style={styles.walletBalanceContainer}>
            <View>
              <Text style={styles.yourBalanceText}>Your balance</Text>
              <Text style={styles.balanceText}>USD 78,092.01</Text>
            </View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <View style={styles.modalIconContainer}>
                <Image
                  source={require("../assets/images/modalDot.png")}
                  style={styles.modalDotImage}
                />

                <CustomModal
                  transparent={true}
                  isVisible={modalVisible}
                  onClose={() => setModalVisible(false)}
                />
              </View>
            </TouchableOpacity>
          </View>
        </LinearGradient>
        {/* <LinearGradient
            colors={["#F19220", "#BE6800"]}
            start={{ x: -0.2, y: 0.1 }}
            end={{ x: 1, y: 0 }}
            style={[styles.wallet, { borderRadius: 10, overflow: "hidden" }]}
          >
            <View style={styles.walletContentContainer}>
              <View>
                <Text style={styles.walletName}>Wallet 2</Text>
                <Text style={styles.walletCode}>0Wefsxc584sfg </Text>
              </View>
            </View>

            <Image
              source={require("../assets/images/walletImage.png")}
              style={styles.walletImage}
            />

            <Text style={styles.receiveText}>Receive</Text>
            <Image
              source={require("../assets/images/receiveScanner.png")}
              style={{ position: "absolute", top: 27, right: 18 }}
            />
            <View style={styles.walletBalanceContainer}>
              <View>
                <Text style={styles.yourBalanceText}>Your balance</Text>
                <Text style={styles.balanceText}>USD 78,071.01</Text>
              </View>
              <View style={styles.modalIconContainer}>
                <Image
                  source={require("../assets/images/modalDot.png")}
                  style={styles.modalDotImage}
                />
              </View>
            </View>
          </LinearGradient> */}
        {/* <LinearGradient
            colors={["#F19220", "#BE6800"]}
            start={{ x: -0.2, y: 0.1 }}
            end={{ x: 1, y: 0 }}
            style={[styles.wallet, { borderRadius: 10, marginRight: 10 }]}
          >
            <View style={styles.walletContentContainer}>
              <View>
                <Text style={styles.walletName}>Wallet 3</Text>
                <Text style={styles.walletCode}>0Wesfsxc584sfg </Text>
              </View>
            </View>

            <Image
              source={require("../assets/images/walletImage.png")}
              style={styles.walletImage}
            />

            <Text style={styles.receiveText}>Receive</Text>
            <Image
              source={require("../assets/images/receiveScanner.png")}
              style={{ position: "absolute", top: 27, right: 18 }}
            />
            <View style={styles.walletBalanceContainer}>
              <View>
                <Text style={styles.yourBalanceText}>Your balance</Text>
                <Text style={styles.balanceText}>USD 78,071.01</Text>
              </View>
              <View style={styles.modalIconContainer}>
                <Image
                  source={require("../assets/images/modalDot.png")}
                  style={styles.modalDotImage}
                />
              </View>
            </View>
          </LinearGradient> */}
        {/* </ScrollView> */}
        {/* <View style={styles.dotContainer}>
          {[...Array(3)].map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === activeDotIndex ? styles.activeDot : null,
              ]}
            />
          ))}
        </View> */}
      </View>
      <View style={{ flex: 0.8 }}>
        <FlatList
          data={currencyData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
      </View>
      <TouchableOpacity
        style={{ alignItems: "flex-end" }}
        onPress={toggleEnterTokenModal}
        // onPress={handleFetchData}
      >
        <Image
          source={require("../assets/images/plus.png")}
          style={styles.plusImage}
        />
      </TouchableOpacity>
      <EnterTokenModal
        value={tokenInput}
        onChangeText={(text) => setTokenInput(text)}
        // onPress={() => handleToken()}
        isVisible={isTokenDetailsModalVisible}
        onClose={toggleEnterTokenModal}
      />
    </View>
  );
};

export default Dashboard;
