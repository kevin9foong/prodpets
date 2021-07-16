export type Tag = {
	tagName: string, 
	cardUids: string[]
}

const initialState: Tag[] = [];

const tagsReducer = (state = initialState, action) => {
	switch(action.type) {
	case 'tags/addTag': {
		return [...state, {
			tagName: action.payload.tagName, 
			cardUids: action.payload.cardUids
		}];
	}
	case 'tags/updateTag': {
		return [...state.filter(tagName => tagName !== action.payload.prevTagName),
			{
				tagName: action.payload.newTagName, 
				cardUids: action.payload.cardUids
			}];
	}
	case 'tags/deleteTag': {
		return state.filter(tag => tag.tagName !== action.payload.prevTagName && tag.cardUids.length > 0);
	}
	default: {
		return state;
	}
	}
};

export default tagsReducer;