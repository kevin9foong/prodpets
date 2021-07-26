import React, { useEffect, useState } from 'react';
import {
	TextInput,
	View,
	TouchableWithoutFeedback,
	TouchableOpacity,
	Keyboard,
	Text,
	AppState,
	Vibration,
	AppStateStatus,
} from 'react-native';
import CountDown from 'react-native-countdown-component';
import theme from '../../styles/theme.style';
import GameScreenStyle from '../../styles/screens/home/GameScreen.styles';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { selectAllPets } from '../../redux/selectors/pets';
import { addXp } from '../../redux/actions/pets';
import GameFinishedModal from '../../components/home/GameFinishedModal';
import { GamesParamList } from '../../navigation/types';
import { StackScreenProps } from '@react-navigation/stack';
import { selectCardByUID } from '../../redux/selectors/cards';
import { CardModelWithUid } from '../../database/models/cards';

type ScreenProps = StackScreenProps<GamesParamList, 'GamesScreen'>;

const GameScreen = ({ route, navigation }: ScreenProps): JSX.Element => {
	const dispatch = useAppDispatch();

	const cardUid = route.params; 
	const selectedCard = useAppSelector(selectCardByUID(cardUid?.uid)); 

	const [associatedCard, setAssociatedCard] = useState<CardModelWithUid | undefined>();
	const [isCountingDown, setIsCountingDown] = useState(false);
	const [timeElapsed, setTimeElapsed] = useState(0);
	const [deleteModalVisible, setDeleteModalVisible] = useState(false);
	const [minutes, setMinutes] = useState<number>(0);
	const [hours, setHours] = useState<number>(0); 

	const pets = useAppSelector(selectAllPets);

	const calcSeconds = () => {
		const time = hours * 3600 + minutes * 60;
		return time;
	};

	const toggleIsCountingDown = () => {
		if (isCountingDown) {
			setHours(0);
			setMinutes(0);
		}
		setIsCountingDown(!isCountingDown);
	};

	// TODO: abstract XP handling logic 
	const handleFinish = () => {
		Vibration.vibrate(400, false);
		if (associatedCard) {
			setDeleteModalVisible(true);
			// dispatch(deleteCard(associatedCard.uid)) 
		}
		// code to calculate xp earned
		const xp = xpGained(timeElapsed) + 1;
		// dispatch to store to update user's xp
		dispatch(addXp(xp, 0));

		// resets all variables
		toggleIsCountingDown();
		setTimeElapsed(0);
	};

	// handler function for when user cancels session
	const handleCancel = () => {
		setAssociatedCard(undefined);
		toggleIsCountingDown();
		setTimeElapsed(0);
	};

	//handler function for when user leaves the app
	function handleAppStateChange(nextAppState: AppStateStatus) {
		if (nextAppState !== 'active') {
			handleCancel();
		}
	}

	// handle update state from fetch card from Redux store
	useEffect(() => {
		setAssociatedCard(selectedCard); 
	}, [selectedCard]);

	useEffect(() => {
		AppState.addEventListener('change', handleAppStateChange);
		return () => {
			AppState.removeEventListener('change', handleAppStateChange);
		};
	}, []);

	useEffect(() => {
		let interval: number | undefined = undefined;

		if (isCountingDown) {
			// TODO: fix this typescript error 
			interval = setInterval(() => {
				setTimeElapsed((timeElapsed) => timeElapsed + 1000);
			}, 1000);
		} else {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [isCountingDown]);

	const xpGained = (time: number) => {
		const timeInSeconds = Math.floor(time / 1000);
		// return Math.floor((timeInSeconds / 60) / 5); // can use this to calculate 5mins => 1xp
		return timeInSeconds;
	};

	const onTimerReset = () => {
		setDeleteModalVisible(false);
		setAssociatedCard(undefined);
	};


	return (<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
		<View style={GameScreenStyle.container}>
			<View style={GameScreenStyle.xpGroup}>
				<Text style={GameScreenStyle.xp}>
					{/* TODO: fix and normalize the Redux store design */}
					{pets[0].name}: Level {pets[0].level}, {pets[0].xp} /{' '}
					{pets[0].maxXp}
				</Text>
			</View>
			<GameFinishedModal
				card={associatedCard}
				visible={deleteModalVisible}
				onTimerReset={onTimerReset}
			/>
			{!isCountingDown ? (
				<View style={GameScreenStyle.formContainer}>
					<Text style={{ fontSize: 30, color: 'gray', textAlign: 'center' }}>
              Start focusing now!
					</Text>
					<View style={GameScreenStyle.timeInput}>
						<View style={GameScreenStyle.timeDisplay}>
							<TextInput
								style={GameScreenStyle.indivTimeInput}
								keyboardType="numeric"
								onChangeText={text => setMinutes(parseInt(text.replace(/[^0-9]/g, '')))}
								placeholder="00"
								value={hours.toString()}
							/>
							<Text style={{ fontSize: 20 }}>Hrs</Text>
						</View>
						<Text style={{ fontSize: 60 }}> : </Text>
						<View style={GameScreenStyle.timeDisplay}>
							<TextInput
								style={GameScreenStyle.indivTimeInput}
								keyboardType="numeric"
								onChangeText={(text) => setMinutes(parseInt(text.replace(/[^0-9]/g, '')))}
								placeholder="00"
								value={minutes.toString()}
							/>
							<Text style={{ fontSize: 20 }}>Mins</Text>
						</View>
					</View>

					<Text
						style={{
							alignSelf: 'center',
							color: 'grey',
							fontSize: 20,
							textAlign: 'center',
						}}
					>
						{associatedCard
							? `${associatedCard.title} is selected`
							: 'You have no card selected, click below to select a card'}
					</Text>

					<View style={GameScreenStyle.buttonGroup}>
						<TouchableOpacity
							style={GameScreenStyle.button}
							onPress={() => {
								navigation.navigate('GameCardSelectModal');
							}}
						>
							<Text style={GameScreenStyle.buttonText}>Choose Task</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={GameScreenStyle.button}
							onPress={() => toggleIsCountingDown()}
						>
							<Text style={GameScreenStyle.buttonText}>Start Session</Text>
						</TouchableOpacity>
					</View>
				</View>
			) : (
				<View>
					<CountDown
						size={30}
						timeToShow={['H', 'M', 'S']}
						until={calcSeconds()}
						onFinish={handleFinish}
						digitStyle={{ backgroundColor: theme['color-primary-200'] }}
					/>
					<Text style={{ alignSelf: 'center' }}>
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
