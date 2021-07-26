import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { CardModelWithUid } from '../../database/models/cards';
import { useAppDispatch } from '../../redux/hooks';
import { deleteCard } from '../../redux/actions/cards';
import GameModalStyle from '../../styles/components/home/GameFinishedModal';

type GameFinishedProps = {
  card?: CardModelWithUid;
  visible: boolean;
  onTimerReset: () => void;
};

const GameFinishedModal = ({ card, visible, onTimerReset }: GameFinishedProps): JSX.Element => {
	const dispatch = useAppDispatch();
	const clickHandler = (shouldDeleteCard: boolean) => {
		if (card && shouldDeleteCard) {
			dispatch(deleteCard(card.uid));
		}
		onTimerReset();
	};

	return (
		<Modal visible={visible} transparent={true}>
			<View style={GameModalStyle.container}>
				<View style={GameModalStyle.modal}>
					<Text style={GameModalStyle.congratsText}>You did it!</Text>
					{card ? (
						<Text style={GameModalStyle.text}>
              Would you like to delete {card.title}{' '}
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
