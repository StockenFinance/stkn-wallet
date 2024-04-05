import React from "react";
import { View, Text, StyleSheet, Animated, Pressable } from "react-native";
import CameraIcon from "../SvgIcon/CameraIcon";
import { TouchableOpacity } from "react-native-gesture-handler";

const ScreenshotModal = ({ setStatus }) => {
  const slide = React.useRef(new Animated.Value(300)).current;

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
      toValue: 300,
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
            <View style={styles.warnigSubHeading}>
              <Text style={styles.warnigSubHeadingText}>
                You have taken a screenshot
              </Text>
            </View>
            <View style={styles.cameraIcon}>
              <CameraIcon />
            </View>
            <View style={styles.textContainer}>
              <View>
                <Text style={styles.warningText}>
                  It isn't safe to take a screenshot of your secret phrase!
                </Text>
              </View>
              <View style={styles.warningTextSecond}>
                <Text style={styles.warningText}>
                  Please, permanently remove this screenshot from your device!
                </Text>
              </View>
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

export default ScreenshotModal;

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    height: "75%",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 20,
    padding: "10%",
  },
  container: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  warnigHeading: {
    width: 132,
    marginTop: 27,
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
    backgroundColor: "#F19220",
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
