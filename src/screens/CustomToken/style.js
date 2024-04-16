import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 60,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 70,
    color: "black",
  },
  input: {
    width: "100%",
    height: 45,
    borderColor: "#E9E9E9",
    borderWidth: 1,
    borderRadius: 8,
    color: "black",
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  pasteIcon: {
    position: "absolute",
    top: 35,
    right: 5,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  tokenDetailsContainer: {
    marginBottom: 20,
  },
  detailInput: {
    width: "100%",
    height: 45,
    borderColor: "#E9E9E9",
    borderWidth: 1,
    borderRadius: 8,
    color: "black",
    marginTop: 5,
    marginBottom: 20,
  },
  addButton: {
    height: 50,
    backgroundColor: "#F19220",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
