/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { CardModelWithUid } from '../database/models/cards';

export type CardModelWithUidSerializable = 
  Omit<CardModelWithUid, 'startdate' | 'duedate'> 
  & {
  startdate: string, 
  duedate: string
} 

export type AuthStackParamList = {
    Auth: undefined; 
}

export type HomeStackParamList = {
    Home: undefined; 
    CreateCardModal: undefined; 
    ViewCardModal: CardModelWithUid; 
    UpdateCardModal: CardModelWithUid;
  };
  
export type HomeTabParamList = {
    TabOne: undefined;
    TabTwo: undefined;
  };
  
export type DashboardParamList = {
    DashboardScreen: undefined;
    UpdateCardModal: CardModelWithUidSerializable;
    ViewCardModal: CardModelWithUidSerializable;
  };
  
export type CalendarParamList = {
    CalendarScreen: undefined;
  };