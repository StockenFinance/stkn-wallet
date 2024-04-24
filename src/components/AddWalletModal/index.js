import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  PanResponder,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { styles } from "./styles";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { saveWalletAddress } from "../../redux/actions/walletActions";
import ImportIcon from "../../SvgIcon/ImportIcon";
import CreateIcon from "../../SvgIcon/CreateIcon";
import { createNewWallet } from "../../utils/helper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addWalletAtReduxStore } from "../../redux/reducer/allWalletStore";

const storeWallet = async (wallet) => {
  try {
    await AsyncStorage.setItem("addWallet", JSON.stringify(wallet));
  } catch (error) {
    console.error("Error storing wallet address:", error);
  }
};

const AddWalletModal = ({ navigation, setStatus }) => {
  const { t, i18n } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [generatedWalletAddress, setGeneratedWalletAddress] = useState("");
  const [walletStore, setWalletStore] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [newAccount, setNewAccount] = useState([]);

  console.log("walletStore", walletStore);

  const dispatch = useDispatch();

  const slide = React.useRef(new Animated.Value(300)).current;
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        slide.setValue(gesture.dy + 300);
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dy > 150) {
          slideDown();
          setTimeout(() => {
            setStatus(false);
            setTimeout(() => {
              slideUp();
            }, 0); // Delay before popping up the modal again
          }, 0);
        } else {
          slideUp();
        }
      },
    })
  ).current;

  const slideUp = () => {
    Animated.timing(slide, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const slideDown = () => {
    Animated.timing(slide, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    slideUp();
  }, []);

  const closeModal = () => {
    slideDown();

    setTimeout(() => {
      setStatus(false);
    }, 0);
  };

  const createWallet = () => {
    setLoading(true);
    const { wallet, mnemonic, encryptedWallet } = createNewWallet();
    const phrase = wallet;

    console.log("Phrase wallet: ", JSON.stringify(phrase, null, 2));
    console.log("Phrase wallet: ", phrase?.privateKey);
    console.log("Wallet: ", JSON.stringify(wallet, null, 2));
    console.log("New Wallet Address:", wallet.address);
    console.log("Private Key:", wallet.privateKey);
    console.log("Generated Mnemonic:", mnemonic);
    AsyncStorage.setItem("walletAddress").catch((err) => {
      console.log("Error while setting encrypted wallet: ", err);
    });

    const shortenedAddress =
      wallet.address.slice(0, 6) + wallet.address.slice(-6);
    setGeneratedWalletAddress(shortenedAddress);
    dispatch(saveWalletAddress(shortenedAddress));
    updateCardData(shortenedAddress);
    setWalletStore(wallet);
    dispatch(addWalletAtReduxStore(wallet));
    setTimeout(() => {
      Alert.alert("Wallet is Created");
      // navigation.navigate("Dashboard");
      setLoading(false);
    }, 2000);
  };

  const updateCardData = async (shortenedAddress) => {
    try {
      const existingData = await AsyncStorage.getItem("CARD_DATA");
      console.log(" Existing data CARD_DATA:", existingData);

      // Parse the retrieved string or initialize an empty array
      let dataArray = JSON.parse(existingData) || [];

      console.log("parse card data", dataArray);

      dataArray.push({
        newWalletAddress: shortenedAddress,
        newWalletBalance: "",
      });

      const updatedDataString = JSON.stringify(dataArray);

      await AsyncStorage.setItem("CARD_DATA", updatedDataString);

      console.log("CARD_DATA successfully updated in AsyncStorage");
    } catch (error) {
      console.error("Error updating data: ", error);
    }
  };

  useEffect(() => {
    storeWallet(walletStore);
  }, [generatedWalletAddress, walletStore]);

  useEffect(() => {
    // Retrieve the selected language from AsyncStorage on component mount
    AsyncStorage.getItem("selectedLanguage").then((language) => {
      if (language) {
        setSelectedLanguage(language);
        i18n.changeLanguage(language);
      }
    });
  }, []);

  useEffect(() => {
    const fetchWalletAddress = async () => {
      try {
        const walletAddress = await AsyncStorage.getItem("walletAddress");
        console.log("local storage >>>", walletAddress);
        if (walletAddress) {
          setNewAccount((prevAccount) => {
            return [
              {
                ...prevAccount[0],
                newWalletAddress: walletAddress,
              },
              ...prevAccount.slice(1),
            ];
          });
        }
      } catch (error) {
        console.error(
          "Error fetching wallet address from AsyncStorage:",
          error
        );
      }
    };
    fetchWalletAddress();
  }, []);

  return (
    <Pressable
      onPress={() => {
        slideDown();
        closeModal();
      }}
      style={styles.backdrop}
    >
      <Pressable style={{ width: "100%", height: "40%" }}>
        <Animated.View
          {...panResponder.panHandlers}
          style={[styles.bottomSheet, { transform: [{ translateY: slide }] }]}
        >
          <View style={styles.container}>
            <View>
              <Text style={styles.heading}>{t("addWallet")}</Text>
            </View>
            <TouchableOpacity
              style={styles.createWalletView}
              onPress={() => {
                setLoading(true);
                setTimeout(() => {
                  createWallet();
                }, 100);
              }}
            >
              <CreateIcon style={styles.createWalletImage} />
              <View style={styles.divider}></View>
              <Text style={styles.createWalletText}>
                {t("createNewWallet")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.createWalletView, { marginTop: "5%" }]}
              onPress={() =>
                navigation.navigate("ImportWallet", {
                  selectedLanguage: selectedLanguage,
                })
              }
            >
              <ImportIcon
                style={[styles.createWalletImage, { marginLeft: "10.9%" }]}
              />
              <View style={styles.divider}></View>
              <View style={{ marginLeft: "3%" }}>
                <Text
                  style={[
                    styles.createWalletText,
                    { left: selectedLanguage === "arabic" ? "-25%" : null },
                  ]}
                >
                  {t("importWallet")}
                </Text>
                <Text
                  style={[
                    styles.subText,
                    { left: selectedLanguage === "arabic" ? "-12%" : null },
                  ]}
                >
                  {t("privateKeyText")}
                </Text>
              </View>
            </TouchableOpacity>
            {loading && (
              <ActivityIndicator
                style={styles.loader}
                size="large"
                color="#F19220"
              />
            )}
          </View>
        </Animated.View>
      </Pressable>
    </Pressable>
  );
};

export default AddWalletModal;
