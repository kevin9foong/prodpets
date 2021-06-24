import React from 'react'; 
import { View, Text } from 'react-native';
import CalendarCardStyles from '../../styles/components/home/CalendarCard.style';

type CalendarCardProps = {
  title: String,
  time: String,
}

const CalendarCard = ({title, time}: CalendarCardProps) => {
  return (
    <View style={CalendarCardStyles.container}>
      <Text style={{paddingBottom: 5, color: 'white'}}>{ title }</Text>
      <Text style={{color: 'white'}}>{ time }</Text>
    </View>
  );
}

export default CalendarCard