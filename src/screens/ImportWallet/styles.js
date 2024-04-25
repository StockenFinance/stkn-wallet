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
    marginTop: "4%",
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
    marginLeft: 20,
  },
  scanIcon: {
    width: 25,
    height: 25,
  },
  headerTextContainer: {
    marginTop: "10%",
    alignItems: "center",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#253452",
  },
  inputHeaderText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#253452",
  },

  inputContainer: {
    marginTop: "10%",
  },
  EnterInputContainer: {
    width: "87%",
    height: 550,
    backgroundColor: "#D5DFEB",
    alignSelf: "center",
    borderRadius: 15,
  },
  importButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
    width: "85%",
    height: 50,
    alignSelf: "center",
    borderRadius: 15,
    backgroundColor: "#D5DFEB",
  },
  importText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#979797",
  },
  importButtonActive: {
    backgroundColor: "#F19220", // Change this to the desired active color
    color: "#ffffff",
  },
  importButtonInactive: {
    backgroundColor: "#D5DFEB", // Default background color
  },
  copyPasteIcon: {
    position: "absolute",
    marginTop: "54%",
    right: 10,
  },
  copyPasteImage: {
    width: 30,
    height: 30,
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
  errorText: {
    color: "red",
    fontSize: 16,
    marginTop: 8,
    textAlign: "center",
  },
});
