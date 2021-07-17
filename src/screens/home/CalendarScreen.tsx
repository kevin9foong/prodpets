import React from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Agenda} from 'react-native-calendars';
import CalendarCard from '../../components/home/CalendarCard';
import { CardModelWithUid } from '../../database/models/cards';
import { useSelector } from 'react-redux';
import { selectCards } from '../../redux/selectors/cards';
import RNGestureHandlerButton from 'react-native-gesture-handler/lib/typescript/components/GestureHandlerButton';

const CalendarScreen = ({navigation}: any) => {
	const [items, setItems]= React.useState({})

	const cards: CardModelWithUid[] = useSelector(selectCards);

	const loadMonthItems = (day: any) => {
		const currMonth = day.month;
		const thisMonthCards = cards.filter(card => sameMonth(card, currMonth))
		
		for (let i = 0; i < thisMonthCards.length; i++) {
			const card = thisMonthCards[i];
			if (sameDate(card.startdate, card.duedate)) {
				const date = getDateString(card.startdate).toString();
				if (!items[date]) {
					items[date] = [];
					items[date].push(card);
				} else {
					if (items[date].includes(card)) {
						continue;
					}
					items[date].push(card);
				}
			} else {
				const currdate = new Date(card.startdate);
				for (; currdate < card.duedate; currdate.setDate(currdate.getDate() + 1)) {
					const date = getDateString(currdate).toString();
					if (!items[date]) {
						items[date] = [];
						items[date].push(card);
					} else {
						if (items[date].includes(card)) {
							continue;
						}
						items[date].push(card);
					}
				}
			}
		}


		const start = new Date(day.year, day.month, 1);
		const end = new Date(day.year, day.month + 1, 0);
		for (; start < end; start.setDate(start.getDate() + 1)) {
			const date = getDateString(start).toString()
			if (!items[date]) {
				items[date] = []
			}
		}
		const newItems = items;
		setItems(newItems)
	}

	const getDateString = (date: Date): String => {
		return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`;
	}

	const sameMonth = (card: CardModelWithUid, currMonth: Number) => {
		if (typeof card.startdate == 'string' || typeof card.duedate === 'string') {
			card.startdate = new Date(card.startdate);
			card.duedate = new Date(card.duedate);
		}
		return (card.startdate.getMonth() <= currMonth && card.duedate.getMonth() >= currMonth);
	}

	const sameDate = (d1: Date, d2: Date) => {
		return d1.getDate() === d2.getDate() &&
			d1.getMonth() === d2.getMonth() &&
			d1.getFullYear() === d2.getFullYear();
	}

	const clickHandler = (card: CardModelWithUid) => navigation.navigate('UpdateCardModal', card);
	
	const renderItem = (item: CardModelWithUid) => {
		return (
			<CalendarCard  cardInfo={item} clickHandler={clickHandler} />
		);
	}
	
	const renderEmptyDate = () => {
		return (
			<View style={{display: 'flex', justifyContent: 'center'}}>
				<View style={styles.emptyDate}>
				</View>
			</View>
		);
	}
	
	const rowHasChanged = (r1, r2) => {
		return r1.name !== r2.name;
	}
	
	return (
		<Agenda
			items={items}
			loadItemsForMonth={loadMonthItems.bind(this)}
			selected={new Date()}
			renderItem={renderItem.bind(this)}
			renderEmptyDate={renderEmptyDate.bind(this)}
			rowHasChanged={rowHasChanged.bind(this)}
			showClosingKnob={true}
		/>
	);

}

const styles = StyleSheet.create({
  emptyDate: {
		height: 0,
		borderBottomColor: `#d3d3d3`,
		borderBottomWidth: 1,
    paddingTop: 50,
		marginRight: 30
  }
});

export default CalendarScreen;