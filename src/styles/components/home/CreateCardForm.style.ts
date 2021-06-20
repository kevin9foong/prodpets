import { StyleSheet } from 'react-native';
import common from '../../common.style';
import theme from '../../theme.style';

export default StyleSheet.create({
	container: {
		...common.homeContainer
	}, 
	topContainer: {
		flex: 1,
		backgroundColor: theme['color-primary-300'],
		display: 'flex',
		justifyContent: 'center'
	},
	bottomContainer: {
		flex: 2
	},
	titleContainer: { 
		...common.inputContainer
	}, 
	titleInput: {
		...common.input, 
		minHeight: 40, 

	},
	descriptionContainer: {
		...common.inputContainer
	},
	descriptionInput: {
		...common.input, 
		minHeight: 60,
	}, 
	inputLabel: {
		width: '100%',
		textAlign:'left',
		color: theme['color-light-contrast']
	}
});