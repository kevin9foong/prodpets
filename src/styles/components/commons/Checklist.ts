import { StyleSheet } from 'react-native';
import common from '../../common.style';
import theme from '../../theme.style';

export default StyleSheet.create({
	checklistContainer: {
		display: 'flex', 
		flexDirection: 'row', 
		alignItems: 'center', 
		marginHorizontal: '10%',
		marginVertical: 5,
		backgroundColor: theme['color-primary-200'], 
		borderRadius: 8, 
		minHeight: 40, 
	}, 
	textInput: {
		flex: 1
	}, 
	statusToggleButton: {
		width: 60,
		backgroundColor: theme['color-danger-400'],
		borderRadius: 8,
		height: 50,
		justifyContent: 'center', 
		alignItems: 'center'
	}
});