import React from 'react'; 
import { View, Text } from 'react-native';
import { CardModelWithUid } from '../../database/models/cards';
import CalendarCardStyles from '../../styles/components/home/CalendarCard.style';

type CalendarCardProps = {
  info: {
    item: CardModelWithUid,
  },
}

const CalendarCard = ({info}: CalendarCardProps) => {

  const item = info.item;
  
  const getTimeRange = (card: CardModelWithUid) => {
    const start = card.startdate.getHours() + ':' + card.startdate.getMinutes();
    const end = card.duedate.getHours() + ':' + card.duedate.getMinutes();
    return `${start} - ${end}`;
  }  

  return (
    <View style={CalendarCardStyles.container}>
      <Text style={{paddingBottom: 5, color: 'white'}}>{ item.title }</Text>
      <Text style={{color: 'white'}}>{ getTimeRange(item) }</Text>
    </View>
  );
}

export default CalendarCard