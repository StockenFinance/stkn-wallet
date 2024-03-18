import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  image: {
    width: "43%",
    marginTop: "31%",
    alignSelf: "center",
  },
  createWalletView: {
    flexDirection: "row",
    alignItems: "center",
    width: "88%",
    height: 61,
    marginTop: "70%",
    alignSelf: "center",
    borderRadius: 15,
    backgroundColor: "rgba(213, 223, 235, 1)",
  },
  createWalletImage: {
    alignSelf: "center",
    width: 34,
    height: 34,
    marginLeft: "10%",
    marginHorizontal: "5%",
  },
  createWalletText: {
    fontSize: 18,
    fontWeight: "400",
    color: "#233452",
    marginLeft: "5%",
  },
  subText: {
    color: "#808191",
    fontSize: 10,
    fontWeight: "700",
    marginLeft: "5%",
  },
  divider: {
    height: "70%",
    width: 1,
    backgroundColor: "#000000",
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
  },
});
