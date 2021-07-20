import { StyleSheet } from 'react-native';
import common from '../../common.style';
import theme from '../../theme.style';

export default StyleSheet.create({
	container: {
		display: 'flex', 
		justifyContent: 'center', 
		width: '100%',
		minHeight: 40, 
		borderRadius: 8, 
		backgroundColor: theme['color-primary-200']
	},
	headerContainer: {
		padding: 10
	}, 
	listItem: {
		padding: 10,
		borderColor: theme['ios-system-gray-light'], 
		borderTopWidth: 1,
		backgroundColor: theme['color-primary-100']
	}, 
	multiItemViewerContainer: {
		display: 'flex', 
		flexDirection: 'row',
		flexWrap: 'wrap'
	}, 
	multiItemViewerItemContainer: {
		display: 'flex', 
		flexDirection: 'row', 
		flexWrap: 'wrap', 
		backgroundColor: theme['color-primary-100'], 
		borderRadius: 8, 
		paddingVertical: 2, 
		paddingHorizontal: 5,
		margin: 2
	}, 
	multiItemViewerItemText: {
		flexGrow: 0
	}, 
	multiItemViewerItemIcon: {
		flexGrow: 0
	}, 
	searchableTextInputContainer: {
		padding: 10
	},
	dropDownPickerContainer: {},
	scrollViewPicker: {
		maxHeight: 150
	}
});