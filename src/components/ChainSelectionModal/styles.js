import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalContent: {
    width: 160,
    height: 110,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 6,
    alignSelf: "center",
    position: "absolute",
    top: "10%",
    left: 30,
    borderWidth: 1,
    borderColor: "#253452",
    overflow: "hidden",
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
  chainText: {
    color: "#253452",
    fontSize: 14,
    fontWeight: "600",
  },
  selectedText: {
    alignSelf: "center",
    marginTop: 10,
    color: "#253452",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalSeparator: {
    height: 1,
    backgroundColor: "gray",
    marginVertical: 5,
  },
});
