import { StyleSheet } from 'react-native';
import common from '../../common.style';
import theme from '../../theme.style';

export default StyleSheet.create({
	container: {
		marginHorizontal: '10%'
	}, 
	button: {
		...common.button, 
		...theme.mediumButtonText
	}
});