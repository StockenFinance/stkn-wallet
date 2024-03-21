import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    alignSelf: "center",
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "11%",
  },
  backIcon: {
    width: 25,
    height: 25,
  },
  walletText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#253452",
    marginTop: "-2%",
  },
  scanIcon: {
    width: 3,
    height: 18,
  },
  swapImageContainer: {
    width: 26,
    height: 28,
    borderRadius: 10,
    backgroundColor: "#F2A13F",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "5%",
    marginLeft: "5%",
    marginTop: "-1%",
  },
  image: {
    width: 19,
    height: 17,
    marginHorizontal: 10,
  },
  rangeSelectionView: {
    width: 333,
    height: 53,
    borderRadius: 15,
    backgroundColor: "#F4F7FA",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: "50%",
  },
  rangeText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#253452",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "83%",
    alignSelf: "center",
    marginTop: "5%",
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#808BA0",
  },
  infoContainer: {
    width: "87%",
    height: 77,
    backgroundColor: "#F4F7FA",
    alignSelf: "center",
    marginTop: "5%",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  marketInfoText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#808BA0",
  },
  marketInfoSubtext: {
    fontSize: 15,
    fontWeight: "700",
    color: "#344567",
  },
  descriptionContainer: {
    width: "87%",
    height: 243,
    borderRadius: 15,
    backgroundColor: "#F4F7FA",
    alignSelf: "center",
    marginTop: "5%",
  },
});
