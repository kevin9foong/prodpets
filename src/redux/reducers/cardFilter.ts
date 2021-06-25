// maintained locally - no online actions
const initialState = { 
	filterBy: null,
	tagFilters: []
};

const cardFilterReducer = (state = initialState, action) => {
	switch(action.type) { 
	case 'cardFilter/changeCardFilter': {
		return {
			...state, 
			...action.payload.filterBy
		};
	}
	case 'cardFilter/changeCardTagFilters': {
		return {
			...state, 
			...action.payload.tagFilters
		};
	}
	default: {
		return state;
	}
	}
};

export default cardFilterReducer; 