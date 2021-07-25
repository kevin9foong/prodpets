import React, { useEffect, useRef } from "react";
import {
  TextInput,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Text,
  Button,
  AppState,
  Vibration,
} from "react-native";
import CountDown from "react-native-countdown-component";
import theme from "../../styles/theme.style";
import GameScreenStyle from "../../styles/screens/home/GameScreen.styles";
import { CardModelWithUid } from "../../database/models/cards";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { selectAllPets } from "../../redux/selectors/pets";
import { addXp } from "../../redux/actions/pets";
import { addCard, updateCard, deleteCard } from "../../redux/actions/cards";
import GameFinishedModal from "../../components/home/GameFinishedModal";

const GameScreen: React.FC = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const [minutes, setMinutes] = React.useState("");
  const [hours, setHours] = React.useState("");
  const [isCountingDown, setIsCountingDown] = React.useState(false);
  const [associatedCard, setAssociatedCard] = React.useState(null);
  const appState = useRef(AppState.currentState);
  const [currentAppState, setAppState] = React.useState(appState.currentState);
  const [finishedSuccessfully, setFinishedSuccessfully] = React.useState(true);
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);

  const onTextChanged = (text: String, fn: Function) => {
    // code to remove non-numeric characters from text
    fn(text.replace(/[^0-9]/g, ""));
  };

  const pets = useAppSelector(selectAllPets);

  const calcTime = () => {
    const hour = hours === "" ? "0" : hours;
    const minute = minutes === "" ? "0" : minutes;
    const time = parseInt(hour) * 3600 + parseInt(minute) * 60;
    return time;
  };

  const toggleIsCountingDown = (val: boolean) => {
    if (!val) {
      setHours("");
      setMinutes("");
    }
    setIsCountingDown(val);
  };

  const onPressCard = (card: CardModelWithUid, navigation: any) => {
    setAssociatedCard(card);
    navigation.goBack();
  };

  const handleFinish = () => {
    Vibration.vibrate(400, false);
    if (associatedCard !== null) {
      setDeleteModalVisible(true);
      /*       dispatch(deleteCard(associatedCard.uid)) */
    }

    // code to calculate xp earned
    const xp = xpGained(timeElapsed) + 1;

    // dispatch to store to update user's xp
    console.log(xp);
    dispatch(addXp(xp, 0));

    // resets all variables
    toggleIsCountingDown(false);
    setTimeElapsed(0);
  };

  // handler function for when user cancels session
  const handleCancel = () => {
    setAssociatedCard(null);
    toggleIsCountingDown(false);
    setTimeElapsed(0);
  };

  //handler function for when user leaves the app
  function handleAppStateChange(nextAppState) {
    if (nextAppState !== "active") {
      handleCancel();
    }
  }

  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
    };
  }, []);

  useEffect(() => {
    let interval = null;

    if (isCountingDown) {
      interval = setInterval(() => {
        setTimeElapsed((timeElapsed) => timeElapsed + 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isCountingDown]);

  const xpGained = (time) => {
    const timeInSeconds = Math.floor(time / 1000);
    // return Math.floor((timeInSeconds / 60) / 5); // can use this to calculate 5mins => 1xp
    return timeInSeconds * 10;
  };

  const reset = () => {
    setDeleteModalVisible(false);
    setAssociatedCard(null);
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={GameScreenStyle.container}>
        <View style={GameScreenStyle.xpGroup}>
          <Text style={GameScreenStyle.xp}>
            {pets[0].name}: Level {pets[0].level}, {pets[0].xp} /{" "}
            {pets[0].maxXp}
          </Text>
        </View>
        <GameFinishedModal
          card={associatedCard}
          visible={deleteModalVisible}
          reset={reset}
        />
        {!isCountingDown ? (
          <View style={GameScreenStyle.formContainer}>
            <Text style={{ fontSize: 30, color: "gray", textAlign: "center" }}>
              Start focusing now!
            </Text>
            <View style={GameScreenStyle.timeInput}>
              <View style={GameScreenStyle.timeDisplay}>
                <TextInput
                  style={GameScreenStyle.indivTimeInput}
                  keyboardType="numeric"
                  onChangeText={(text) => onTextChanged(text, setHours)}
                  placeholder="00"
                  value={hours}
                />
                <Text style={{ fontSize: 20 }}>Hrs</Text>
              </View>
              <Text style={{ fontSize: 60 }}> : </Text>
              <View style={GameScreenStyle.timeDisplay}>
                <TextInput
                  style={GameScreenStyle.indivTimeInput}
                  keyboardType="numeric"
                  onChangeText={(text) => onTextChanged(text, setMinutes)}
                  placeholder="00"
                  value={minutes}
                />
                <Text style={{ fontSize: 20 }}>Mins</Text>
              </View>
            </View>

            <Text
              style={{
                alignSelf: "center",
                color: "grey",
                fontSize: 20,
                textAlign: "center",
              }}
            >
              {associatedCard
                ? `${associatedCard.title} is selected`
                : "You have no card selected, click below to select a card"}
            </Text>

            <View style={GameScreenStyle.buttonGroup}>
              <TouchableOpacity
                style={GameScreenStyle.button}
                onPress={() => {
                  navigation.navigate("GameScreenModal", { onPressCard });
                }}
              >
                <Text style={GameScreenStyle.buttonText}>Choose Task</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={GameScreenStyle.button}
                onPress={() => toggleIsCountingDown(true)}
              >
                <Text style={GameScreenStyle.buttonText}>Start Session</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View>
            <CountDown
              size={30}
              timeToShow={["H", "M", "S"]}
              until={calcTime()}
              onFinish={handleFinish}
              digitStyle={{ backgroundColor: theme["color-primary-200"] }}
            />
            <Text style={{ alignSelf: "center" }}>
              You have accumulated {xpGained(timeElapsed)} xp!
            </Text>
            <TouchableOpacity
              style={GameScreenStyle.button}
              onPress={() => handleCancel()}
            >
              <Text style={GameScreenStyle.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default GameScreen;
