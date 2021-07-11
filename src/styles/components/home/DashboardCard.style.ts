import { StyleSheet } from 'react-native';
import common from '../../common.style';
import theme from '../../theme.style';

export default StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		minHeight: 100, 
		marginHorizontal: 10,
		marginVertical: 5, 
		borderRadius: 15,
		backgroundColor: theme['color-primary-200']
	}, 
	textContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 10
	}, 
	titleText: {
		...theme.mediumButtonText,
		marginBottom: 5
	}, 
	descriptionText: {}
});