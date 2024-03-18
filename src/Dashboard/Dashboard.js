import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import CustomModal from "../../components/customModal";
import { styles } from "./styles";
import { currencyData } from "../../components/coinDetailsData";
import CurrencyDetailsCard from "../../components/CurrencyDetailsCard";

const Dashboard = () => {
  const [activeDotIndex, setActiveDotIndex] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(contentOffsetX / 335);
    setActiveDotIndex(pageIndex);
  };

  const data = [];

  const renderItem = ({ item }) => <CurrencyDetailsCard />;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
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
        <View style={styles.timerImage}>
          <Image source={require("../assets/images/timer.png")} />
        </View>
      </View>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          <LinearGradient
            colors={["#F19220", "#BE6800"]}
            start={{ x: -0.2, y: 0.1 }}
            end={{ x: 1, y: 0 }}
            style={[styles.wallet, { borderRadius: 10, overflow: "hidden" }]}
          >
            <View style={styles.walletContentContainer}>
              <View>
                <Text style={styles.walletName}>Wallet 1</Text>
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
          <LinearGradient
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
          </LinearGradient>
          <LinearGradient
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
          </LinearGradient>
        </ScrollView>
        <View style={styles.dotContainer}>
          {[...Array(3)].map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === activeDotIndex ? styles.activeDot : null,
              ]}
            />
          ))}
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={currencyData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
      </View>
    </View>
  );
};

export default Dashboard;
