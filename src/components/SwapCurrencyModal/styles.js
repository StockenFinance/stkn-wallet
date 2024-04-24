import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalContent: {
    width: "55%",
    height: "20%",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    alignSelf: "center",
    position: "absolute",
    top: "22%",
    left: "10%",
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
    fontSize: 16,
    fontWeight: "800",
    marginLeft: "5%",
    // textAlign: "center",
    marginVertical: "5%",
    marginTop: "-1%",
    // marginRight: "5%",
  },
  selectedText: {
    alignSelf: "center",
    marginTop: 10,
    color: "#253452",
    fontSize: 16,
    fontWeight: "bold",
  },
  defaultItem: {
    backgroundColor: "#f0f0f0", // Background color for default item (ETH)
    paddingVertical: 8,
  },
});
