import React from 'react'; 
import { View, Text, TouchableOpacity } from 'react-native';
import { CardModelWithUid } from '../../database/models/cards';
import CalendarCardStyles from '../../styles/components/home/CalendarCard.style';

type CalendarCardProps = {
  info: {
    item: CardModelWithUid,
  },
  clickHandler: Function,
}

const CalendarCard = ({info, clickHandler}: CalendarCardProps) => {

  const item = info.item;

  const formatMinutes = (mins: Number) => {
    return mins === 0 ? '00' : mins;
  }
  
  const getTimeRange = (card: CardModelWithUid) => {
    const start = card.startdate.getHours() + ':' + formatMinutes(card.startdate.getMinutes());
    const end = card.duedate.getHours() + ':' + formatMinutes(card.duedate.getMinutes());
    return `${start} - ${end}`;
  }  

  return (
    <TouchableOpacity
      onPress={() => clickHandler(item)}
    >
      <View style={CalendarCardStyles.container}>
        <Text style={{paddingBottom: 5, color: 'white'}}>{ item.title }</Text>
        <Text style={{color: 'white'}}>{ getTimeRange(item) }</Text>
      </View>
    </TouchableOpacity>
  );
}

export default CalendarCard