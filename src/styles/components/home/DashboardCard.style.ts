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
		// borderRadius: 15,
		backgroundColor: theme['color-primary-200']
	}, 
	coloredIndicator: {
		width: 20, 
		backgroundColor: theme['color-primary-300']
	}, 
	textContainer: {
		marginHorizontal: 20, 
		marginVertical: 10, 
		alignItems: 'flex-start', 
		justifyContent: 'space-between',
		flex: 10
	}, 
	titleText: {
		fontSize: 16, 
		fontWeight: '500'
	}, 
	descriptionText: {}, 
	timingText: {
		color: theme['ios-system-blue-light']
	}
});