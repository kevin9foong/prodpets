import { StyleSheet } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
	homeContainer: {
		display: 'flex', 
		flex: 1,
	}, 
	button: { 
		marginHorizontal: '10%',
		borderRadius: 8,
		height: 50,
		justifyContent: 'center', 
		alignItems: 'center'
	}, 
	inputContainer: {
		marginHorizontal: '10%',
		borderRadius: 8,
		justifyContent: 'center', 
		alignItems: 'center'
	},
	input: {
		width: '100%',
		backgroundColor: theme['color-light-contrast'],
	}
});