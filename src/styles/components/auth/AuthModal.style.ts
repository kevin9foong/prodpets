import { StyleSheet } from 'react-native';
import common from '../../common.style';
import theme from '../../theme.style';

export default StyleSheet.create({
	container: {
		display: 'flex', 
		margin: 'auto', 
		width: '100%'
	},
	modalContentContainer: {
		flex: 3, 
		borderTopLeftRadius: 35, 
		borderTopRightRadius: 35, 
		position: 'absolute', 
		bottom: 0, 
		height: '60%',
		width: '100%', 
		backgroundColor: theme['color-primary-300']
	},
	inputUserContainer: { 
		marginTop: 20,
		marginBottom: 10
	},
	input: {
		...common.button,
		...theme.mediumButtonText,
		padding: 10,
		marginVertical: 5, 
		color: theme['color-light-contrast'],
		backgroundColor: theme['color-primary-400'] 
	},
	button: {
		...common.button, 
		marginTop: 10, 
		backgroundColor: theme['color-light-contrast']
	},
	buttonText: { 
		...theme.mediumButtonText, 
		color: theme['color-primary-400']
	},
	oAuthContainer: {
		flex: 1
		// marginHorizontal: '10%',
		// height: 50
	}, 
});