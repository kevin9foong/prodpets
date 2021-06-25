import React from 'react'; 
import { View, Text } from 'react-native';
import CalendarCardStyles from '../../styles/components/home/CalendarCard.style';

type CalendarCardProps = {
  info: {
    item: {
      title: String, 
      time: String,
    },
  },
}

const CalendarCard = ({info}: CalendarCardProps) => {
  const item = info.item;
  return (
    <View style={CalendarCardStyles.container}>
      <Text style={{paddingBottom: 5, color: 'white'}}>{ item.title }</Text>
      <Text style={{color: 'white'}}>{ item.time }</Text>
    </View>
  );
}

export default CalendarCard