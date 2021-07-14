import { StyleSheet } from 'react-native';
import common from '../../common.style';
import theme from '../../theme.style';

export default StyleSheet.create({
	container: {
		display: 'flex',
		// to give leeway for ScrollView 
		marginBottom: '25%'
	}, 
	topContainer: {
		backgroundColor: theme['color-primary-300'],
		display: 'flex',
		justifyContent: 'flex-start',
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20
	},
	titleContainer: { 
		marginTop: 20,
		minHeight: 60, 
		...common.inputContainer
	}, 
	titleInput: {
		minHeight: 40, 
		...common.input, 
	},
	descriptionContainer: {
		marginBottom: 20,
		minHeight: 80,
		...common.inputContainer
	},
	descriptionInput: {
		minHeight: 60, 
		...common.input
	}, 
	inputLabel: {
		width: '100%',
		textAlign:'left',
		color: theme['color-light-contrast']
	}, 
	inputLabelDark: {
		width: '100%', 
		textAlign: 'left',
		color: '#000'
	},
	bottomContainer: {
		display: 'flex'
	}, 
	fieldContainer: {
		...common.inputContainer,
		margin: 10
	}, 
	dateTimeInput: {
		width: '100%'
	}
});