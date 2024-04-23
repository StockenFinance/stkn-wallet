import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  Dimensions,
} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import PasteIcon from "../SvgIcon/PasteIcon";
import SmallAlertIcon from "../SvgIcon/SmallAlertIcon";
import Clipboard from "@react-native-clipboard/clipboard";
import { useDispatch } from "react-redux";
import { setModal } from "../redux/reducer/CounterSlice";

const { height } = Dimensions.get("window");

const PublicKeyModal = ({ setStatus, publicKey }) => {
  const slide = React.useRef(new Animated.Value(height)).current;

  const dispatch = useDispatch();

  const warningText =
    "Never share the private key with anyone, store it securely!";

  const copyToClipboard = async () => {
    try {
      Clipboard.setString(publicKey);
      Alert.alert("Success", "Your public key copied to clipboard!", [
        { text: "OK" },
      ]);
    } catch (error) {
      console.error("Failed to copy text: ", error);
      Alert.alert("Error", "Failed to copy text!", [{ text: "OK" }]);
    }
  };

  const slideUp = () => {
    // Will change slide up the bottom sheet
    Animated.timing(slide, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const slideDown = () => {
    // Will slide down the bottom sheet
    Animated.timing(slide, {
      //   toValue: 300,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    slideUp();
  });

  const closeModal = () => {
    slideDown();

    setTimeout(() => {
      setStatus(false);
      dispatch(setModal(false));
    }, 0);
  };

  return (
    <Pressable onPress={closeModal} style={styles.backdrop}>
      <Pressable style={{ width: "100%", height: "100%" }}>
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
      </Pressable>
    </Pressable>
  );
};

export default PublicKeyModal;

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    flex: 1,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    height: "520%",
    justifyContent: "flex-end",
    zIndex: 999,
    top: -200,
  },
  bottomSheet: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: 20,
    top: 490,
  },
  container: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  publicKeyContainerText: {
    fontSize: 16,
    fontWeight: "semibold",
    color: "#253452",
    marginLeft: 10,
    marginRight: 10,
  },

  warningText: {
    width: "auto",
    height: "auto",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#D5DFEB",
    marginRight: 12,
    marginLeft: 12,
  },

  getStartedContainer: {
    width: 350,
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
