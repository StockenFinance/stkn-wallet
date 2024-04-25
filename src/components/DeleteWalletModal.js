import React from "react";
import { View, Text, StyleSheet, Animated, Pressable } from "react-native";
import CameraIcon from "../SvgIcon/CameraIcon";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { setModal } from "../redux/reducer/CounterSlice";

const DeleteWalletModal = ({ setStatus }) => {
  const slide = React.useRef(new Animated.Value(300)).current;

  const dispatch = useDispatch();

  const slideUp = () => {
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
      <Pressable style={{ width: "100%", height: "40%" }}>
        <Animated.View
          style={[styles.bottomSheet, { transform: [{ translateY: slide }] }]}
        >
          <View style={styles.container}>
            <View style={styles.warnigHeading}>
              <Text style={styles.warnigHeadingText}>WARNING!</Text>
            </View>
            <View style={styles.textContainer}>
              <View>
                <Text style={styles.warningText}>
                  Are you sure you want to delete the wallet? It will be
                  permanently deleted after 24 hours.
                </Text>
              </View>
              <View style={styles.warningTextSecond}>
                <Text style={styles.warningText}>
                  Please, make sure you saved the phrase. Funds associated with
                  the wallet will not be affected.
                </Text>
              </View>
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
      </Pressable>
    </Pressable>
  );
};

export default DeleteWalletModal;

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    flex: 1,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    height: "280%",
    justifyContent: "flex-end",
    zIndex: 999,
    top: -5,
  },
  bottomSheet: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: 20,
    top: 148,
  },
  container: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    height: 400,
  },

  warnigHeading: {
    width: 132,
    marginTop: 15,
  },
  warnigHeadingText: {
    fontSize: 25,
    fontWeight: "700",
    textAlign: "left",
    color: "#F12020",
  },

  warnigSubHeading: {
    width: 237,
    marginTop: 27,
  },
  warnigSubHeadingText: {
    fontFamily: "NunitoSans-Bold",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "left",
    color: "#253452",
  },
  cameraIcon: {
    marginTop: 30,
  },

  textContainer: {
    width: 332,
    height: 80,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  warningText: {
    fontSize: 15,
    fontWeight: "semibold",
    textAlign: "center",
    color: "#9F9FA0",
  },
  warningTextSecond: {
    marginTop: 10,
  },

  getStartedContainer: {
    width: 335,
    height: 55,
    borderRadius: 10,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10%",
  },
  getStartedText: {
    fontSize: 21,
    fontWeight: "700",
    color: "#ffffff",
  },
});
