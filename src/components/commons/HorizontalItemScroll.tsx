import React from 'react'; 
import { View, FlatList, Text, TouchableOpacity } from 'react-native'; 
import HorizontalItemScrollStyle from '../../styles/components/commons/HorizontalItemScroll.style';

type item = {
    label: string, 
    value: string
}

type HorizontalItemScrollProps = {
    items: item[], 
    selectedItems: item[], 
    onItemPress: (pressedItem: item) => void
}

type ItemContainerProps = {
	item: item, 
	isSelected: boolean, 
	onItemPress: (pressedItem: item) => void
}

const ItemContainer = ({item, isSelected, onItemPress}: ItemContainerProps) => {
	return (
		<TouchableOpacity 
			style={[HorizontalItemScrollStyle.itemContainer]}
			onPress={() => onItemPress(item)}
		>
			<View>
				<Text style={isSelected 
					? HorizontalItemScrollStyle.itemSelected 
					: HorizontalItemScrollStyle.itemNotSelected}>
					{item.label}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

const HorizontalItemScroll = ({items, selectedItems, onItemPress}: HorizontalItemScrollProps): JSX.Element => {
	return (
		// <View style={HorizontalItemScrollStyle.container}>
		<FlatList 
			contentContainerStyle={HorizontalItemScrollStyle.container}
			horizontal={true}
			data={items}
			keyExtractor={item => item.value}
			renderItem={({item}) => {
				const isItemSelected = selectedItems.map(item => item.value).includes(item.value); 
				return <ItemContainer item={item} isSelected={isItemSelected} onItemPress={onItemPress} />;
			}}
		/>
		// </View> 
	);
};

export default HorizontalItemScroll;