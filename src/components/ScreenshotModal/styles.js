import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
