import React from 'react'; 
import { TextInput, View, TouchableWithoutFeedback, Keyboard, Text, Button } from 'react-native';
import CountDown from 'react-native-countdown-component';
import theme from '../../styles/theme.style';

const GameScreen: React.FC = () => {
	const [minutes, setMinutes] = React.useState('');
	const [hours, setHours] = React.useState('');
	const [isCountingDown, setIsCountingDown] = React.useState(false);

	const onTextChanged = (text: String, fn: Function) => {
		// code to remove non-numeric characters from text
		fn(text.replace(/[^0-9]/g, ''))
	}

	const calcTime = () => {
		let hour = hours === "" ? '0' : hours;
		let minute = minutes === "" ? '0' : minutes;
		const time = parseInt(hour) * 3600 + parseInt(minute) * 60;
		return time;
	}

	const toggleIsCountingDown = (val: boolean) => {
		if (!val) {
			setHours('');
			setMinutes('');
		}
		setIsCountingDown(val)
	}

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={{display: 'flex', justifyContent: 'space-around', flexDirection: 'column', alignContent: 'center', flex: 1 }}>
				{ !isCountingDown ? 
				<View>
				<View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
					<View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center'}}>
						<TextInput 
							style={{ fontSize: 50, borderWidth: 1, borderColor: 'black', backgroundColor: 'white', padding: 10}}
							keyboardType='numeric'
							onChangeText={(text) => onTextChanged(text, setHours)}
							placeholder='00'
							value={hours}
							/> 
						<Text>Hrs</Text>
					</View>
					<Text style={{fontSize: 50}}> : </Text>
					<View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
						<TextInput 
							style={{ fontSize: 50, borderWidth: 1, borderColor: 'black', backgroundColor: 'white', padding: 10}}
							keyboardType='numeric'
							onChangeText={(text) => onTextChanged(text, setMinutes)}
							placeholder='00'
							value={minutes}
						/> 
						<Text>Mins</Text>
					</View>
				</View>
				<Button title="Choose Task" onPress={() => {} } />
				<Text style={{ alignSelf: 'center' }}>OR</Text>
				<Button title="Start Session without Task" onPress={() => toggleIsCountingDown(true)} />
				</View>
				:
				<CountDown size={30} timeToShow={['H','M','S']} until={calcTime()} onFinish={() => toggleIsCountingDown(false)} digitStyle={{backgroundColor: theme['color-primary-200']}}/>
				} 
		</View>
		</TouchableWithoutFeedback>
	);
};

export default GameScreen; 