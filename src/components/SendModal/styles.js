import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "73%",
    height: 275,
    backgroundColor: "white",
    padding: "5%",
    borderRadius: 12,
    alignItems: "center",
    marginTop: "10%",
  },
  HeaderText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#494949",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: "13%",
  },
  doneButton: {
    width: "55%",
    height: 45,
    borderColor: "#ffffff",
    borderWidth: 0.5,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F19220",
    marginTop: "10%",
  },
  doneButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
  },
  TokenInputContainer: {
    marginRight: "35%",
    width: "70%",
    marginTop: "8%",
  },
  input: {
    width: 220,
    height: 50,
    borderColor: "#E9E9E9",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    paddingVertical: 8,
    marginRight: 10,
    color: "black",
  },
  readOnlyInputsContainer: {
    margin: 20,
  },
  readOnlyInput: {
    width: 120,
    height: 45,
    borderColor: "#E9E9E9",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    color: "black",
    marginVertical: "2%",
    marginHorizontal: "2%",
    textAlign: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  copyPasteIcon: {
    position: "absolute",
    marginTop: "30%",
    right: 15,
  },
  copyPasteImage: {
    width: 25,
    height: 25,
  },
  enterAmountText: {
    color: "black",
    marginBottom: "5%",
  },
  walletAddressText: {
    color: "black",
    marginTop: "5%",
    marginBottom: "3%",
  },
});
