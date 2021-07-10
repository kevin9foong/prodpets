import { StyleSheet } from 'react-native';
import common from '../../common.style';
import theme from '../../theme.style';

export default StyleSheet.create({
	checklistContainer: { 
		display: 'flex', 
		width: '100%'
	}, 
	checklistItemContainer: {
		display: 'flex', 
		flexDirection: 'row',
		justifyContent: 'space-between', 
		alignItems: 'center', 
		marginVertical: 5,
		backgroundColor: theme['color-primary-200'], 
		borderRadius: 8, 
		minHeight: 40, 
		maxHeight: 80
	}, 
	checklistItemCompletedContainer: {
		display: 'flex', 
		flexDirection: 'row',
		justifyContent: 'space-between', 
		alignItems: 'center', 
		marginVertical: 5,
		backgroundColor: theme['color-success-400'], 
		borderRadius: 8, 
		minHeight: 40, 
		maxHeight: 80
	}, 
	textInputContainer: {
		padding: 8, 
		flexBasis: 1, 
		flexGrow: 1, 
		flexShrink: 0
	}, 
	textInput: {
		flexGrow: 1, 
		textAlign: 'left',
		textAlignVertical: 'center', 
		overflow: 'visible'
	}, 
	actionButton: { 
		width: 100, 
		flexBasis: 'auto', 
		flexShrink: 0,  
		borderRadius: 8,
		justifyContent: 'center', 
		alignItems: 'center'
	}
});