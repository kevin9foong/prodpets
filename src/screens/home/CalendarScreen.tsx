import React from 'react'; 

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
		// need to load for 2 months due to library returning wrong month (actual month + 1) when onDayPress
		const currentMonthCards: CardModelWithUid[] = cards.filter((card: CardModelWithUid)=> {
			return (isSameMonth(new Date(card.startdate).getMonth(), month)
			|| isSameMonth(new Date(card.duedate).getMonth(), month)
			|| isSameMonth(new Date(card.startdate).getMonth(), month - 1) 
			|| isSameMonth(new Date(card.duedate).getMonth(), month - 1));
		});

		const updatedAgendaInfoCardItems: AgendaItemsMap<CardModelWithUid> = {}; 

		// populate [] to mark as loaded for dates with no cards assigned. 
		const start = new Date(year, month - 1, 1);
		const end = new Date(year, month + 1, 0);
		for (;start < end; start.setDate(start.getDate() + 1)) {
			const date = getDateString(start).toString();
			updatedAgendaInfoCardItems[date] = [...(updatedAgendaInfoCardItems[date] || [])];
		} 

		currentMonthCards.forEach(card => {
			const startDate = new Date(card.startdate); 
			const dueDate = new Date(card.duedate);
			const startDateStringFormat = getDateString(startDate);

			if (cardEndsOnSameDate(card)) {
				updatedAgendaInfoCardItems[startDateStringFormat] = [...updatedAgendaInfoCardItems[startDateStringFormat], card];
			} else {
				// if card doesnt end on same date, then display on every day
				for (let variableDate = new Date(card.startdate); variableDate < dueDate; variableDate.setDate(variableDate.getDate() + 1)) {
					updatedAgendaInfoCardItems[getDateString(variableDate)] = [...updatedAgendaInfoCardItems[getDateString(variableDate)], card];
				}
			}
		});
		
		setAgendaCardInfoItems(updatedAgendaInfoCardItems);
	};

	const onCardClick = (cardInfo: CardModelWithUid) => navigation.navigate('UpdateCardModal', {uid: cardInfo.uid});
	
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
		return agendaItemOne.uid !== agendaItemTwo.uid;
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

export default CalendarScreen;