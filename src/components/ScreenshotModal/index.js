import React from "react";
import { View, Text, StyleSheet, Animated, Pressable } from "react-native";
import CameraIcon from "../../SvgIcon/CameraIcon";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "./styles";

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
