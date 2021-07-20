import React, { useState } from 'react'; 
import { StyleProp, ViewStyle, TouchableOpacity, TouchableHighlight } from 'react-native';
import { View, Text, Button } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import DropdownSelectorStyles from '../../styles/components/commons/DropdownSelector.style';

type DropDownListItemProps = {
	item: DropDownItem, 
	onItemPress: (itemVal: string) => void,
	listItemStyle?: StyleProp<ViewStyle>
}

const DropDownListItem = ({item, listItemStyle, onItemPress}: DropDownListItemProps): JSX.Element => {
	const { value, label } = item; 

	return <View style={[listItemStyle, DropdownSelectorStyles.listItem]}>
		<TouchableOpacity
			onPress={() => onItemPress(value)}>
			<Text>
				{label}
			</Text>
		</TouchableOpacity>
	</View>;
};

type DropDownPickerProps = {
	containerStyle?: StyleProp<ViewStyle>, 
	headerStyle?: StyleProp<ViewStyle>, 
	listContainerStyle?: StyleProp<ViewStyle>, 
	listItemStyle?: StyleProp<ViewStyle>, 
	value: string, 
	onValueChange: (selected: string) => void, 
	items: DropDownItem[],
	placeholderText?: string
}

type DropDownItem = { 
	value: string,
	label: string
}

export const DropDownPicker = (props: DropDownPickerProps): JSX.Element => {
	const [isOpen, setIsOpen] = useState<boolean>(false); 

	return (
		<View
			style={[DropdownSelectorStyles.container, props.containerStyle]}>
			<TouchableOpacity 
				style={[DropdownSelectorStyles.headerContainer, props.headerStyle]}
				onPress={() => setIsOpen(!isOpen)}>
				<Text>
					{props.items.filter(item => item.value === props.value)[0]?.label ?? props.placeholderText ?? 'Please select item'}
				</Text>
			</TouchableOpacity>
			{isOpen 
				? (
					<View style={[props.listContainerStyle]}>
						{props.items.map((item, index) => (
							<DropDownListItem 
								key={item.value}
								item={item}
								onItemPress={(val) => { 
									props.onValueChange(val);
									setIsOpen(!isOpen);
								}}
							/>
						))}
					</View>
				) 
				: null}
		</View>
	); 
};

type SearchableTextInputProps = {
	value: string | undefined, 
	placeholderText?: string, 
	onValueChange: (val: string | undefined) => void, 
	onItemAdd: (val: string) => void
}

const SearchableTextInput = ({value, placeholderText, onValueChange, onItemAdd}: SearchableTextInputProps) => {
	return (
		<View 
			style={DropdownSelectorStyles.searchableTextInputContainer} >
			<TextInput 
				value={value}
				placeholder={placeholderText}
				onChangeText={onValueChange}
			/>
			<Button 
				title={'Add'}
				onPress={() => {if (value) { 
					onItemAdd(value); 
				}}}
			/> 
		</View>
	);
};

type MultiItemViewerProps = { 
	items: string[], 
	onItemDelete: (item: string) => void, 
	disabled?: boolean
}

export const MultiItemViewer = ({items, onItemDelete, disabled = false}: MultiItemViewerProps) => {
	return <View
		style={DropdownSelectorStyles.multiItemViewerContainer}
	>
		{items.map(item => (
			<View 
				style={DropdownSelectorStyles.multiItemViewerItemContainer}
				key={item}>
				<Text
					style={DropdownSelectorStyles.multiItemViewerItemText}>
					{item}
				</Text>
				{ !disabled 
					? (<TouchableOpacity
						onPress={() =>{ if (!disabled) { onItemDelete(item); }}}
						style={DropdownSelectorStyles.multiItemViewerItemIcon}
					>
						<Entypo name='circle-with-cross' size={24} color='black' />
					</TouchableOpacity>)
					: null
				}
			</View>
		))}
	</View>;
};

type MultiDropDownPickerProps = {
	containerStyle?: StyleProp<ViewStyle>, 
	headerStyle?: StyleProp<ViewStyle>, 
	listContainerStyle?: StyleProp<ViewStyle>, 
	listItemStyle?: StyleProp<ViewStyle>, 
	value: string[], 
	onAdditionalItemSelect: (selectedVals: string[]) => void, 
	onItemCreateNew: (itemVal: string) => void, 
	onItemDelete: (val: string) => void, 
	items: DropDownItem[],
	placeholderText?: string
	searchableInputPlaceholderText?: string, 
	disabled?: boolean
};

export const MultiDropDownPicker = (props: MultiDropDownPickerProps): JSX.Element => {
	const [isOpen, setIsOpen] = useState<boolean>(false); 
	const [searchableText, setSearchableText] = useState<string>(); 

	const searchedItems = searchableText 
		? (props.items.filter(item => {
			return item.label.indexOf(searchableText) > -1; 
		}))
		: props.items;

	return (
		<View
			style={[DropdownSelectorStyles.container, props.containerStyle]}>
			<TouchableOpacity 
				style={[DropdownSelectorStyles.headerContainer, props.headerStyle]}
				onPress={() => {
					if (!props.disabled) {
						setSearchableText(undefined); 
						setIsOpen(!isOpen);}}}>
				{props.value.length <= 0 
					? <Text>{props.placeholderText ?? 'No tags selected'}</Text>
					: <MultiItemViewer 
						disabled={props.disabled ?? false}
						items={props.value}
						onItemDelete={props.onItemDelete}					
					/>}
			</TouchableOpacity>
			{isOpen 
				? (
					<View style={[DropdownSelectorStyles.dropDownPickerContainer, props.listContainerStyle]}>
						<SearchableTextInput 
							placeholderText={props.searchableInputPlaceholderText}
							onItemAdd={(val) => {
								props.onItemCreateNew(val); 
								setSearchableText(undefined);
								setIsOpen(!isOpen);
							}}
							value={searchableText} 
							onValueChange={setSearchableText} />
						{props.items.length <= 0 
							? (<>
								<Text>No items found.</Text>
							</>)
							: <>
								{/* TODO: fix the re-sizing when searching for tags */}
								<ScrollView 
									style={DropdownSelectorStyles.scrollViewPicker}
									bounces={false}
								>
									{searchedItems.map((item, index) => (
										<DropDownListItem 
											key={item.value}
											item={item}
											onItemPress={() => { 
												// add item to value
												props.onAdditionalItemSelect([...props.value, item.value]);
												setSearchableText(undefined); 
												setIsOpen(!isOpen);
											}}
										/>
									)).slice(0, 10)}
								</ScrollView>
							</>}
					</View>
				) 
				: null}
		</View>
	); 
};


