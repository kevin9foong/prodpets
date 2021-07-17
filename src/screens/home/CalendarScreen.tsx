import React from 'react';
import { StyleSheet, View } from 'react-native';

import  { AgendaItemsMap } from 'react-native-calendars';
import { Agenda } from 'react-native-calendars';
import CalendarCard from '../../components/home/CalendarCard';

import { CardModelWithUid } from '../../database/models/cards';
import { useSelector } from 'react-redux';
import { selectAllCards } from '../../redux/selectors/cards';
import { getDateString, isSameDate, isSameMonth } from '../../util/timeformatter';

import { CalendarParamList } from '../../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';

type CalendarScreenNavigationProp = StackNavigationProp<
	CalendarParamList, 'CalendarScreen'>; 

type StateProps = {
	navigation: CalendarScreenNavigationProp
}

const CalendarScreen = ({ navigation }: StateProps): JSX.Element => {
	const [agendaCardInfoItems, setAgendaCardInfoItems]= React.useState<AgendaItemsMap<CardModelWithUid>>({});

	const cards = useSelector(selectAllCards);

	const cardEndsOnSameDate = (cardInfo: CardModelWithUid) => isSameDate(new Date(cardInfo.startdate), new Date(cardInfo.duedate)); 

	const loadAgendaItemsForMonth = ({ month, year }: any) => {
		const currentMonthCards: CardModelWithUid[] = cards.filter((card: CardModelWithUid)=> isSameMonth(new Date(card.startdate).getMonth(), month)
		&& isSameMonth(new Date(card.duedate).getMonth(), month));

		let updatedAgendaInfoCardItems: AgendaItemsMap<CardModelWithUid> = {...agendaCardInfoItems}; 

		currentMonthCards.forEach(card => {
			const startDate = new Date(card.startdate); 
			const dueDate = new Date(card.duedate);
			const startDateStringFormat = getDateString(startDate);

			if (cardEndsOnSameDate(card)) {
				updatedAgendaInfoCardItems[startDateStringFormat] = [...(updatedAgendaInfoCardItems[startDateStringFormat] || []), card];
			} else {
				// if card doesnt end on same date, then display on every day
				for (const variableDate = new Date(card.startdate); startDate < dueDate; variableDate.setDate(variableDate.getDate() + 1)) {
					updatedAgendaInfoCardItems[startDateStringFormat] = [...(updatedAgendaInfoCardItems[startDateStringFormat] || []), card];
				}
			}
		});

		// populate [] to mark as loaded for dates with no cards assigned. 
		const start = new Date(year, month, 1);
		const end = new Date(year, month + 1, 0);
		for (;start < end; start.setDate(start.getDate() + 1)) {
			const date = getDateString(start).toString();
			if (!updatedAgendaInfoCardItems[date]) {
				updatedAgendaInfoCardItems = {...updatedAgendaInfoCardItems, [date]: []}; 
			}
		}
		setAgendaCardInfoItems(updatedAgendaInfoCardItems);
	};

	const onCardClick = (cardInfo: CardModelWithUid) => navigation.navigate('UpdateCardModal', {uid: cardInfo.uid});
	
	const renderAgendaItem = (agendaItem: CardModelWithUid) => {
		return (
			<CalendarCard 
				cardInfo={agendaItem} 
				onCardClick={onCardClick} />
		);
	};
	
	const renderEmptyDate = () => {
		return (
			<></>
			// <View style={{display: 'flex', justifyContent: 'center'}}>
			// 	<View style={styles.emptyDate}>
			// 	</View>
			// </View>
		);
	};
	
	const isRowChanged = (rowOne: any, rowTwo: any) => {
		return rowOne.name !== rowTwo.name;
	};
	
	return (
		<Agenda
			items={agendaCardInfoItems}
			loadItemsForMonth={loadAgendaItemsForMonth}
			selected={new Date()}
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			renderItem={(agendaItem: CardModelWithUid, _firstItemInDay: boolean) => renderAgendaItem(agendaItem)}
			renderEmptyDate={renderEmptyDate}
			rowHasChanged={isRowChanged}
			showClosingKnob={true}
		/>
	);

};

// const styles = StyleSheet.create({
// 	emptyDate: {
// 		height: 0,
// 		borderBottomColor: '#d3d3d3',
// 		borderBottomWidth: 1,
// 		paddingTop: 50,
// 		marginRight: 30
// 	}
// });

export default CalendarScreen;