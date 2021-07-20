import { changeCardFilterAction, changeCardTagFiltersAction, statusFilterTypes } from '../actions/cardFilter';

type cardFilters = { 
	statusFilter: statusFilterTypes, 
	tagFilters: string[]
}
// maintained locally - no online actions
const initialState: cardFilters = { 
	statusFilter: 'all',
	tagFilters: []
};

const cardFilterReducer = (state = initialState, action: changeCardFilterAction | changeCardTagFiltersAction): cardFilters => {
	switch(action.type) { 
	case 'cardFilter/changeCardFilter': {
		return {
			...state, 
			statusFilter: action.payload.statusFilter
		};
	}
	case 'cardFilter/changeCardTagFilters': {
		return {
			...state, 
			tagFilters: [...action.payload.tagFilters]
		};
	}
	default: {
		return state;
	}
	}
};

export default cardFilterReducer; 