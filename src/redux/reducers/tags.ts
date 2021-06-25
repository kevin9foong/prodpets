const initialState: string[] = [];

const tagsReducer = (state = initialState, action) => {
	switch(action.type) {
	case 'tags/addTag': {
		return [...state, action.payload.tagName];
	}
	case 'tags/updateTag': {
		return [...state.filter(tagName => tagName !== action.payload.prevTagName),
			action.payload.newTagName];
	}
	case 'tags/deleteTag': {
		return state.filter(tagName => tagName !== action.payload.prevTagName);
	}
	default: {
		return state;
	}
	}
};

export default tagsReducer;