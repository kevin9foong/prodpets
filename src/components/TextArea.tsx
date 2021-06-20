import React from 'react'; 
import { TextInput } from 'react-native';
import TextAreaStyles from '.././styles/components/commons/TextArea.style';

type StateProps = {
    onChangeText: (text: string) => void, 
    onBlur: () => void, 
    value: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    style?: any, 
    [key: string]: unknown
}

const TextArea = ({onChangeText, onBlur, value, ...extraProps}: StateProps): JSX.Element => {
	return (
		<TextInput
			{...extraProps}
			style={[TextAreaStyles.textArea, extraProps.style]}
			multiline = {true}
			onChangeText={onChangeText}
			onBlur={onBlur}
			value={value}
		/>
	);
};

export default TextArea;
