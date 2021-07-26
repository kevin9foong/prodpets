/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { CardModelWithUid } from '../database/models/cards';

export type CardUid = {
  uid: string;
};

export type CardModelWithUidSerializable = Omit<
  CardModelWithUid,
  'startdate' | 'duedate'
> & {
  startdate: string;
  duedate: string;
};

export type AuthStackParamList = {
  Auth: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  CreateCardModal: undefined;
  ViewCardModal: CardUid;
  UpdateCardModal: CardUid;
  GameCardSelectModal: undefined; 
};

export type HomeTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type DashboardParamList = {
  DashboardScreen: undefined;
  UpdateCardModal: CardUid;
  ViewCardModal: CardUid;
};

export type CalendarParamList = {
  CalendarScreen: undefined;
  ViewCardModal: CardUid;
};

export type GamesParamList = { 
  GamesScreen: CardUid | undefined;
  GameCardSelectModal: undefined;
}