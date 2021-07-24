import React from "react";
import { Modal, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { CardModelWithUid } from "../../database/models/cards";
import { useDispatch } from "react-redux";
import { deleteCard } from "../../redux/actions/cards";

type GameFinishedProps = {
  card: CardModelWithUid;
  visible: boolean;
  reset: Function;
};

const GameFinishedModal = ({ card, visible, reset }: GameFinishedProps) => {
  const dispatch = useDispatch();
  const clickHandler = (shouldDeleteCard: boolean) => {
    if (shouldDeleteCard) {
      dispatch(deleteCard(card.uid));
    }
    reset();
  };

  return (
    <Modal visible={visible} transparent={true}>
      <View style={style.container}>
        <View style={style.modal}>
          <Text>You did it!</Text>
          {card ? (
            <Text>Would you like to delete {card.title} </Text>
          ) : (
            <Text></Text>
          )}
          <TouchableOpacity
            style={style.button}
            onPress={() => clickHandler(true)}
          >
            <Text>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.button}
            onPress={() => clickHandler(false)}
          >
            <Text>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
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
    height: "40%",
    width: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
    opacity: 1,
  },
  button: {
    borderColor: "lightgray",
    borderWidth: 1,
    display: "flex",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
});

export default GameFinishedModal;
