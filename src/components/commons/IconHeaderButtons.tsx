import * as React from 'react';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { HeaderButtons, HeaderButton } from 'react-navigation-header-buttons';

// define IconComponent, color, sizes and OverflowIcon in one place
const FontAwesome5HeaderButton = (props) => (
	<HeaderButton IconComponent={FontAwesome5} iconSize={23} {...props} />
);

export const FontAwesome5HeaderButtons = (props) => {
	return <HeaderButtons HeaderButtonComponent={FontAwesome5HeaderButton} {...props} />;
};