import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalContent: {
    width: 160,
    height: "auto",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 6,
    alignSelf: "center",
    position: "absolute",
    top: 103,
    left: 25,
  },
  modalSeparator: {
    height: 1,
    backgroundColor: "gray",
    marginVertical: 5,
  },
  modalContainer: {
    justifyContent: "flex-end",
    margin: 0,
  },
  copyText: {
    color: "#253452",
    fontSize: 12,
    fontWeight: "400",
  },
});
