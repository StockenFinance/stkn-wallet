import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "10%",
    marginLeft: "10%",
  },
  backIcon: {
    width: 25,
    height: 25,
  },
  walletText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#253452",
    marginTop: "-1%",
    marginLeft: "-10%",
  },
  createWalletView: {
    flexDirection: "row",
    alignItems: "center",
    width: "93%",
    height: 53,
    marginTop: "10%",
    alignSelf: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#808BA0",
  },
  createWalletImage: {
    alignSelf: "center",
    width: 34,
    height: 34,
    marginLeft: "10%",
    marginHorizontal: "5%",
  },
  createWalletText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#233452",
    marginLeft: "7%",
  },
  divider: {
    height: "70%",
    width: 1,
    backgroundColor: "#000000",
    opacity: 0.3,
  },
  forwardIcon: {
    marginTop: "1%",
    marginLeft: "auto",
    marginRight: "3%",
  },
  swapImageContainer: {
    width: 35,
    height: 35,
    borderRadius: 10,
    backgroundColor: "#F2A13F",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "5%",
    marginLeft: "5%",
  },
  image: {
    width: 19, // Adjust the width of the image as needed
    height: 17, // Adjust the height of the image as needed
    marginHorizontal: 10, // Adjust the margin between the image and dividers as needed
  },
  languageImage: {
    width: 22,
    height: 22,
  },
  currencyText: {
    color: "#253452",
    marginLeft: "auto",
    fontSize: 17,
    fontWeight: "800",
    marginRight: "4%",
  },
  dollarText: { fontSize: 16, fontWeight: "800", color: "#ffffff" },
});
