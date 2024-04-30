import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Modal,
} from "react-native";

const DeleteWalletModal = ({ visible, setStatus }) => {
  const slide = React.useRef(new Animated.Value(300)).current;

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
                Are you sure you want to delete the wallet? It will be
                permanently deleted after 24 hours.
              </Text>
              <Text style={[styles.warningText, styles.warningTextSecond]}>
                Please, make sure you saved the phrase. Funds associated with
                the wallet will not be affected.
              </Text>
            </View>
            <TouchableOpacity
              onPress={closeModal}
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
