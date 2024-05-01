import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Modal,
  Alert,
  Dimensions,
} from "react-native";

import PasteIcon from "../SvgIcon/PasteIcon";
import SmallAlertIcon from "../SvgIcon/SmallAlertIcon";
import Clipboard from "@react-native-clipboard/clipboard";
import { useDispatch } from "react-redux";
import { setModal, setMyTabHide } from "../redux/reducer/CounterSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height } = Dimensions.get("window");

const PublicKeyModal = ({ visible, setStatus, publicKey }) => {
  const [privateKey, setPrivateKey] = useState("");
  const slide = React.useRef(new Animated.Value(height)).current;

  const warningText =
    "Never share the private key with anyone, store it securely!";

  const copyToClipboard = async () => {
    try {
      Clipboard.setString(privateKey);
      Alert.alert("Success", "Your public key copied to clipboard!", [
        { text: "OK" },
      ]);
    } catch (error) {
      console.error("Failed to copy text: ", error);
      Alert.alert("Error", "Failed to copy text!", [{ text: "OK" }]);
    }
  };

  const slideUp = () => {
    Animated.timing(slide, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const slideDown = () => {
    Animated.timing(slide, {
      toValue: 300,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    if (visible) {
      slideUp();
    } else {
      slideDown();
    }
  }, [visible]);

  const closeModal = () => {
    setStatus(false);
  };

  useEffect(() => {
    const fetchPrivateKey = async () => {
      try {
        const storedPrivateKey = await AsyncStorage.getItem("privateKey");
        if (storedPrivateKey !== null) {
          setPrivateKey(storedPrivateKey);
        }
      } catch (error) {
        console.error("Error fetching private key:", error);
      }
    };

    fetchPrivateKey();
  }, []);

  return (
    <Modal visible={visible} transparent>
      <TouchableOpacity style={styles.backdrop} onPress={closeModal}>
        <Animated.View
          style={[styles.bottomSheet, { transform: [{ translateY: slide }] }]}
        >
          <View style={styles.container}>
            <View style={styles.warnigHeading}>
              <Text style={styles.warnigHeadingText}>Your Private Key</Text>
            </View>

            <View style={styles.publicKeyContainer}>
              <Text style={styles.publicKeyContainerText}>{publicKey}</Text>
              <TouchableOpacity onPress={copyToClipboard}>
                <PasteIcon />
              </TouchableOpacity>
            </View>
            <View style={styles.warningText}>
              <SmallAlertIcon />
              <Text style={{ margin: 10, textAlign: "justify" }}>
                {warningText}
              </Text>
            </View>

            <TouchableOpacity
              onPress={closeModal}
              style={styles.getStartedContainer}
            >
              <Text style={styles.getStartedText}>Got It!</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

export default PublicKeyModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSheet: {
    width: "100%",
    height: "70%",
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 20,
  },
  container: {
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  warnigHeading: {
    width: "auto",
  },
  warnigHeadingText: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "left",
    color: "black",
  },
  publicKeyContainer: {
    width: "auto",
    height: "auto",
    marginTop: 20,
    padding: 10,
    borderColor: "#808BA0",
    borderWidth: 1,
    borderRadius: 10,
    margin: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  publicKeyContainerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#253452",
    marginLeft: 10,
    marginRight: 10,
  },
  warningText: {
    width: "99%",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#D5DFEB",
    marginRight: 12,
    marginLeft: 12,
  },
  getStartedContainer: {
    width: "100%",
    height: 55,
    borderRadius: 10,
    backgroundColor: "#F19220",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  getStartedText: {
    fontSize: 21,
    fontWeight: "700",
    color: "#ffffff",
  },
});
