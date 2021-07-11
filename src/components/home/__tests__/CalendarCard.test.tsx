import CalendarCard from '../CalendarCard';
import { CardModelWithUid } from '../../../database/models/cards';
import { render } from '@testing-library/react-native'; 
import React from 'react';

test('Calendar Card single day event', () => {
  const info = {
    item: {
      title: "dummy Event",
      description: "dummy description",
      startdate: new Date('July 4, 2021 15:24:00'),
      duedate: new Date('July 4, 2021 16:00:00'),
      uid: '',
    }
  };
  const clickHandler = (card: CardModelWithUid) => {};
  const { getByText } = render(<CalendarCard info={info} clickHandler={clickHandler}/>)
  expect(getByText('15:24 - 16:00')).toBeTruthy();
})

test('Calendar Card multi day event display', () => {
  const info = {
    item: {
      title: "dummy Event",
      description: "dummy description",
      startdate: new Date('July 4, 2021 15:24:00'),
      duedate: new Date('July 7, 2021 16:00:00'),
      uid: '',
    }
  };
  const clickHandler = (card: CardModelWithUid) => {};
  const { getByText } = render(<CalendarCard info={info} clickHandler={clickHandler}/>)
  expect(getByText('4/7 - 7/7')).toBeTruthy();
})