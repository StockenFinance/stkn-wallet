import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { removeWalletCardByIndex } from "../redux/reducer/walletCardSlice";
import { useDispatch, useSelector } from "react-redux";
import { setNavigationEnabled } from "../redux/reducer/navigationSlice";
import { useNavigation } from "@react-navigation/native";
import { emptyCardData } from "../redux/reducer/currencyCardSlice";
import { ethers } from "ethers";

const DeleteWalletModal = ({ visible, setStatus, index }) => {
  const slide = React.useRef(new Animated.Value(300)).current;

  const walletCardData = useSelector(
    (state) => state.walletcards.walletCardData
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const removeWalletCardItem = () => {
    closeModal();
    if (walletCardData.length === 1) {
      Alert.alert(
        "Alert",
        "Are you sure you want to remove the last wallet?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              dispatch(removeWalletCardByIndex(0));
              // deleteWallet();
              dispatch(emptyCardData(index));
              closeModal();
              navigation.reset({
                index: 0,
                routes: [{ name: "Welcome" }],
              });
              // Close modal after removing the wallet card
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      dispatch(removeWalletCardByIndex(index));
      // deleteWallet();
      dispatch(emptyCardData(index));
    }
  };

  const deleteWallet = () => {
    const key = walletCardData[index].newWalletAddress.publicKey;
    const wallet = new ethers.Wallet(key);
    console.log("deletew status", wallet);
    wallet.disconnect();
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

  return (
    <Modal visible={visible} transparent>
      <TouchableOpacity style={styles.backdrop} onPress={closeModal}>
        <Animated.View
          style={[styles.bottomSheet, { transform: [{ translateY: slide }] }]}
        >
          <View style={styles.container}>
            <View style={styles.warnigHeading}>
              <Text style={styles.warnigHeadingText}>WARNING!</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.warningText}>
                Are you sure you want to delete the wallet?
              </Text>
              <Text style={[styles.warningText, styles.warningTextSecond]}>
                Please, make sure you saved the phrase. Funds associated with
                the wallet will not be affected.
              </Text>
            </View>
            <TouchableOpacity
              onPress={removeWalletCardItem}
              style={styles.getStartedContainer}
            >
              <Text style={styles.getStartedText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={closeModal}
              style={[
                styles.getStartedContainer,
                { backgroundColor: "#D5DFEB" },
              ]}
            >
              <Text style={[styles.getStartedText, { color: "#979797" }]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

export default DeleteWalletModal;

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
    backgroundColor: "#FFFFFF",
  },
  warnigHeading: {
    marginTop: 15,
  },
  warnigHeadingText: {
    fontSize: 25,
    fontWeight: "700",
    color: "#F12020",
  },
  textContainer: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  warningText: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    color: "#9F9FA0",
    marginBottom: 10,
  },
  warningTextSecond: {
    marginBottom: 0,
  },
  getStartedContainer: {
    width: "80%",
    height: 55,
    borderRadius: 10,
    backgroundColor: "red",
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
