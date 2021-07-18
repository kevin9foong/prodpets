import React, { useMemo, useState } from 'react'; 

import  { AgendaItemsMap } from 'react-native-calendars';
import { Agenda } from 'react-native-calendars';
import CalendarCard from '../../components/home/CalendarCard';

import { CardModelWithUid } from '../../database/models/cards';
import { useAppSelector } from '../../redux/hooks';
import { selectAllCards } from '../../redux/selectors/cards';
import { getDateString, isSameDate } from '../../util/timeformatter';

import { CalendarParamList } from '../../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';

type CalendarScreenNavigationProp = StackNavigationProp<
	CalendarParamList, 'CalendarScreen'>; 

type StateProps = {
	navigation: CalendarScreenNavigationProp
}

type SelectedDate = {
	month: number, 
	year: number
}

const CalendarScreen = ({ navigation }: StateProps): JSX.Element => {
	const [selectedDateRange, setSelectedDateRange] = useState<SelectedDate>({
		month: new Date().getMonth(), 
		year: new Date().getFullYear()
	}); 

	const cards = useAppSelector(selectAllCards);

	const cardEndsOnSameDate = (cardInfo: CardModelWithUid) => isSameDate(new Date(cardInfo.startdate), new Date(cardInfo.duedate)); 

	// pure function 
	const loadAgendaItemsForTwoMonths = useMemo(() => {
		const { month, year } = selectedDateRange;
		const updatedAgendaInfoCardItems: AgendaItemsMap<CardModelWithUid> = {}; 

		// populate [] to mark as loaded for dates with no cards assigned. 
		const start = new Date(year, month - 1, 1);
		const end = new Date(year, month + 1, 0);
		for (;start < end; start.setDate(start.getDate() + 1)) {
			const date = getDateString(start).toString();
			updatedAgendaInfoCardItems[date] = [...(updatedAgendaInfoCardItems[date] || [])];
		} 

		cards.forEach(card => {
			const startDate = new Date(card.startdate); 
			const dueDate = new Date(card.duedate);
			const startDateStringFormat = getDateString(startDate);

			if (cardEndsOnSameDate(card)) {
				updatedAgendaInfoCardItems[startDateStringFormat] = [...(updatedAgendaInfoCardItems[startDateStringFormat] || []), card];
			} else {
				// if card doesnt end on same date, then display on every day
				for (let variableDate = new Date(card.startdate); variableDate < dueDate; variableDate.setDate(variableDate.getDate() + 1)) {
					updatedAgendaInfoCardItems[getDateString(variableDate)] = [...(updatedAgendaInfoCardItems[getDateString(variableDate)] || []), card];
				}
			}
		});
		return updatedAgendaInfoCardItems; 
	// NOTE: must set dependency array to primitive values for selectedDateRange as loadItemsForMonth triggers a new object reference each time. 
	}, [cards, selectedDateRange.month, selectedDateRange.year]);

	const onCardClick = (cardInfo: CardModelWithUid) => navigation.navigate('ViewCardModal', {uid: cardInfo.uid});
	
	const renderAgendaItem = (agendaItem: CardModelWithUid) => {
		return (
			<CalendarCard 
				key={agendaItem.uid}
				cardInfo={agendaItem} 
				onCardClick={onCardClick} />
		);
	};
	
	const renderEmptyDate = () => {
		return (
			<></>
		);
	};
	
	const isRowChanged = (agendaItemOne: CardModelWithUid, agendaItemTwo: CardModelWithUid) => {
		return agendaItemOne !== agendaItemTwo;
	};

	return (
		<Agenda
			items={loadAgendaItemsForTwoMonths}
			loadItemsForMonth={(selectedDateRange) => setSelectedDateRange(selectedDateRange)}
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			renderItem={(agendaItem: CardModelWithUid, _firstItemInDay: boolean) => renderAgendaItem(agendaItem)}
			renderEmptyDate={renderEmptyDate}
			rowHasChanged={isRowChanged}
			showClosingKnob={true}
		/>
	);
};

export default CalendarScreen;