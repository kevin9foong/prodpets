import { upsertTagAction, addCardToTagAction, deleteCardFromTagAction, 
	deleteTagAction, updateTagNameAction, saveCardTagsAction } from '../actions/tags';

export type Tags = {
	// tagName: cardUids 
	[name: string]: string[]
}

const initialState: Tags = {};
 
const tagsReducer = (state = initialState, action: upsertTagAction | deleteTagAction | updateTagNameAction
	| addCardToTagAction | deleteCardFromTagAction | saveCardTagsAction): Tags => {
	switch(action.type) {
	case 'tags/overwriteTags': {
		return {
			...action.payload.tags
		};
	}
	case 'tags/addCardToTag': {
		return {
			...state, 
			[action.payload.tagName]: [...(state[action.payload.tagName] || []), action.payload.addedCardUid]
		};
	}
	case 'tags/deleteCardFromTag': {
		const deletedTagCards = state[action.payload.tagName]; 
		if (deletedTagCards) {
			const remCards = deletedTagCards.filter(cardUid => cardUid !== action.payload.deleteCardUid); 
			if (remCards.length <= 0) {
				const newTags = {...state}; 
				delete newTags[action.payload.tagName]; 
				return newTags; 
			} else {
				const newTags = {...state, [action.payload.tagName]: remCards}; 
				return newTags;
			}		
		}
		return state; 
	}
	case 'tags/upsertTag': {
		return (
			{
				...state, 
				[action.payload.tagName]: action.payload.cardUids
			}
		);
	}
	case 'tags/updateTagName': {
		const newTags = {...state}; 
		if (state[action.payload.prevTagName]) {
			newTags[action.payload.newTagName] = state[action.payload.prevTagName];
		} 
		delete newTags[action.payload.prevTagName];
		return newTags;
	}
	case 'tags/deleteTag': {	
		const newTags = {...state}; 
		delete newTags[action.payload.tagName];
		return newTags; 
	}
	default: {
		return state;
	}
	}
};

export default tagsReducer;