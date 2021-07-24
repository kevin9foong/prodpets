import { StyleSheet } from 'react-native';
import common from '../../common.style';
import theme from '../../theme.style';

export default StyleSheet.create({
	container: {
		marginHorizontal: 5,
		marginVertical: 5, 
		display: 'flex', 
		flexGrow: 1, 
		flexDirection: 'row', 
		justifyContent: 'space-evenly', 
	},
	itemContainer: {
		padding: 10, 
		borderRadius: 8,
		backgroundColor: theme['color-primary-200'], 
		margin: 5
	}, 
	itemSelected: {
		fontWeight: 'bold'
	}, 
	itemNotSelected: {
		
	}
});