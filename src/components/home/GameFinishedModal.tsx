import React from "react";
import { Modal, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { CardModelWithUid } from "../../database/models/cards";
import { useDispatch } from "react-redux";
import { deleteCard } from "../../redux/actions/cards";
import GameModalStyle from "../../styles/components/home/GameFinishedModal";

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
      <View style={GameModalStyle.container}>
        <View style={GameModalStyle.modal}>
          <Text style={GameModalStyle.congratsText}>You did it!</Text>
          {card ? (
            <Text style={GameModalStyle.text}>
              Would you like to delete {card.title}{" "}
            </Text>
          ) : (
            <Text></Text>
          )}
          <TouchableOpacity
            style={GameModalStyle.button}
            onPress={() => clickHandler(true)}
          >
            <Text style={GameModalStyle.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={GameModalStyle.button}
            onPress={() => clickHandler(false)}
          >
            <Text style={GameModalStyle.buttonText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default GameFinishedModal;
