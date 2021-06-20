import { StyleSheet } from 'react-native';
import common from '../../common.style';
import theme from '../../theme.style';

export default StyleSheet.create({
	container: {
		...common.homeContainer,
		alignItems: 'center',
		marginTop: 10
	},
	list: {
		width: '100%'
	}
});