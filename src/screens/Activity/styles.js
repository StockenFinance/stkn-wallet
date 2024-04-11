import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
  },
  allNetworksView: {
    flexDirection: "row",
    marginTop: "15%",
    marginLeft: "-5%",
    alignItems: "center",
  },
  allNetworksImage: {
    width: 15,
    height: 16,
    marginHorizontal: "2%",
  },
  allNetworksText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#253452",
    marginHorizontal: "2%",
  },
  dropdownImage: {
    width: 20,
    height: 20,
    marginTop: "2%",
  },
  backIconImage: {
    alignSelf: "center",
    marginTop: "15%",
    marginLeft: "-7%",
  },
  activityContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "10%",
    marginLeft: "2%",
  },
  activityText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#344567",
  },
  walletInfo: {
    fontSize: 12,
    fontWeight: "700",
    color: "#253452",
  },
  walletId: {
    fontSize: 13,
    fontWeight: "400",
    color: "#9F9FA0",
  },
  transactionDateText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#344567",
    marginTop: "10%",
    marginLeft: "9%",
  },
  currencyContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "87%",
    alignSelf: "center",
    marginTop: "8%",
    marginLeft: "15%",
  },
  coinNameText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#344567",
  },
  coinNameSubText: {
    fontSize: 11,
    fontWeight: "400",
    color: "#7483A1",
  },
  priceText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#F12020",
    textAlign: "right",
    marginRight: "18%",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "82%",
    alignSelf: "center",
    marginTop: "5%",
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#808BA0",
  },
});
