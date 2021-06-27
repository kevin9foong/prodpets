import { StyleSheet } from 'react-native';
import common from '../../common.style';
import theme from '../../theme.style';

export default StyleSheet.create({
	checklistItemContainer: {
		display: 'flex', 
		flexDirection: 'row', 
		alignItems: 'center', 
		marginVertical: 5,
		backgroundColor: theme['color-primary-200'], 
		borderRadius: 8, 
		minHeight: 40, 
		maxHeight: 60
	}, 
	textInput: {
		height: '100%', 
		padding: 5, 
		textAlign: 'center', 
		marginRight: 60, 
		textAlignVertical: 'center'
	}, 
	statusToggleButton: {
		position: 'absolute', 
		top: 0, 
		right: 0,
		width: 60,
		height: '100%',
		// backgroundColor: theme['color-danger-400'],
		borderRadius: 8,
		justifyContent: 'center', 
		alignItems: 'center'
	}
});