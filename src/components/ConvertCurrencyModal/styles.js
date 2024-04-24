import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalContent: {
    width: "60%",
    height: "21%",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    alignSelf: "center",
    position: "absolute",
    top: "58%",
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
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center",
    marginVertical: "2%",
    marginRight: "5%",
  },
  selectedText: {
    alignSelf: "center",
    marginTop: 10,
    color: "#253452",
    fontSize: 16,
    fontWeight: "bold",
  },
  tokenItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: "2%",
  },
  tokenLogo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: "3%",
  },
  tokenDetails: {
    flex: 1,
    marginLeft: 10,
  },
  tokenSymbol: {
    fontSize: 16,
    color: "#253452",
    fontWeight: "800",
  },
  tokenSeparator: {
    height: 1,
    backgroundColor: "lightgray",
    marginVertical: 5,
  },
  loader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    zIndex: 50,
  },
});
