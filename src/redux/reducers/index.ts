import { combineReducers } from 'redux';
import cardFilterReducer from './cardFilter';
import cardsReducer from './cards';
import tagsReducer from './tags';
import userReducer from './user';

// partition our global redux store into individual slices of state
// managed by each reducer. 
export default combineReducers({
	user: userReducer,
	cards: cardsReducer, 
	tags: tagsReducer, 
	cardFilter: cardFilterReducer
});