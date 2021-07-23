import React, { useEffect, useRef } from "react";
import {
  TextInput,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Text,
  Button,
  AppState
} from "react-native";
import CountDown from "react-native-countdown-component";
import theme from "../../styles/theme.style";
import GameScreenStyle from "../../styles/screens/home/GameScreen.styles";
import { CardModelWithUid } from "../../database/models/cards";
import { useDispatch } from "react-redux";
import { addCard, updateCard, deleteCard } from '../../redux/actions/cards'; //uses carduid

const GameScreen: React.FC = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const [minutes, setMinutes] = React.useState("");
  const [hours, setHours] = React.useState("");
  const [isCountingDown, setIsCountingDown] = React.useState(false);
  const [associatedCard, setAssociatedCard] = React.useState(null);
  const appState = useRef(AppState.currentState);
  const [currentAppState, setAppState] = React.useState(appState.currentState)
  let timeElapsed = 0;

  const onTextChanged = (text: String, fn: Function) => {
    // code to remove non-numeric characters from text
    fn(text.replace(/[^0-9]/g, ""));
  };

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
  }

  const handleFinish = () => {
    if (associatedCard !== null) {
      dispatch(deleteCard(associatedCard.uid))
    }
      setAssociatedCard(null);
      toggleIsCountingDown(false)
  }

    const handleCancel = () => {
        toggleIsCountingDown(false);
        timeElapsed = 0;
    }

    function handleAppStateChange(nextAppState) {
      if (nextAppState !== 'active') {
          handleCancel()
      }
  }

    useEffect(() => {
        AppState.addEventListener('change', handleAppStateChange)

        return () => {
            AppState.removeEventListener('change', handleAppStateChange)
        }
    }, []);

    useEffect(() => {

        let interval = null

        if (isCountingDown) {
            interval = setInterval(() => {
                timeElapsed = timeElapsed + 1000;
                console.log(timeElapsed)
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return (() => clearInterval(interval))
    }, [isCountingDown])

    const xpGained = (time) => {
        const timeInSeconds = Math.floor(time / 1000);
        return Math.floor((timeInSeconds / 60) / 5);
    }

    /*   AppState.addEventListener("change", handleAppStateChange); */


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={GameScreenStyle.container}>
        <View style={GameScreenStyle.xpGroup}>
          <Text style={GameScreenStyle.xp}>XP: 1200</Text>
          <Text style={GameScreenStyle.coins}>Coins: 5</Text>
        </View>
        {!isCountingDown ? (
          <View style={GameScreenStyle.formContainer}>
            <Text style={{fontSize: 30, color: 'gray', textAlign: 'center'}}>Start focusing now!</Text>
            <View
              style={GameScreenStyle.timeInput}
            >
              <View
                style={GameScreenStyle.timeDisplay}
              >
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
              <View
                style={GameScreenStyle.timeDisplay}
              >
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

            <Text style={{alignSelf: 'center', color: 'grey', fontSize: 20, textAlign: 'center'}}>
              {associatedCard ? `${associatedCard.title} is selected` : 'You have no card selected, click below to select a card' }
            </Text>

            <View style={GameScreenStyle.buttonGroup}>
              <TouchableOpacity style={GameScreenStyle.button} onPress={() => {navigation.navigate('GameScreenModal', { onPressCard })}}>
                <Text style={GameScreenStyle.buttonText}>Choose Task</Text>
              </TouchableOpacity>

            {/* <View style={GameScreenStyle.divider}>
              <View style={GameScreenStyle.dividerLine}></View>
              <Text style={{ alignSelf: "center", fontSize: 20, color: 'grey'}}>OR</Text>
              <View style={GameScreenStyle.dividerLine}></View>
            </View> */}

            <TouchableOpacity style={GameScreenStyle.button} onPress={() => toggleIsCountingDown(true)}>
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
            <Text style={{alignSelf: 'center'}}>You have accumulated { xpGained(timeElapsed) } xp!</Text>
            <TouchableOpacity style={GameScreenStyle.button} onPress={() => handleCancel()}>
              <Text style={GameScreenStyle.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default GameScreen;
