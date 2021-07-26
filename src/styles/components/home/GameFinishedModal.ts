import { StyleSheet } from "react-native";
import theme from "../../theme.style";

export default StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal: {
    backgroundColor: "white",
    height: "30%",
    width: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "lightgray",
    borderRadius: 10,
    opacity: 1,
  },
  button: {
    borderColor: "lightgray",
    borderWidth: 1,
    display: "flex",
    padding: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    backgroundColor: theme["color-primary-200"],
    width: "30%",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
  congratsText: {
    fontSize: 25,
    color: "dimgrey",
  },
  text: {
    fontSize: 15,
    color: "gray",
    marginVertical: 5,
  },
});
