/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { CardModelWithUid } from '../database/models/cards';

export type AuthStackParamList = {
    Auth: undefined; 
}

export type HomeStackParamList = {
    Home: undefined; 
    CreateCardModal: undefined; 
    UpdateCardModal: CardModelWithUid;
  };
  
export type HomeTabParamList = {
    TabOne: undefined;
    TabTwo: undefined;
  };
  
export type DashboardParamList = {
    DashboardScreen: undefined;
    UpdateCardModal: CardModelWithUid;
  };
  
export type CalendarParamList = {
    CalendarScreen: undefined;
  };