import { StyleSheet } from "react-native";
import theme from "../../theme.style";

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    marginVertical: 10,
  },
  xpContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  xpBar: {
    width: 200,
    height: 20,
    borderRadius: 10,
    backgroundColor: "lightgrey",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  xpNumber: {
    alignSelf: "center",
    color: "dimgrey",
  },
  petName: {
    fontSize: 18,
  },
  petLevel: {
    fontSize: 14,
  },
  button: {
    marginHorizontal: 5,
    padding: 5,
    backgroundColor: theme["color-primary-200"],
    borderRadius: 10,
  },
  nameLine: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInput: {
    borderWidth: 1,
    flex: 1,
    borderRadius: 5,
    borderColor: "grey",
    height: 25,
  },
  petContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: theme["color-primary-100"],
    padding: 20,
  },
});

export default style;
