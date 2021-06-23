import { StyleSheet } from 'react-native';
import common from '../../common.style';
import theme from '../../theme.style';

export default StyleSheet.create({
	container: {
		width: '100%', 
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: theme['color-primary-200'], 
		padding: 10,
		borderRadius: 8
	},
	dateTimePickerContainer: {
	}, 
	dateTimePicker: { 
		height: 30,
		justifyContent: 'center'
	}
});