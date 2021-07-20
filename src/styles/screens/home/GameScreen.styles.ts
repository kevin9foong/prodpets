import { StyleSheet } from "react-native";
import theme from "../../theme.style";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    alignContent: "center",
    flex: 1,
  },
  formContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "column",
    alignContent: "center",
    flex: 1,
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indivTimeInput: {
    fontSize: 70,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },
  timeDisplay: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
  },
  timeInput: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 20,
    borderRadius: 10,
    backgroundColor: theme['color-primary-200'],
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
  },
  divider: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dividerLine: {
    marginHorizontal: 20,
    height: 1,
    borderWidth: 1,
    borderColor: 'lightgray',
    flex: 1,
  },
  xpGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  xp: {
    color: 'tomato',
    margin: 10,
    fontSize: 15,
  },
  coins: {
    color: '#eeb422',
    margin: 10,
    fontSize: 15,
  }
});

export default styles
