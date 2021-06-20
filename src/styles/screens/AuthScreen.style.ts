import { StyleSheet } from 'react-native';
import common from '../common.style';
import theme from '../theme.style';

export default StyleSheet.create({
	container: {
		display: 'flex', 
		flex: 1, 
		backgroundColor: theme['color-primary-400'],
	},
	buttonContainer: {
		flex: 2,
		display: 'flex',
		marginVertical: '10%',
		backgroundColor: theme['color-primary-400']
	},
	logoContainer: {
		flex: 2,
		display: 'flex', 
		alignItems: 'center',
		marginTop: '10%', 
		marginHorizontal: '10%'
	},
	logo: {
		flex: 1,
		resizeMode: 'contain'
	},
	actionButton: {
		...common.button, 
		marginVertical: 10, 
		borderWidth: 2,
		borderColor: theme['color-light-contrast'],
		backgroundColor: theme['color-primary-400'],
	}, 
	actionButtonText: {
		...theme.mediumButtonText,
		color: theme['color-light-contrast']
	}
});